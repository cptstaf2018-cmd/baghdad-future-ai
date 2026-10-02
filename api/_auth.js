import crypto from 'node:crypto';

const COOKIE_NAME = 'bfai_admin';
const WEEK_SECONDS = 60 * 60 * 24 * 7;

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || process.env.BLOB_READ_WRITE_TOKEN || 'development-secret';
}

function sign(value) {
  return crypto.createHmac('sha256', getSecret()).update(value).digest('base64url');
}

function timingSafeEqual(a, b) {
  const left = Buffer.from(String(a));
  const right = Buffer.from(String(b));
  if (left.length !== right.length) return false;
  return crypto.timingSafeEqual(left, right);
}

export async function readJson(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString('utf8');
  return raw ? JSON.parse(raw) : {};
}

export function createSession(email) {
  const expires = Date.now() + WEEK_SECONDS * 1000;
  const payload = `${email}.${expires}`;
  return `${payload}.${sign(payload)}`;
}

export function getCookie(req, name) {
  const header = req.headers.cookie || '';
  const parts = header.split(';').map((part) => part.trim());
  const found = parts.find((part) => part.startsWith(`${name}=`));
  return found ? decodeURIComponent(found.slice(name.length + 1)) : '';
}

export function isAuthed(req) {
  const token = getCookie(req, COOKIE_NAME);
  const [email, expires, signature] = token.split('.');
  if (!email || !expires || !signature) return false;
  if (Number(expires) < Date.now()) return false;
  return timingSafeEqual(signature, sign(`${email}.${expires}`));
}

export function setSessionCookie(res, email) {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  res.setHeader('Set-Cookie', `${COOKIE_NAME}=${encodeURIComponent(createSession(email))}; HttpOnly; Path=/; SameSite=Lax; Max-Age=${WEEK_SECONDS}${secure}`);
}

export function clearSessionCookie(res) {
  res.setHeader('Set-Cookie', `${COOKIE_NAME}=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0`);
}

export function requireAdmin(req, res) {
  if (isAuthed(req)) return true;
  res.status(401).json({ error: 'unauthorized' });
  return false;
}

export function checkCredentials(email, password) {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminEmail || !adminPassword) return false;
  return timingSafeEqual(email, adminEmail) && timingSafeEqual(password, adminPassword);
}
