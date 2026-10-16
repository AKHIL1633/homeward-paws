import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Mail, MapPin } from 'lucide-react';
import { ApiError, getPet } from '@/lib/api';
import { Loading } from '@/components/loading';
import { useDocumentTitle } from '@/lib/use-document-title';
import { NotFoundPage } from './not-found';
import type { Pet } from '@/lib/types';

export function PetDetailPage() {
  const { id = '' } = useParams();
  const [pet, setPet] = useState<Pet | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'notfound' | 'error'>('loading');
  useDocumentTitle(pet?.name);

  useEffect(() => {
    let active = true;
    setStatus('loading');
    getPet(id)
      .then((value) => { if (active) { setPet(value); setStatus('ready'); } })
      .catch((error) => {
        if (!active) return;
        setStatus(error instanceof ApiError && error.status === 404 ? 'notfound' : 'error');
      });
    return () => { active = false; };
  }, [id]);

  if (status === 'loading') return <Loading message="Fetching their story…" />;
  if (status === 'notfound') return <NotFoundPage />;
  if (status === 'error' || !pet)
    return (
      <section className="not-found"><span>Oops</span><h1>Something slipped the leash.</h1><p>We could not load this page just now.</p><Link className="button primary" to="/pets">Browse the buddies</Link></section>
    );

  return (
    <section className="section detail-page">
      <Link className="back-link" to="/pets"><ArrowLeft size={16} /> Back to all pets</Link>
      <div className="detail-card">
        <div className="detail-image">{pet.image_url ? <img src={pet.image_url} alt={pet.name} /> : <div className="pet-placeholder">🐾</div>}</div>
        <div className="detail-copy">
          <p className="kicker">{pet.species} · {pet.breed}</p>
          <h1>{pet.name}</h1>
          <p className="detail-location"><MapPin size={18} /> {pet.location}</p>
          <div className="fact-row">
            <span><small>Age</small>{pet.age} years</span>
            <span><small>Adoption fee</small>₹{Number(pet.price).toLocaleString('en-IN')}</span>
            <span><small>Status</small>{pet.status}</span>
          </div>
          <p className="description">{pet.description || `${pet.name} is looking for a thoughtful, lasting home.`}</p>
          <a className="button primary" href={`mailto:${pet.seller_email}`}><Mail size={18} /> Contact the caregiver</a>
        </div>
      </div>
    </section>
  );
}
