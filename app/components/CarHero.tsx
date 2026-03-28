"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HEADLINE = "WELCOME ITZFIZZ";

const stats = [
  { pct: 58,  suffix: "%", desc: "Increase in pick up point use",     color: "card-yellow", pos: "top"    },
  { pct: 27,  suffix: "%", desc: "Increase in pick up point use",     color: "card-dark",   pos: "top"    },
  { pct: 23,  suffix: "%", desc: "Decreased in customer phone calls", color: "card-blue",   pos: "bottom" },
  { pct: 40,  suffix: "%", desc: "Decreased in customer phone calls", color: "card-orange", pos: "bottom" },
];

export default function CarHero() {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const stickyRef   = useRef<HTMLDivElement>(null);
  const carRef      = useRef<HTMLDivElement>(null);
  const paintRef    = useRef<HTMLDivElement>(null);
  const textRef     = useRef<HTMLDivElement>(null);
  const statRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const car     = carRef.current;
    const paint   = paintRef.current;
    const textEl  = textRef.current;
    if (!section || !car || !paint || !textEl) return;

    const viewW  = window.innerWidth;
    const carW   = car.offsetWidth;
    const startX = -(carW + 40);
    const endX   = viewW + 40;
    const travel = endX - startX;

    car.style.transform   = `translateX(${startX}px) translateZ(0)`;
    paint.style.width     = "0%";
    textEl.style.clipPath = "inset(0 100% 0 0)";

    // ── rAF scroll loop (zero lag) ──
    let rafId: number;
    let currentX  = startX;
    let targetX   = startX;
    let prevX     = startX;
    let velocity  = 0;           // px/frame — drives motion blur

    const getProgress = () => {
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const scrollable = section.scrollHeight - window.innerHeight;
      return Math.max(0, Math.min(1, (window.scrollY - sectionTop) / scrollable));
    };

    const onScroll = () => {
      targetX = startX + travel * getProgress();
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.20;
      velocity  = currentX - prevX;
      prevX     = currentX;

      // Move car
      car.style.transform = `translateX(${currentX.toFixed(1)}px) translateZ(0)`;

      // ── Motion blur: proportional to velocity ──
      const blur   = Math.min(Math.abs(velocity) * 0.35, 14); // cap at 14px
      const scaleX = 1 + Math.min(Math.abs(velocity) * 0.004, 0.18); // slight horizontal stretch
      car.style.filter    = blur > 0.5 ? `blur(${blur.toFixed(1)}px)` : "none";
      car.style.transform = `translateX(${currentX.toFixed(1)}px) scaleX(${scaleX.toFixed(3)}) translateZ(0)`;

      // Green paint
      const frontX = currentX + carW * 0.85;
      const pct    = Math.max(0, Math.min(100, (frontX / viewW) * 100));
      paint.style.width     = `${pct.toFixed(2)}%`;
      textEl.style.clipPath = `inset(0 ${Math.max(0, 100 - pct).toFixed(2)}% 0 0)`;

      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    rafId = requestAnimationFrame(tick);

    // ── Pin via ScrollTrigger (no scrub) ──
    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      pin: stickyRef.current!,
      pinSpacing: false,
    });

    // ── Staggered load-in for stat cards ──
    gsap.fromTo(
      statRefs.current.filter(Boolean),
      { autoAlpha: 0, y: 40 },
      {
        autoAlpha: 1, y: 0, duration: 0.9,
        stagger: 0.18, ease: "power3.out", delay: 0.2,
        onComplete: () => animateCounters(),
      }
    );

    // ── Animated counters ──
    const animateCounters = () => {
      counterRefs.current.forEach((el, i) => {
        if (!el) return;
        const target = stats[i].pct;
        let start = 0;
        const duration = 1400;
        const startTime = performance.now();

        const step = (now: number) => {
          const elapsed  = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // ease out cubic
          const eased  = 1 - Math.pow(1 - progress, 3);
          const current = Math.round(eased * target);
          el.textContent = `${current}`;
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    };

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
      st.kill();
    };
  }, []);

  const topStats    = stats.filter((s) => s.pos === "top");
  const bottomStats = stats.filter((s) => s.pos === "bottom");

  const dashes = Array.from({ length: 9 }, (_, i) => ({
    left: `${8 + i * 10}%`, width: "5%",
  }));

  return (
    <div ref={sectionRef} className="scroll-driver">
      <div ref={stickyRef} className="hero-sticky">

        {/* ── Top stats ── */}
        <div className="stats-grid-top">
          {topStats.map((s, i) => (
            <div key={i} className={`stat-card ${s.color}`} ref={(el) => { statRefs.current[i] = el; }}>
              <div className="pct">
                <span ref={(el) => { counterRefs.current[i] = el; }}>0</span>{s.suffix}
              </div>
              <div className="desc">{s.desc}</div>
            </div>
          ))}
        </div>

        {/* ── Road strip ── */}
        <div className="road-container">
          <div className="road-track">
            {dashes.map((d, i) => (
              <div key={i} className="road-dash" style={{ left: d.left, width: d.width }} />
            ))}
            <div ref={paintRef} className="road-paint" />
            <div ref={textRef} className="road-text">{HEADLINE}</div>
          </div>
          <div ref={carRef} className="car-wrapper">
            <CarSVG />
          </div>
        </div>

        {/* ── Bottom stats ── */}
        <div className="stats-grid-bottom">
          {bottomStats.map((s, i) => (
            <div key={i} className={`stat-card ${s.color}`} ref={(el) => { statRefs.current[topStats.length + i] = el; }}>
              <div className="pct">
                <span ref={(el) => { counterRefs.current[topStats.length + i] = el; }}>0</span>{s.suffix}
              </div>
              <div className="desc">{s.desc}</div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

// ── Top-down orange sports car ───────────────────────────────────────────────
function CarSVG() {
  return (
    <svg
      viewBox="0 0 220 120"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        width: "100%", height: "auto",
        filter: "drop-shadow(0 6px 20px rgba(0,0,0,0.6))",
        overflow: "visible",
      }}
    >
      <ellipse cx="110" cy="60" rx="98" ry="48" fill="#f97316" />
      <rect x="28" y="46" width="164" height="28" rx="6" fill="#ea580c" opacity="0.5" />
      <ellipse cx="110" cy="60" rx="52" ry="29" fill="#111" />
      <ellipse cx="100" cy="52" rx="20" ry="11" fill="#fff" opacity="0.10" />
      <rect x="196" y="46" width="18" height="28" rx="6" fill="#c2410c" />
      <rect x="200" y="54" width="10" height="12" rx="3" fill="#7c2d12" opacity="0.7" />
      <rect x="6" y="46" width="18" height="28" rx="6" fill="#c2410c" />
      <rect x="172" y="7"  width="30" height="16" rx="6" fill="#1a1a1a" />
      <rect x="172" y="97" width="30" height="16" rx="6" fill="#1a1a1a" />
      <ellipse cx="187" cy="15"  rx="9" ry="5" fill="#6b7280" />
      <ellipse cx="187" cy="105" rx="9" ry="5" fill="#6b7280" />
      <rect x="18" y="7"  width="30" height="16" rx="6" fill="#1a1a1a" />
      <rect x="18" y="97" width="30" height="16" rx="6" fill="#1a1a1a" />
      <ellipse cx="33" cy="15"  rx="9" ry="5" fill="#6b7280" />
      <ellipse cx="33" cy="105" rx="9" ry="5" fill="#6b7280" />
      <line x1="70" y1="34" x2="175" y2="34" stroke="#fed7aa" strokeWidth="2.5" opacity="0.6" />
      <line x1="70" y1="86" x2="175" y2="86" stroke="#fed7aa" strokeWidth="2.5" opacity="0.6" />
      <rect x="145" y="40" width="22" height="6" rx="2" fill="#0f0f0f" />
      <rect x="145" y="74" width="22" height="6" rx="2" fill="#0f0f0f" />
      <ellipse cx="206" cy="50" rx="5" ry="3" fill="#fef9c3" opacity="0.9" />
      <ellipse cx="206" cy="70" rx="5" ry="3" fill="#fef9c3" opacity="0.9" />

      {/* Speed lines — always visible behind car */}
      <line x1="2" y1="45" x2="30" y2="45" stroke="#fff" strokeWidth="1.5" opacity="0.15" />
      <line x1="2" y1="60" x2="22" y2="60" stroke="#fff" strokeWidth="2"   opacity="0.12" />
      <line x1="2" y1="75" x2="30" y2="75" stroke="#fff" strokeWidth="1.5" opacity="0.15" />
    </svg>
  );
}
