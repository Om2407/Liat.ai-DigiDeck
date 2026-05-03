import { useEffect, useState } from 'react';

export function useGazeContext() {
  const [context, setContext] = useState('the American Dream Mall deck');

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (!el) return;
      const closest = el.closest('[data-ai-context]');
      if (closest) {
        const ctx = closest.getAttribute('data-ai-context');
        if (ctx) setContext(ctx);
      }
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return context;
}
