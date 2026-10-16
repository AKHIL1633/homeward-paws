import { PawPrint } from 'lucide-react';

export function Loading({ message = 'Gathering the introductions…' }: { message?: string }) {
  return (
    <div className="loading-state" role="status">
      <span><PawPrint size={52} /></span>
      <p>{message}</p>
    </div>
  );
}
