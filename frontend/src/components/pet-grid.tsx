import type { Pet } from '@/lib/types';
import { PetCard } from './pet-card';
import { PawPrint } from 'lucide-react';

export function PetGrid({ pets }: { pets: Pet[] }) {
  if (!pets.length) return <div className="empty-state"><span className="empty-state-icon"><PawPrint size={34} /></span><h2>No buddies found yet</h2><p>Try a wider search, or come back after another listing arrives.</p></div>;
  return <div className="pet-grid">{pets.map((pet) => <PetCard key={pet.id} pet={pet} />)}</div>;
}
