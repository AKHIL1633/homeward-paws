import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '@/lib/api';
import { useAuth } from './auth-provider';

export function AuthForm() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { refresh } = useAuth();
  const navigate = useNavigate();
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setLoading(true); setError('');
    const data = Object.fromEntries(new FormData(event.currentTarget));
    try { await api(`/api/auth/${mode === 'login' ? 'login' : 'register'}`, { method: 'POST', body: JSON.stringify(data) }); await refresh(); navigate(data.role === 'SELLER' ? '/dashboard' : '/'); }
    catch (caught) { setError(caught instanceof Error ? caught.message : 'Authentication failed'); }
    finally { setLoading(false); }
  }
  return <div className="auth-card"><div className="mode-switch"><button className={mode === 'login' ? 'active' : ''} onClick={() => setMode('login')}>Sign in</button><button className={mode === 'register' ? 'active' : ''} onClick={() => setMode('register')}>Create account</button></div><form onSubmit={submit}>{mode === 'register' ? <div className="field-pair"><label><span>First name</span><input name="firstName" required /></label><label><span>Last name</span><input name="lastName" required /></label></div> : null}<label><span>Email</span><input name="email" type="email" autoComplete="email" required /></label><label><span>Password</span><input name="password" type="password" minLength={8} autoComplete={mode === 'login' ? 'current-password' : 'new-password'} required /></label>{mode === 'register' ? <label><span>I am here to</span><select name="role" defaultValue="BUYER"><option value="BUYER">Adopt a pet</option><option value="SELLER">List pets for adoption</option></select></label> : null}{error ? <p className="form-error" role="alert">{error}</p> : null}<button className="button primary full" disabled={loading}>{loading ? 'One moment…' : mode === 'login' ? 'Sign in' : 'Create my account'}</button></form></div>;
}
