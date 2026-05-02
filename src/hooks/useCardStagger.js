import { useEffect, useRef, useState } from "react";

/**
 * Stagger-animates cards when the grid container enters the viewport.
 * Returns [containerRef, visibleSet].
 *
 * Usage in JSX:
 *   className={`hs-card card-stagger${cardVisible.has(idx) ? " card-in" : ""}`}
 *
 * Cards are visible by default (no opacity:0 on .hs-card).
 * The card-stagger class hides them, then card-in reveals them.
 */
export function useCardStagger(count = 4, delay = 80) {
  const ref    = useRef(null);
  const fired  = useRef(false);
  const [visible, setVisible] = useState(new Set());

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const trigger = () => {
      if (fired.current) return;
      fired.current = true;
      for (let i = 0; i < count; i++) {
        setTimeout(() => {
          setVisible((p) => new Set([...p, i]));
        }, i * delay);
      }
    };

    // Check if already in viewport on mount
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight + 200) {
      // Small delay so CSS class is applied before animation starts
      setTimeout(trigger, 50);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          trigger();
          observer.disconnect();
        }
      },
      { threshold: 0.01, rootMargin: "0px 0px 150px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [count, delay]);

  return [ref, visible];
}
