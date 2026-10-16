import { Link, useNavigate } from 'react-router-dom';
import { Heart, LogOut, PawPrint } from 'lucide-react';
import { useAuth } from './auth-provider';

export function SiteHeader() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <header className="site-header">
      <Link to="/" className="brand" aria-label="Adopt a Buddy home"><span className="brand-mark"><PawPrint size={19} /></span><span>Adopt a Buddy</span></Link>
      <nav className="site-nav" aria-label="Main navigation">
        <Link to="/pets">Meet the buddies</Link>
        {user?.role === 'SELLER' ? <Link to="/dashboard">My listings</Link> : null}
        {!loading && !user ? <Link className="nav-cta" to="/auth"><Heart size={16} /> Join the pack</Link> : null}
        {user ? <button className="nav-button" onClick={async () => { await logout(); navigate('/auth'); }}><LogOut size={15} /> Sign out</button> : null}
      </nav>
    </header>
  );
}
