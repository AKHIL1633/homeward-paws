import { FormEvent, useState } from 'react';
import { Search } from 'lucide-react';
import { getPets } from '@/lib/api';
import type { Pet } from '@/lib/types';
import { PetGrid } from './pet-grid';

export function PetsExplorer({ initialPets, initialLoadFailed = false }: { initialPets: Pet[]; initialLoadFailed?: boolean }) {
  const [pets, setPets] = useState(initialPets);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(initialLoadFailed ? 'The noticeboard could not load. Try searching again in a moment.' : '');
  async function search(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setLoading(true); setError('');
    const data = new FormData(event.currentTarget);
    const params = new URLSearchParams();
    for (const field of ['name', 'species', 'breed', 'location']) { const value = String(data.get(field) ?? '').trim(); if (value) params.set(field, value); }
    try { setPets(await getPets(`?${params}`)); } catch (caught) { setError(caught instanceof Error ? caught.message : 'Could not load pets'); } finally { setLoading(false); }
  }
  return <><form className="filter-bar" onSubmit={search}><label><span>Search</span><input name="name" placeholder="Buddy's name" /></label><label><span>Species</span><select name="species" defaultValue=""><option value="">Any</option><option>Dog</option><option>Cat</option><option>Other</option></select></label><label><span>Breed</span><input name="breed" placeholder="Any breed" /></label><label><span>Location</span><input name="location" placeholder="Your city" /></label><button disabled={loading}><Search size={18} />{loading ? 'Looking…' : 'Find buddies'}</button></form>{error ? <p className="form-error" role="alert">{error}</p> : null}<PetGrid pets={pets} /></>;
}
