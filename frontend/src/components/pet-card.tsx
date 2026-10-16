import { Link } from 'react-router-dom';
import { MapPin, PawPrint } from 'lucide-react';
import type { Pet } from '@/lib/types';

export function PetCard({ pet }: { pet: Pet }) {
  return (
    <Link to={`/pets/${pet.id}`} className="pet-card reveal-card">
      <div className="pet-image-wrap">
        {pet.image_url ? <img src={pet.image_url} alt={pet.name} className="pet-image" /> : <div className="pet-placeholder" role="img" aria-label={`${pet.name} does not have a photo yet`}><PawPrint size={50} /></div>}
        <span className="pet-status">{pet.status}</span>
        <span className="pet-card-arrow" aria-hidden="true">↗</span>
      </div>
      <div className="pet-card-body">
        <div><p className="eyebrow">{pet.species} · {pet.breed}</p><h3>{pet.name}</h3></div>
        <p className="pet-location"><MapPin size={15} /> {pet.location}</p>
        <p className="pet-price">₹{Number(pet.price).toLocaleString('en-IN')}</p>
      </div>
    </Link>
  );
}
