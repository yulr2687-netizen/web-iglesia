import React, { useState, useEffect, useRef } from 'react';

const RevealOnScroll = ({ children, delay = 0, direction = 'up', className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(entry.target); } },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);
  const getInitialTransform = () => {
    switch (direction) {
      case 'up': return 'translate-y-16';
      case 'down': return '-translate-y-16';
      case 'left': return '-translate-x-16';
      case 'right': return 'translate-x-16';
      case 'zoom': return 'scale-90';
      default: return 'translate-y-8';
    }
  };
  return (
    <div ref={ref} className={`transition-all duration-1000 cubic-bezier(0.17, 0.55, 0.55, 1) ${className} ${isVisible ? 'opacity-100 transform-none' : `opacity-0 ${getInitialTransform()}`}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

export default RevealOnScroll;