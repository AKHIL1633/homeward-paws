import { useState } from 'react';
import { Bone, Pencil, Plus, Trash2 } from 'lucide-react';
import { api, getPets } from '@/lib/api';
import type { Pet } from '@/lib/types';
import { PetForm } from './pet-form';

export function Dashboard({ initialPets }: { initialPets: Pet[] }) {
  const [pets, setPets] = useState(initialPets);
  const [editing, setEditing] = useState<Pet | null | undefined>();
  const [error, setError] = useState('');
  const reload = async () => setPets(await getPets('?mine=true'));
  const remove = async (pet: Pet) => { if (!window.confirm(`Delete ${pet.name}'s listing?`)) return; try { await api(`/api/pets/${pet.id}`, { method: 'DELETE' }); await reload(); } catch (caught) { setError(caught instanceof Error ? caught.message : 'Delete failed'); } };
  return <div className="dashboard"><div className="dashboard-toolbar"><p>{pets.length} active {pets.length === 1 ? 'listing' : 'listings'}</p><button className="button primary" onClick={() => setEditing(null)}><Plus size={18} /> New listing</button></div>{error ? <p className="form-error" role="alert">{error}</p> : null}{editing !== undefined ? <PetForm pet={editing} onCancel={() => setEditing(undefined)} onSaved={async () => { setEditing(undefined); await reload(); }} /> : null}<div className="listing-table">{pets.map((pet) => <article key={pet.id}><div><p className="eyebrow">{pet.species} · {pet.breed}</p><h2>{pet.name}</h2><p>{pet.location} · ₹{Number(pet.price).toLocaleString('en-IN')}</p></div><div className="listing-actions"><button onClick={() => setEditing(pet)} aria-label={`Edit ${pet.name}`}><Pencil size={17} /></button><button onClick={() => void remove(pet)} aria-label={`Delete ${pet.name}`}><Trash2 size={17} /></button></div></article>)}{!pets.length ? <div className="empty-state"><span className="empty-state-icon"><Bone size={34} /></span><h2>Your noticeboard is empty</h2><p>Create the first listing when you are ready.</p></div> : null}</div></div>;
}
