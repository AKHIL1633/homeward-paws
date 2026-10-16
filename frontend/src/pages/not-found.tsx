import { Link } from 'react-router-dom';
import { useDocumentTitle } from '@/lib/use-document-title';

export function NotFoundPage() {
  useDocumentTitle('Not found');
  return (
    <section className="not-found">
      <span>404</span>
      <h1>This trail went cold.</h1>
      <p>The page you are looking for may have found another home.</p>
      <Link className="button primary" to="/pets">Browse the buddies</Link>
    </section>
  );
}
