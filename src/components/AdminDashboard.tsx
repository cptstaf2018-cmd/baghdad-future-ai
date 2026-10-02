import { Eye, EyeOff, LogOut, Plus, Save, Trash2 } from 'lucide-react';
import { FormEvent, useEffect, useMemo, useState } from 'react';
import { defaultProjects, type Project } from '@/data/projects';

const emptyProject: Project = {
  href: '',
  img: '/images/',
  catAr: '',
  catEn: '',
  nameAr: '',
  nameEn: '',
  descAr: '',
  descEn: '',
};

function cloneProject(project: Project): Project {
  return { ...project };
}

export default function AdminDashboard() {
  const [authenticated, setAuthenticated] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [email, setEmail] = useState('cptstaf2018@gmail.com');
  const [password, setPassword] = useState('');
  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState('');

  const selectedProject = projects[selectedIndex] ?? projects[0] ?? emptyProject;
  const visibleCount = useMemo(() => projects.filter((project) => !project.hidden).length, [projects]);

  useEffect(() => {
    fetch('/api/admin-session')
      .then((response) => response.json())
      .then((data: { authenticated?: boolean }) => {
        setAuthenticated(Boolean(data.authenticated));
      })
      .finally(() => {
        setCheckingSession(false);
      });
  }, []);

  useEffect(() => {
    if (!authenticated) return;
    fetch('/api/projects')
      .then((response) => response.json())
      .then((data: { projects?: Project[] }) => {
        if (Array.isArray(data.projects) && data.projects.length > 0) {
          setProjects(data.projects);
        }
      })
      .catch(() => setStatus('تعذر جلب المشاريع، تم عرض النسخة الافتراضية.'));
  }, [authenticated]);

  function updateSelected(field: keyof Project, value: string | boolean) {
    setProjects((currentProjects) => {
      const nextProjects = currentProjects.map(cloneProject);
      nextProjects[selectedIndex] = {
        ...(nextProjects[selectedIndex] ?? emptyProject),
        [field]: value,
      };
      return nextProjects;
    });
  }

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('');
    const response = await fetch('/api/admin-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      setStatus('بيانات الدخول غير صحيحة أو لم تضف متغيرات الإدارة في Vercel.');
      return;
    }

    setAuthenticated(true);
    setPassword('');
  }

  async function logout() {
    await fetch('/api/admin-session', { method: 'DELETE' });
    setAuthenticated(false);
  }

  async function saveProjects() {
    setSaving(true);
    setStatus('');
    const response = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ projects }),
    });
    setSaving(false);

    if (!response.ok) {
      const data = await response.json().catch(() => null);
      const message = data?.message ? ` السبب: ${data.message}` : '';
      setStatus(`لم يتم الحفظ.${message}`);
      return;
    }

    setStatus('تم الحفظ. سيظهر التعديل للعملاء خلال ثواني قليلة.');
  }

  function addProject() {
    setProjects((currentProjects) => [...currentProjects, { ...emptyProject }]);
    setSelectedIndex(projects.length);
  }

  function deleteSelected() {
    if (projects.length <= 1) return;
    setProjects((currentProjects) => currentProjects.filter((_, index) => index !== selectedIndex));
    setSelectedIndex((currentIndex) => Math.max(0, currentIndex - 1));
  }

  if (checkingSession) {
    return <main className="admin-shell"><div className="admin-loading">جاري التحقق...</div></main>;
  }

  if (!authenticated) {
    return (
      <main className="admin-shell">
        <form className="admin-login" onSubmit={login}>
          <span>Baghdad Future AI</span>
          <h1>لوحة الشركة</h1>
          <p>سجّل الدخول لإدارة المشاريع التي تظهر للعملاء.</p>
          <label>
            البريد الإلكتروني
            <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" autoComplete="email" />
          </label>
          <label>
            كلمة المرور
            <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" autoComplete="current-password" />
          </label>
          <button type="submit">دخول</button>
          {status && <strong className="admin-status error">{status}</strong>}
        </form>
      </main>
    );
  }

  return (
    <main className="admin-shell">
      <aside className="admin-sidebar">
        <div>
          <span className="admin-kicker">لوحة الشركة</span>
          <h1>المشاريع</h1>
          <p>{projects.length} مشروع، {visibleCount} ظاهر للعملاء</p>
        </div>
        <button className="admin-add" onClick={addProject} type="button"><Plus size={16} /> مشروع جديد</button>
        <div className="admin-list">
          {projects.map((project, index) => (
            <button className={index === selectedIndex ? 'active' : ''} key={`${project.href}-${index}`} onClick={() => setSelectedIndex(index)} type="button">
              <strong>{project.nameAr || 'مشروع جديد'}</strong>
              <span>{project.hidden ? 'مخفي' : project.href || 'بدون رابط'}</span>
            </button>
          ))}
        </div>
      </aside>

      <section className="admin-panel">
        <div className="admin-topbar">
          <div>
            <span className="admin-kicker">تحرير مباشر</span>
            <h2>{selectedProject.nameAr || 'مشروع جديد'}</h2>
          </div>
          <div className="admin-actions">
            <a href="/" target="_blank" rel="noreferrer">عرض الموقع</a>
            <button onClick={logout} type="button"><LogOut size={16} /> خروج</button>
          </div>
        </div>

        <div className="admin-editor">
          <label>
            رابط المشروع
            <input value={selectedProject.href} onChange={(event) => updateSelected('href', event.target.value)} />
          </label>
          <label>
            رابط الصورة
            <input value={selectedProject.img} onChange={(event) => updateSelected('img', event.target.value)} />
          </label>
          <label>
            التصنيف عربي
            <input value={selectedProject.catAr} onChange={(event) => updateSelected('catAr', event.target.value)} />
          </label>
          <label>
            التصنيف English
            <input value={selectedProject.catEn} onChange={(event) => updateSelected('catEn', event.target.value)} />
          </label>
          <label>
            اسم المشروع عربي
            <input value={selectedProject.nameAr} onChange={(event) => updateSelected('nameAr', event.target.value)} />
          </label>
          <label>
            Project name English
            <input value={selectedProject.nameEn} onChange={(event) => updateSelected('nameEn', event.target.value)} />
          </label>
          <label className="wide">
            الوصف عربي
            <textarea value={selectedProject.descAr} onChange={(event) => updateSelected('descAr', event.target.value)} />
          </label>
          <label className="wide">
            Description English
            <textarea value={selectedProject.descEn} onChange={(event) => updateSelected('descEn', event.target.value)} />
          </label>
        </div>

        <div className="admin-flags">
          <button className={selectedProject.hidden ? 'danger soft' : 'soft'} onClick={() => updateSelected('hidden', !selectedProject.hidden)} type="button">
            {selectedProject.hidden ? <EyeOff size={16} /> : <Eye size={16} />}
            {selectedProject.hidden ? 'المشروع مخفي' : 'ظاهر للعملاء'}
          </button>
          <button className={selectedProject.isFree ? 'soft active' : 'soft'} onClick={() => updateSelected('isFree', !selectedProject.isFree)} type="button">
            أداة مجانية
          </button>
        </div>

        <div className="admin-savebar">
          <button className="admin-delete" onClick={deleteSelected} type="button"><Trash2 size={16} /> حذف</button>
          <div>
            {status && <strong className={`admin-status${status.includes('تعذر') || status.includes('لم يتم') ? ' error' : ''}`}>{status}</strong>}
            <button className="admin-save" disabled={saving} onClick={saveProjects} type="button"><Save size={16} /> {saving ? 'جاري الحفظ...' : 'حفظ ونشر للموقع'}</button>
          </div>
        </div>
      </section>
    </main>
  );
}
