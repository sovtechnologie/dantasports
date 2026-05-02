import { useEffect, useRef, useState } from "react";

/**
 * Fires once when the element enters the viewport.
 * Returns [ref, isVisible].
 * Includes a fallback for elements already in view on mount.
 */
export function useIntersectionObserver(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const fired = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const trigger = () => {
      if (fired.current) return;
      fired.current = true;
      setIsVisible(true);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          trigger();
          observer.unobserve(el);
        }
      },
      { threshold: 0.01, rootMargin: "0px 0px 100px 0px", ...options }
    );

    observer.observe(el);

    // Fallback: already in viewport
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight + 100) {
      trigger();
      observer.disconnect();
    }

    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
}
