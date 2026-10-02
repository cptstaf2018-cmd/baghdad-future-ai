import { readProjects, writeProjects } from './_content.js';
import { readJson, requireAdmin } from './_auth.js';

function normalizeProject(project) {
  return {
    href: String(project.href || '').trim(),
    img: String(project.img || '').trim(),
    catAr: String(project.catAr || '').trim(),
    catEn: String(project.catEn || '').trim(),
    nameAr: String(project.nameAr || '').trim(),
    nameEn: String(project.nameEn || '').trim(),
    descAr: String(project.descAr || '').trim(),
    descEn: String(project.descEn || '').trim(),
    isFree: Boolean(project.isFree),
    hidden: Boolean(project.hidden),
  };
}

function validateProjects(projects) {
  if (!Array.isArray(projects)) return null;
  const normalized = projects.map(normalizeProject);
  const invalid = normalized.some((project) => (
    !project.href ||
    !project.img ||
    !project.catAr ||
    !project.catEn ||
    !project.nameAr ||
    !project.nameEn ||
    !project.descAr ||
    !project.descEn
  ));
  return invalid ? null : normalized;
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const projects = await readProjects();
    res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate=120');
    res.status(200).json({ projects });
    return;
  }

  if (req.method === 'POST') {
    if (!requireAdmin(req, res)) return;
    const body = await readJson(req);
    const projects = validateProjects(body.projects);
    if (!projects) {
      res.status(400).json({ error: 'invalid_projects' });
      return;
    }

    await writeProjects(projects);
    res.status(200).json({ projects });
    return;
  }

  res.setHeader('Allow', 'GET, POST');
  res.status(405).json({ error: 'method_not_allowed' });
}
