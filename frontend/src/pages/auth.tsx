import { AuthForm } from '@/components/auth-form';
import { useDocumentTitle } from '@/lib/use-document-title';

export function AuthPage() {
  useDocumentTitle('Join or sign in');
  return (
    <section className="auth-page">
      <div className="auth-aside">
        <p className="chapter-label"><span>Hello</span> Welcome to the good part</p>
        <h1>Help a small life find its way <em>home.</em></h1>
        <div className="auth-doodle" aria-hidden="true"><span className="auth-doodle-ear" /><span className="auth-doodle-face">• ᴥ •</span></div>
        <p>Thoughtful homes start with honest introductions.</p>
      </div>
      <AuthForm />
    </section>
  );
}
