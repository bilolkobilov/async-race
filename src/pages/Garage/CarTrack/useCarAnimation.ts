import { useRef, useEffect } from 'react';
import { CarRaceStatus } from '../../../types';

interface AnimationState {
  startTime: number;
  duration: number;
  startX: number;
}

export const useCarAnimation = (
  status: CarRaceStatus,
  duration: number,
  carRef: React.RefObject<HTMLDivElement>,
) => {
  const animState = useRef<AnimationState | null>(null);
  const rafId = useRef<number>(0);

  const getTrackWidth = () => {
    const el = carRef.current;
    if (!el) return 0;
    const track = el.closest('[data-track]') as HTMLElement | null;
    return track ? track.clientWidth - el.offsetWidth - 40 : 0;
  };

  const setX = (x: number) => {
    if (carRef.current) carRef.current.style.transform = `translateX(${x}px)`;
  };

  const tick = (now: number) => {
    if (!animState.current) return;
    const { startTime, duration: dur, startX } = animState.current;
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / dur, 1);
    const targetX = getTrackWidth();
    const currentX = startX + (targetX - startX) * progress;
    setX(currentX);
    if (progress < 1) rafId.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    if (status === 'driving') {
      const currentX = carRef.current
        ? parseFloat(carRef.current.style.transform.replace(/[^0-9.-]/g, '') || '0')
        : 0;
      animState.current = { startTime: performance.now(), duration, startX: currentX };
      rafId.current = requestAnimationFrame(tick);
    }

    if (status === 'broken') {
      cancelAnimationFrame(rafId.current);
      animState.current = null;
    }

    if (status === 'idle') {
      cancelAnimationFrame(rafId.current);
      animState.current = null;
      setX(0);
    }

    return () => { cancelAnimationFrame(rafId.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, duration]);
};
