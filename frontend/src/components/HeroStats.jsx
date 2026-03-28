import { useEffect, useRef } from 'react';

function AnimatedNumber({ value, className }) {
  const ref = useRef(null);
  const prevValue = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const start = prevValue.current;
    const end = value;
    const duration = 500;
    const startTime = performance.now();

    function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(start + (end - start) * eased);
      if (progress < 1) requestAnimationFrame(step);
      else prevValue.current = end;
    }

    requestAnimationFrame(step);
  }, [value]);

  return <span ref={ref} className={className}>0</span>;
}

export default function HeroStats({ total, fullTime, roles }) {
  return (
    <section className="hero">
      <div className="hero-badge">
        <span className="glowing-dot" />
        Live Dashboard
      </div>
      <h1>
        Manage Your<br />
        <span className="g-text">Team with Pulse</span>
      </h1>
      <p className="hero-desc">
        A modern employee management system powered by FastAPI &amp; MySQL.
        Add, update, and organize your team effortlessly.
      </p>
      <div className="stats-row">
        <div className="stat">
          <AnimatedNumber value={total} className="stat-number violet" />
          <div className="stat-label">Total Members</div>
        </div>
        <div className="stat">
          <AnimatedNumber value={fullTime} className="stat-number cyan" />
          <div className="stat-label">Full-time</div>
        </div>
        <div className="stat">
          <AnimatedNumber value={roles} className="stat-number amber" />
          <div className="stat-label">Unique Roles</div>
        </div>
      </div>
    </section>
  );
}
