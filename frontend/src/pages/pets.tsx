import { useEffect, useState } from 'react';
import { PetsExplorer } from '@/components/pets-explorer';
import { Loading } from '@/components/loading';
import { getPets } from '@/lib/api';
import { useDocumentTitle } from '@/lib/use-document-title';
import type { Pet } from '@/lib/types';

export function PetsPage() {
  useDocumentTitle('Browse pets');
  const [state, setState] = useState<{ pets: Pet[]; failed: boolean } | null>(null);
  useEffect(() => {
    let active = true;
    getPets()
      .then((pets) => active && setState({ pets, failed: false }))
      .catch(() => active && setState({ pets: [], failed: true }));
    return () => { active = false; };
  }, []);
  if (!state) return <Loading />;
  return (
    <section className="section page-section">
      <div className="page-intro">
        <p className="chapter-label"><span>Browse</span> The neighbourhood noticeboard</p>
        <h1>Maybe someone here has been <em>waiting for you.</em></h1>
        <p>Look slowly. Read their story. Imagine an ordinary Tuesday together.</p>
      </div>
      <PetsExplorer initialPets={state.pets} initialLoadFailed={state.failed} />
    </section>
  );
}
