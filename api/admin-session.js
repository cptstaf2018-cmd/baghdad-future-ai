import { checkCredentials, clearSessionCookie, isAuthed, readJson, setSessionCookie } from './_auth.js';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json({ authenticated: isAuthed(req) });
    return;
  }

  if (req.method === 'POST') {
    const { email, password } = await readJson(req);
    if (!checkCredentials(email, password)) {
      res.status(401).json({ error: 'invalid_credentials' });
      return;
    }

    setSessionCookie(res, email);
    res.status(200).json({ authenticated: true });
    return;
  }

  if (req.method === 'DELETE') {
    clearSessionCookie(res);
    res.status(200).json({ authenticated: false });
    return;
  }

  res.setHeader('Allow', 'GET, POST, DELETE');
  res.status(405).json({ error: 'method_not_allowed' });
}
