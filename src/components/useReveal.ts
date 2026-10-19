'use client';
import { useEffect } from 'react';

// Entrée des éléments marqués data-reveal quand ils passent sous les 90 % de l'écran.
// Un élément déjà dépassé (saut par une ancre, retour en arrière) apparaît aussi.
export default function useReveal() {
  useEffect(() => {
    let pending = [...document.querySelectorAll<HTMLElement>('[data-reveal]')];
    let frame = 0;
    const check = () => {
      frame = 0;
      const limit = window.innerHeight * 0.9;
      pending = pending.filter((el) => {
        if (el.getBoundingClientRect().top < limit) {
          el.classList.add('is-in');
          return false;
        }
        return true;
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };
    check();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);
}
