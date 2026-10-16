import { Link, Outlet, Route, Routes } from 'react-router-dom';
import { SiteHeader } from '@/components/site-header';
import { HomePage } from '@/pages/home';
import { PetsPage } from '@/pages/pets';
import { PetDetailPage } from '@/pages/pet-detail';
import { AuthPage } from '@/pages/auth';
import { DashboardPage } from '@/pages/dashboard';
import { NotFoundPage } from '@/pages/not-found';

function Layout() {
  return (
    <>
      <SiteHeader />
      <main><Outlet /></main>
      <footer><SiteFooter /></footer>
    </>
  );
}

function SiteFooter() {
  return (
    <div className="footer-inner">
      <div>
        <p className="footer-kicker">Adopt a Buddy</p>
        <p>Small introductions.<br />Big life changes.</p>
      </div>
      <div className="footer-links">
        <Link to="/pets">Meet the buddies</Link>
        <Link to="/auth">List a pet</Link>
      </div>
      <p className="footer-meta">© {new Date().getFullYear()} Adopt a Buddy Place</p>
    </div>
  );
}

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/pets" element={<PetsPage />} />
        <Route path="/pets/:id" element={<PetDetailPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
