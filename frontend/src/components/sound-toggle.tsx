import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import type { Howl as HowlType } from 'howler';

export function SoundToggle() {
  const soundRef = useRef<HowlType | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    const handleVisibility = () => {
      if (!soundRef.current) return;
      if (document.hidden) soundRef.current.pause();
      else if (enabled) soundRef.current.play();
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      soundRef.current?.unload();
    };
  }, [enabled]);

  async function toggle() {
    if (enabled) {
      soundRef.current?.fade(0.24, 0, 400);
      window.setTimeout(() => soundRef.current?.pause(), 420);
      setEnabled(false);
      return;
    }

    setLoading(true);
    try {
      if (!soundRef.current) {
        const { Howl } = await import('howler');
        soundRef.current = new Howl({
          src: ['/audio/small-hellos.wav'],
          html5: true,
          loop: true,
          preload: false,
          volume: 0,
        });
      }
      soundRef.current.play();
      soundRef.current.fade(0, 0.24, 650);
      setEnabled(true);
      setUnavailable(false);
    } catch {
      soundRef.current?.unload();
      soundRef.current = null;
      setEnabled(false);
      setUnavailable(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button className="sound-toggle" type="button" onClick={() => void toggle()} aria-pressed={enabled} disabled={loading}>
      <span className="sound-toggle-icon">{enabled ? <Volume2 size={17} /> : <VolumeX size={17} />}</span>
      <span>{loading ? 'Loading sound' : unavailable ? 'Sound unavailable' : enabled ? 'Sound on' : 'Sound off'}</span>
    </button>
  );
}
