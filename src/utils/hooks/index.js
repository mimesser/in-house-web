import { useEffect } from 'react';

export function useOutsideClick(ref, onOutsideClick) {
  const handleClick = event => {
    if (ref.current && ref.current.contains(event.target)) {
      return;
    }

    onOutsideClick();
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);
}

export function useTimeout(time, onTimeout) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onTimeout();
    }, time);
    return () => clearTimeout(timer);
  }, []);
}
