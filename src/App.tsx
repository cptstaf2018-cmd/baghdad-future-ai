import { LangProvider } from '@/hooks/useLang';
import AdminDashboard from '@/components/AdminDashboard';
import Site from '@/site/Site';

export default function App() {
  if (window.location.pathname.startsWith('/admin')) {
    return <AdminDashboard />;
  }

  return (
    <LangProvider>
      <Site />
    </LangProvider>
  );
}
