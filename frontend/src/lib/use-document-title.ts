import { useEffect } from 'react';

const BASE = 'Adopt a Buddy';

// Sets document.title, mirroring the old Next.js metadata template "%s | Adopt a Buddy".
export function useDocumentTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} | ${BASE}` : `${BASE} — Small hello, big life`;
  }, [title]);
}
