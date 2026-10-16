import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Dashboard } from '@/components/dashboard';
import { Loading } from '@/components/loading';
import { useAuth } from '@/components/auth-provider';
import { getPets } from '@/lib/api';
import { useDocumentTitle } from '@/lib/use-document-title';
import type { Pet } from '@/lib/types';

export function DashboardPage() {
  useDocumentTitle('Your listings');
  const { user, loading } = useAuth();
  const [pets, setPets] = useState<Pet[] | null>(null);

  useEffect(() => {
    if (loading || user?.role !== 'SELLER') return;
    let active = true;
    getPets('?mine=true')
      .then((value) => active && setPets(value))
      .catch(() => active && setPets([]));
    return () => { active = false; };
  }, [loading, user]);

  if (loading) return <Loading message="Opening your corner…" />;
  if (!user) return <Navigate to="/auth" replace />;
  if (user.role !== 'SELLER') return <Navigate to="/pets" replace />;
  if (!pets) return <Loading message="Opening your corner…" />;

  return (
    <section className="section page-section">
      <div className="page-intro">
        <p className="chapter-label"><span>Caregiver</span> Your corner</p>
        <h1>Help every buddy put their <em>best paw forward.</em></h1>
        <p>Create thoughtful listings and keep every story current.</p>
      </div>
      <Dashboard initialPets={pets} />
    </section>
  );
}
