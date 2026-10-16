import { useEffect, useState } from 'react';
import { HomeStory } from '@/components/home-story';
import { Loading } from '@/components/loading';
import { getPets } from '@/lib/api';
import { useDocumentTitle } from '@/lib/use-document-title';
import type { Pet } from '@/lib/types';

export function HomePage() {
  useDocumentTitle();
  const [state, setState] = useState<{ pets: Pet[]; loadFailed: boolean } | null>(null);
  useEffect(() => {
    let active = true;
    getPets('?limit=6')
      .then((pets) => active && setState({ pets, loadFailed: false }))
      .catch(() => active && setState({ pets: [], loadFailed: true }));
    return () => { active = false; };
  }, []);
  if (!state) return <Loading />;
  return <HomeStory pets={state.pets} loadFailed={state.loadFailed} />;
}
