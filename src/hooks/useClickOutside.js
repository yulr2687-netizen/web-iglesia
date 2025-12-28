import { useEffect } from 'react';

const useClickOutside = (ref, handler, ignoreRef) => {
  useEffect(() => {
    const listener = (event) => {
      // Si el clic es dentro del elemento ref O dentro del elemento ignoreRef, no hacer nada
      if (
        !ref.current || 
        ref.current.contains(event.target) ||
        (ignoreRef && ignoreRef.current && ignoreRef.current.contains(event.target))
      ) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler, ignoreRef]);
};

export default useClickOutside;