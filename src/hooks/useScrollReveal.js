import { useEffect, useRef } from "react";

/**
 * Adds .pg-in class to all .pg-reveal / .pg-reveal-left / .pg-reveal-right
 * elements inside the container when they enter the viewport.
 */
export function useScrollReveal() {
  const containerRef = useRef(null);

  useEffect(() => {
    const els = (containerRef.current || document).querySelectorAll(
      ".pg-reveal, .pg-reveal-left, .pg-reveal-right"
    );
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("pg-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return containerRef;
}
