"use client";

import { useEffect, useRef, useState } from "react";

// ─── Theme: Sky Blue primary + Light Orange accents, Vibrant & Bold ───
// --blue-deep:   #0c2d6b  (deep navy-blue for dark backgrounds)
// --blue-mid:    #0ea5e9  (sky blue primary)
// --blue-light:  #38bdf8  (light sky blue)
// --blue-glow:   #7dd3fc  (soft glow blue)
// --orange-mid:  #f96b05  (vivid orange accent)
// --orange-light:#fb923c  (light orange)
// --orange-glow: #fed7aa  (warm orange soft)

const slides = [
  {
    title: 'Where <span class="highlight">Curious Minds</span><br/>Become Future Leaders',
    sub: "EduVerse Academy offers world-class education from Early Childhood through Postgraduate, with cutting-edge facilities and expert faculty.",
  },
  {
    title: 'Building <span class="highlight">Skills &amp; Character</span><br/>for a Digital World',
    sub: "Our STEM-integrated curriculum, innovation labs, and global exchange programs prepare students for careers that don't yet exist.",
  },
  {
    title: 'One Institution,<br/><span class="highlight">Infinite Possibilities</span>',
    sub: "From your child's first day of school to their postgraduate degree — EduVerse is your lifelong academic partner.",
  },
];

const programs = [
  { icon: "🌱", level: "Ages 3–6",        title: "Early Childhood",     desc: "Play-based learning that nurtures curiosity, creativity, and social skills in a safe, joyful environment." },
  { icon: "📚", level: "Grades 1–5",       title: "Primary School",      desc: "Core academics blended with arts, sports, and STEM exploration to build strong foundations." },
  { icon: "🔬", level: "Grades 6–10",      title: "Middle & High School",desc: "Advanced curriculum with specialization streams in Science, Commerce, and Humanities." },
  { icon: "🎓", level: "Grades 11–12",     title: "Senior Secondary",    desc: "Board exam preparation with mentoring, career counseling, and competitive exam coaching." },
  { icon: "🏛️", level: "3–4 Year Programs",title: "Undergraduate",       desc: "Bachelor's programs across Engineering, Arts, Business, and Sciences with industry partnerships." },
  { icon: "🌐", level: "1–2 Year Programs",title: "Postgraduate",         desc: "Research-driven Master's programs with international collaborations and placement support." },
];

const galleryItems = [
  { cls: "gc1", label: "Science Labs",    icon: "🔬" },
  { cls: "gc2", label: "Sports Complex",  icon: "⚽" },
  { cls: "gc3", label: "Library",         icon: "📚" },
  { cls: "gc4", label: "Innovation Hub",  icon: "💡" },
  { cls: "gc5", label: "Performing Arts", icon: "🎭" },
  { cls: "gc6", label: "Computer Labs",   icon: "💻" },
  { cls: "gc7", label: "Swimming Pool",   icon: "🏊" },
  { cls: "gc8", label: "Outdoor Campus",  icon: "🌿" },
];

const newsItems = [
  { bg: "gc1", date: "Feb 10, 2026", cat: "Achievement", title: "EduVerse Students Win National Science Olympiad",      excerpt: "Our Grade 9 team brought home gold medals at the 38th National Science Olympiad held in New Delhi.",                                                                    icon: "🏆" },
  { bg: "gc2", date: "Feb 15, 2026", cat: "Admissions",  title: "Admissions Open for Academic Year 2026–27",           excerpt: "Applications are now being accepted for all levels. Early applicants get priority placement in preferred batches.",                                            icon: "📅" },
  { bg: "gc3", date: "Feb 20, 2026", cat: "Events",      title: 'Annual Cultural Fest "Spectrum 2026" Announced',       excerpt: "Three days of performances, exhibitions, and competitions celebrating art, culture, and creativity across all campuses.",                                    icon: "🎭" },
];

const features = [
  { icon: "🎯", title: "Personalized Learning Paths",     desc: "AI-assisted learning plans adapt to each student's pace, strength, and interest areas." },
  { icon: "🌍", title: "Global Exposure Programs",        desc: "Exchange programs, international competitions, and study abroad opportunities for all grade levels." },
  { icon: "🏆", title: "Award-Winning Faculty",           desc: "850+ educators with advanced degrees, industry experience, and a passion for teaching." },
  { icon: "💻", title: "Smart Campus Infrastructure",     desc: "Digital classrooms, robotics labs, innovation hubs, and high-speed connected campus." },
];

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.15 }
    );
    document.querySelectorAll(".reveal, .stat-item, .feat-row").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function CounterItem({ target, label }: { target: number; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let current = 0;
          const step = target / 60;
          const timer = setInterval(() => {
            current += step;
            if (current >= target) { current = target; clearInterval(timer); }
            setCount(Math.floor(current));
          }, 25);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  const isPercent = label.includes("%") && target <= 100;
  const suffix = isPercent ? "%" : "+";

  return (
    <div className="stat-item" ref={ref}>
      <div className="stat-number">{count.toLocaleString()}{suffix}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

export default function SchoolWebsite() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [heroContent, setHeroContent] = useState(slides[0]);
  const [navScrolled, setNavScrolled] = useState(false);

  useScrollReveal();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => {
        const next = (prev + 1) % 3;
        setTimeout(() => setHeroContent(slides[next]), 300);
        return next;
      });
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const container = document.getElementById("particles");
    if (!container) return;
    for (let i = 0; i < 25; i++) {
      const p = document.createElement("div");
      p.className = "particle";
      p.style.cssText = `left:${Math.random() * 100}%;--dur:${4 + Math.random() * 6}s;animation-delay:${Math.random() * 6}s;`;
      container.appendChild(p);
    }
    return () => { if (container) container.innerHTML = ""; };
  }, []);

  useEffect(() => {
    const handleScroll = () => setNavScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setTimeout(() => setHeroContent(slides[index]), 300);
  };

  return (
    <>
      <style>{`
        :root {
          --blue-deep:    #0c2d6b;
          --blue-mid:     #0ea5e9;
          --blue-light:   #38bdf8;
          --blue-glow:    #7dd3fc;
          --blue-soft:    #e0f2fe;
          --orange-mid:   #f97316;
          --orange-light: #fb923c;
          --orange-glow:  #fed7aa;
          --orange-soft:  #fff7ed;
          --silver-mid:   #bae6fd;
          --silver-dark:  #7dd3fc;
          --white:        #ffffff;
          --dark:         #0c1a3a;
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { font-family: 'DM Sans', sans-serif; background: var(--white); color: var(--dark); overflow-x: hidden; }

        /* ── NAVBAR ── */
        nav {
          position: fixed; top: 0; width: 100%; z-index: 1000;
          padding: 0 4rem;
          background: rgba(12, 45, 107, 0.95);
          backdrop-filter: blur(14px);
          border-bottom: 1px solid rgba(56,189,248,0.25);
          display: flex; align-items: center; justify-content: space-between;
          height: 70px; transition: all 0.3s;
        }
        nav.scrolled { box-shadow: 0 4px 30px rgba(14,165,233,0.3); }
        .nav-logo { font-family: 'Playfair Display', serif; font-size: 1.5rem; font-weight: 700; color: #fff; letter-spacing: -0.5px; }
        .nav-logo span { color: var(--orange-light); }
        .nav-links { display: flex; gap: 2.5rem; list-style: none; }
        .nav-links a { color: var(--silver-mid); text-decoration: none; font-size: 0.9rem; font-weight: 500; letter-spacing: 0.5px; transition: color 0.2s; position: relative; }
        .nav-links a::after { content: ''; position: absolute; bottom: -4px; left: 0; width: 0; height: 2px; background: var(--orange-light); transition: width 0.3s; }
        .nav-links a:hover { color: #fff; }
        .nav-links a:hover::after { width: 100%; }
        .nav-cta {
          background: linear-gradient(135deg, #f97316, #fb923c);
          color: white; padding: 0.55rem 1.4rem; border: none; border-radius: 30px;
          font-family: 'DM Sans', sans-serif; font-size: 0.85rem; font-weight: 700;
          cursor: pointer; transition: all 0.3s;
          box-shadow: 0 0 24px rgba(249,115,22,0.55);
        }
        .nav-cta:hover { transform: translateY(-2px); box-shadow: 0 0 36px rgba(249,115,22,0.8); }

        /* ── HERO ── */
        .hero { height: 100vh; position: relative; overflow: hidden; display: flex; align-items: center; }
        .slides-bg { position: absolute; inset: 0; display: flex; transition: transform 0.9s cubic-bezier(0.77,0,0.18,1); }
        .slide { min-width: 100%; height: 100%; position: relative; flex-shrink: 0; }
        .slide::before {
          content: ''; position: absolute; inset: 0; z-index: 1;
          background: linear-gradient(135deg, rgba(12,45,107,0.92) 0%, rgba(14,165,233,0.55) 60%, transparent 100%);
        }
        .slide-1 { background: linear-gradient(135deg, #0c2d6b 0%, #0369a1 45%, #0ea5e9 80%, #38bdf8 100%); }
        .slide-2 { background: linear-gradient(135deg, #0c2d6b 0%, #075985 40%, #0ea5e9 70%, #f97316 100%); }
        .slide-3 { background: linear-gradient(135deg, #0c1a3a 0%, #0c2d6b 40%, #0369a1 75%, #38bdf8 100%); }
        .slide-art { position: absolute; inset: 0; z-index: 0; overflow: hidden; }
        .hero-content {
          position: relative; z-index: 10; padding: 0 6rem; max-width: 800px;
          animation: heroFadeUp 1s ease 0.3s both;
        }
        @keyframes heroFadeUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        .hero-badge {
          display: inline-flex; align-items: center; gap: 0.5rem;
          background: rgba(249,115,22,0.2); border: 1px solid rgba(249,115,22,0.55);
          color: var(--orange-light); padding: 0.4rem 1rem; border-radius: 30px;
          font-size: 0.8rem; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 1.5rem;
        }
        .hero-title {
          font-family: 'Playfair Display', serif; font-size: clamp(2.8rem, 5.5vw, 5rem);
          font-weight: 900; color: white; line-height: 1.1; margin-bottom: 1.5rem; transition: all 0.6s;
        }
        .hero-title .highlight {
          background: linear-gradient(90deg, #f97316, #fbbf24);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        .hero-sub { color: var(--silver-mid); font-size: 1.1rem; line-height: 1.7; max-width: 540px; margin-bottom: 2.5rem; transition: all 0.6s 0.1s; }
        .hero-btns { display: flex; gap: 1rem; flex-wrap: wrap; }
        .btn-primary {
          background: linear-gradient(135deg, #f97316, #fb923c);
          color: white; padding: 0.9rem 2.2rem; border: none; border-radius: 50px;
          font-size: 1rem; font-weight: 700; cursor: pointer; transition: all 0.3s;
          box-shadow: 0 8px 32px rgba(249,115,22,0.5); font-family: 'DM Sans', sans-serif;
        }
        .btn-primary:hover { transform: translateY(-3px); box-shadow: 0 12px 40px rgba(249,115,22,0.75); }
        .btn-outline {
          background: transparent; color: white; padding: 0.9rem 2.2rem;
          border: 2px solid rgba(56,189,248,0.55); border-radius: 50px;
          font-size: 1rem; font-weight: 500; cursor: pointer; transition: all 0.3s; font-family: 'DM Sans', sans-serif;
        }
        .btn-outline:hover { border-color: var(--blue-light); color: var(--blue-light); }
        .slide-dots { position: absolute; bottom: 2.5rem; left: 6rem; z-index: 20; display: flex; gap: 0.6rem; }
        .dot { width: 8px; height: 8px; border-radius: 4px; background: rgba(255,255,255,0.3); transition: all 0.3s; cursor: pointer; border: none; }
        .dot.active { width: 28px; background: var(--orange-light); }
        .geo-float { position: absolute; z-index: 2; border: 1px solid rgba(56,189,248,0.25); border-radius: 4px; }
        .geo-1 { width: 80px; height: 80px; top: 20%; right: 15%; animation: geoFloat 6s ease-in-out infinite; transform: rotate(15deg); background: rgba(14,165,233,0.08); }
        .geo-2 { width: 50px; height: 50px; top: 55%; right: 25%; animation: geoFloat 6s ease-in-out 2s infinite; transform: rotate(45deg); background: rgba(249,115,22,0.08); }
        .geo-3 { width: 120px; height: 120px; bottom: 20%; right: 8%; animation: geoFloat 6s ease-in-out 1s infinite; transform: rotate(-10deg); border-radius: 50%; background: rgba(14,165,233,0.05); }
        @keyframes geoFloat { 0%,100% { transform: rotate(15deg) translateY(0); } 50% { transform: rotate(15deg) translateY(-15px); } }
        .particles { position: absolute; inset: 0; z-index: 0; overflow: hidden; pointer-events: none; }
        .particle { position: absolute; width: 3px; height: 3px; background: var(--orange-light); border-radius: 50%; animation: particleFly var(--dur) ease-in-out infinite; opacity: 0; }
        @keyframes particleFly { 0% { opacity: 0; transform: translateY(100vh) scale(0); } 20% { opacity: 0.9; } 80% { opacity: 0.3; } 100% { opacity: 0; transform: translateY(-100px) scale(1.5); } }

        /* ── STATS BAR ── */
        .stats-bar {
          background: linear-gradient(135deg, #0c2d6b, #0369a1);
          padding: 2.5rem 6rem; display: grid; grid-template-columns: repeat(4,1fr);
          gap: 2rem; border-bottom: 1px solid rgba(56,189,248,0.2);
        }
        .stat-item { text-align: center; border-right: 1px solid rgba(56,189,248,0.2); padding: 1rem; opacity: 0; transform: translateY(20px); transition: all 0.6s; }
        .stat-item:last-child { border-right: none; }
        .stat-item.visible { opacity: 1; transform: translateY(0); }
        .stat-number {
          font-family: 'Playfair Display', serif; font-size: 2.8rem; font-weight: 900;
          background: linear-gradient(135deg, #f97316, #fbbf24);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        .stat-label { color: var(--silver-mid); font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; margin-top: 0.3rem; }

        /* ── SECTIONS ── */
        section { padding: 6rem 6rem; }
        .section-tag { display: inline-block; color: var(--orange-mid); font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 1rem; }
        .section-title { font-family: 'Playfair Display', serif; font-size: clamp(2rem, 3.5vw, 3rem); font-weight: 700; line-height: 1.2; margin-bottom: 1.2rem; }
        .section-sub { color: #4b6e8a; font-size: 1.05rem; line-height: 1.7; max-width: 560px; }

        /* ── PROGRAMS ── */
        .programs { background: linear-gradient(135deg, #0c2d6b, #0369a1); position: relative; overflow: hidden; }
        .programs-header { margin-bottom: 3.5rem; }
        .programs-header .section-title { color: white; }
        .programs-header .section-sub { color: var(--silver-mid); }
        .programs-header .section-tag { color: var(--orange-light); }
        .prog-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        .prog-card {
          background: rgba(255,255,255,0.06); border: 1px solid rgba(56,189,248,0.2);
          border-radius: 16px; padding: 2.2rem; transition: all 0.4s; position: relative; overflow: hidden; cursor: pointer;
        }
        .prog-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, #f97316, #fbbf24);
          transform: scaleX(0); transition: transform 0.4s; transform-origin: left;
        }
        .prog-card:hover { transform: translateY(-6px); background: rgba(249,115,22,0.1); border-color: rgba(249,115,22,0.5); }
        .prog-card:hover::before { transform: scaleX(1); }
        .prog-icon { font-size: 2.5rem; margin-bottom: 1.2rem; display: inline-block; animation: iconBob 3s ease-in-out infinite; }
        @keyframes iconBob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        .prog-level {
          display: inline-block; background: rgba(249,115,22,0.18); color: var(--orange-light);
          font-size: 0.72rem; padding: 0.25rem 0.75rem; border-radius: 20px; font-weight: 700; letter-spacing: 0.5px; margin-bottom: 0.8rem;
        }
        .prog-title { font-family: 'Playfair Display', serif; font-size: 1.3rem; font-weight: 700; color: white; margin-bottom: 0.8rem; }
        .prog-desc { color: #93c5fd; font-size: 0.9rem; line-height: 1.6; }

        /* ── WHY US ── */
        .why-us { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center; }
        .why-visual { position: relative; height: 500px; }
        .why-card-main {
          position: absolute; top: 0; left: 0; right: 10%; height: 60%;
          background: linear-gradient(135deg, #0c2d6b, #0ea5e9);
          border-radius: 20px; display: flex; align-items: center; justify-content: center;
          font-size: 5rem; box-shadow: 0 30px 60px rgba(14,165,233,0.4); overflow: hidden;
        }
        .why-card-main::after { content: ''; position: absolute; inset: 0; background: radial-gradient(circle at 70% 30%, rgba(249,115,22,0.25), transparent 60%); }
        .why-card-float {
          position: absolute; bottom: 0; right: 0; left: 15%; height: 50%;
          background: white; border-radius: 20px; padding: 1.8rem;
          box-shadow: 0 20px 50px rgba(14,165,233,0.15); display: flex; flex-direction: column; justify-content: center;
        }
        .why-badge { display: flex; align-items: center; gap: 0.5rem; color: var(--orange-mid); font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.7rem; }
        .why-card-float h3 { font-family: 'Playfair Display', serif; font-size: 1.4rem; margin-bottom: 0.5rem; color: var(--dark); }
        .why-card-float p { color: #4b6e8a; font-size: 0.9rem; line-height: 1.6; }
        .why-features { display: flex; flex-direction: column; gap: 1.4rem; margin-top: 2rem; }
        .feat-row { display: flex; gap: 1.2rem; align-items: flex-start; opacity: 0; transform: translateX(20px); transition: all 0.5s; }
        .feat-row.visible { opacity: 1; transform: translateX(0); }
        .feat-icon {
          width: 44px; height: 44px; border-radius: 12px;
          background: linear-gradient(135deg, #0ea5e9, #38bdf8);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.1rem; flex-shrink: 0; box-shadow: 0 4px 15px rgba(14,165,233,0.4);
        }
        .feat-text h4 { font-size: 1rem; font-weight: 700; margin-bottom: 0.3rem; color: var(--dark); }
        .feat-text p { color: #4b6e8a; font-size: 0.88rem; line-height: 1.5; }

        /* ── NEWS ── */
        .news-section { background: #f0f9ff; }
        .news-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 2rem; margin-top: 3rem; }
        .news-card { background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(14,165,233,0.1); transition: all 0.35s; cursor: pointer; }
        .news-card:hover { transform: translateY(-6px); box-shadow: 0 12px 40px rgba(249,115,22,0.2); }
        .news-img { height: 180px; position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center; font-size: 3rem; }
        .gc1 { background: linear-gradient(135deg, #0c2d6b, #0ea5e9); }
        .gc2 { background: linear-gradient(135deg, #0369a1, #38bdf8); }
        .gc3 { background: linear-gradient(135deg, #0c2d6b, #f97316); }
        .gc4 { background: linear-gradient(135deg, #0ea5e9, #fbbf24); }
        .gc5 { background: linear-gradient(135deg, #075985, #fb923c); }
        .gc6 { background: linear-gradient(135deg, #0c2d6b, #38bdf8); }
        .gc7 { background: linear-gradient(135deg, #0369a1, #f97316); }
        .gc8 { background: linear-gradient(135deg, #075985, #0ea5e9); }
        .news-date { position: absolute; top: 1rem; right: 1rem; background: white; color: #f97316; padding: 0.3rem 0.7rem; border-radius: 8px; font-size: 0.75rem; font-weight: 700; box-shadow: 0 2px 10px rgba(0,0,0,0.12); }
        .news-body { padding: 1.5rem; }
        .news-cat { color: var(--orange-mid); font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.6rem; }
        .news-title { font-family: 'Playfair Display', serif; font-size: 1.1rem; font-weight: 700; line-height: 1.4; margin-bottom: 0.7rem; color: var(--dark); }
        .news-excerpt { color: #4b6e8a; font-size: 0.88rem; line-height: 1.6; }

        /* ── GALLERY ── */
        .gallery-strip { background: #0c2d6b; padding: 4rem 0; overflow: hidden; }
        .gallery-track { display: flex; gap: 1.5rem; animation: galleryScroll 25s linear infinite; width: max-content; }
        @keyframes galleryScroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .gallery-card {
          width: 240px; height: 160px; border-radius: 12px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          font-size: 2.5rem; overflow: hidden; position: relative;
        }
        .gallery-card::after { content: attr(data-label); position: absolute; bottom: 0.8rem; left: 1rem; color: rgba(255,255,255,0.85); font-family: 'DM Sans', sans-serif; font-size: 0.8rem; font-weight: 600; letter-spacing: 0.5px; }

        /* ── ADMISSIONS CTA ── */
        .admissions-cta {
          background: linear-gradient(135deg, #0c2d6b 0%, #0ea5e9 50%, #f97316 100%);
          text-align: center; padding: 7rem 6rem; position: relative; overflow: hidden;
        }
        .admissions-cta::before { content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: radial-gradient(circle, rgba(249,115,22,0.15) 0%, transparent 60%); animation: pulseGlow 4s ease-in-out infinite; }
        @keyframes pulseGlow { 0%,100% { transform: scale(1); } 50% { transform: scale(1.1); } }
        .admissions-cta h2 { font-family: 'Playfair Display', serif; font-size: clamp(2rem, 4vw, 3.5rem); color: white; margin-bottom: 1.2rem; position: relative; z-index: 1; }
        .admissions-cta p { color: rgba(255,255,255,0.85); font-size: 1.1rem; max-width: 560px; margin: 0 auto 2.5rem; position: relative; z-index: 1; line-height: 1.7; }
        .cta-btns { display: flex; gap: 1rem; justify-content: center; position: relative; z-index: 1; }

        /* ── FOOTER ── */
        footer { background: #060f2a; padding: 4rem 6rem 2rem; border-top: 1px solid rgba(56,189,248,0.15); }
        .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 3rem; margin-bottom: 3rem; }
        .footer-brand { font-family: 'Playfair Display', serif; font-size: 1.4rem; color: white; font-weight: 700; margin-bottom: 1rem; }
        .footer-brand span { color: var(--orange-light); }
        .footer-desc { color: #7dd3fc; font-size: 0.88rem; line-height: 1.7; }
        .footer-col h4 { color: white; font-size: 0.9rem; font-weight: 700; margin-bottom: 1.2rem; letter-spacing: 0.5px; }
        .footer-col ul { list-style: none; }
        .footer-col li { margin-bottom: 0.7rem; }
        .footer-col a { color: #7dd3fc; text-decoration: none; font-size: 0.88rem; transition: color 0.2s; }
        .footer-col a:hover { color: var(--orange-light); }
        .footer-bottom { border-top: 1px solid rgba(255,255,255,0.07); padding-top: 1.5rem; display: flex; justify-content: space-between; align-items: center; color: #7dd3fc; font-size: 0.82rem; }

        /* ── ANIMATIONS ── */
        .reveal { opacity: 0; transform: translateY(30px); transition: all 0.7s ease; }
        .reveal.visible { opacity: 1; transform: translateY(0); }

        @media (max-width: 900px) {
          nav { padding: 0 1.5rem; }
          .nav-links { display: none; }
          .hero-content { padding: 0 2rem; }
          .stats-bar { grid-template-columns: repeat(2,1fr); padding: 2rem; }
          section { padding: 4rem 2rem; }
          .prog-grid { grid-template-columns: 1fr; }
          .why-us { grid-template-columns: 1fr; }
          .why-visual { height: 300px; }
          .news-grid { grid-template-columns: 1fr; }
          footer { padding: 3rem 2rem 1.5rem; }
          .footer-grid { grid-template-columns: 1fr 1fr; gap: 2rem; }
          .footer-bottom { flex-direction: column; gap: 0.5rem; text-align: center; }
        }
      `}</style>

      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />

      {/* NAVBAR */}
      <nav className={navScrolled ? "scrolled" : ""}>
        <div className="nav-logo">Edu<span>Verse</span> Academy</div>
        <ul className="nav-links">
          {["Programs","About","News","Admissions","Contact"].map((item) => (
            <li key={item}><a href={`#${item.toLowerCase()}`}>{item}</a></li>
          ))}
        </ul>
        <button className="nav-cta" onClick={() => document.getElementById("admissions")?.scrollIntoView()}>Apply Now</button>
      </nav>

      {/* HERO */}
      <section className="hero" id="home">
        <div className="slides-bg" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {[1,2,3].map((n) => (
            <div key={n} className={`slide slide-${n}`}>
              <div className="slide-art">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <radialGradient id={`rg${n}`} cx="80%" cy="30%">
                      <stop offset="0%" stopColor="#f97316" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="transparent" />
                    </radialGradient>
                  </defs>
                  <rect width="100%" height="100%" fill={`url(#rg${n})`} />
                  <circle cx="75%" cy="25%" r="200" fill="none" stroke="rgba(56,189,248,0.2)" strokeWidth="1" />
                  <circle cx="75%" cy="25%" r="320" fill="none" stroke="rgba(249,115,22,0.1)" strokeWidth="1" />
                  <circle cx="75%" cy="25%" r="440" fill="none" stroke="rgba(56,189,248,0.06)" strokeWidth="1" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        <div className="geo-float geo-1" />
        <div className="geo-float geo-2" />
        <div className="geo-float geo-3" />
        <div className="particles" id="particles" />

        <div className="hero-content">
          <div className="hero-badge">🎓 Multi-Level Excellence</div>
          <h1 className="hero-title" dangerouslySetInnerHTML={{ __html: heroContent.title }} />
          <p className="hero-sub">{heroContent.sub}</p>
          <div className="hero-btns">
            <button className="btn-primary">Explore Programs</button>
            <button className="btn-outline">▶ Virtual Campus Tour</button>
          </div>
        </div>

        <div className="slide-dots">
          {[0,1,2].map((i) => (
            <button key={i} className={`dot${currentSlide === i ? " active" : ""}`} onClick={() => goToSlide(i)} />
          ))}
        </div>
      </section>

      {/* STATS BAR */}
      <div className="stats-bar">
        <CounterItem target={12500} label="Students Enrolled" />
        <CounterItem target={850}   label="Expert Faculty" />
        <CounterItem target={98}    label="% Pass Rate" />
        <CounterItem target={45}    label="Years of Excellence" />
      </div>

      {/* PROGRAMS */}
      <section className="programs reveal" id="programs">
        <div className="programs-header">
          <span className="section-tag">Academic Programs</span>
          <h2 className="section-title">Learning for Every Stage<br />of Life</h2>
          <p className="section-sub">From foundational early education to advanced university degrees — one institution, infinite possibilities.</p>
        </div>
        <div className="prog-grid">
          {programs.map((prog) => (
            <div key={prog.title} className="prog-card">
              <div className="prog-icon">{prog.icon}</div>
              <div className="prog-level">{prog.level}</div>
              <h3 className="prog-title">{prog.title}</h3>
              <p className="prog-desc">{prog.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHY US */}
      <section id="about">
        <div className="why-us">
          <div className="why-visual">
            <div className="why-card-main">🏫</div>
            <div className="why-card-float">
              <div className="why-badge">⭐ Recognized Excellence</div>
              <h3>National Award Winner</h3>
              <p>Ranked #1 Multi-Level Institution in the region for 5 consecutive years by the National Education Board.</p>
            </div>
          </div>
          <div className="why-content reveal">
            <span className="section-tag">Why EduVerse</span>
            <h2 className="section-title">More Than Education —<br />A Life Transformation</h2>
            <p className="section-sub">We believe every student deserves an environment where they feel seen, supported, and inspired to reach their full potential.</p>
            <div className="why-features">
              {features.map((feat) => (
                <div key={feat.title} className="feat-row reveal">
                  <div className="feat-icon">{feat.icon}</div>
                  <div className="feat-text">
                    <h4>{feat.title}</h4>
                    <p>{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* NEWS */}
      <section className="news-section" id="news">
        <div className="reveal">
          <span className="section-tag">Latest Updates</span>
          <h2 className="section-title">News &amp; Events</h2>
        </div>
        <div className="news-grid">
          {newsItems.map((n) => (
            <div key={n.title} className="news-card reveal">
              <div className={`news-img ${n.bg}`}>
                {n.icon}
                <div className="news-date">{n.date}</div>
              </div>
              <div className="news-body">
                <div className="news-cat">{n.cat}</div>
                <h3 className="news-title">{n.title}</h3>
                <p className="news-excerpt">{n.excerpt}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY STRIP */}
      <div className="gallery-strip">
        <div className="gallery-track">
          {[...galleryItems, ...galleryItems].map((item, i) => (
            <div key={i} className={`gallery-card ${item.cls}`} data-label={item.label}>
              {item.icon}
            </div>
          ))}
        </div>
      </div>

      {/* ADMISSIONS CTA */}
      <section className="admissions-cta" id="admissions">
        <h2>Begin Your EduVerse Journey Today</h2>
        <p>Join 12,500+ students from 30+ countries. Applications for 2026–27 are open across all programs and levels.</p>
        <div className="cta-btns">
          <button className="btn-primary" style={{ fontSize: "1.05rem", padding: "1rem 2.5rem" }}>Apply for Admission</button>
          <button className="btn-outline" style={{ fontSize: "1.05rem", padding: "1rem 2.5rem", borderColor: "rgba(255,255,255,0.45)" }}>Download Prospectus</button>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">Edu<span>Verse</span> Academy</div>
            <p className="footer-desc">A premier multi-level educational institution committed to holistic development, academic excellence, and shaping tomorrow&apos;s global leaders since 1981.</p>
          </div>
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>{["About Us","Faculty","Infrastructure","Achievements","Alumni"].map((l) => <li key={l}><a href="#">{l}</a></li>)}</ul>
          </div>
          <div className="footer-col">
            <h4>Programs</h4>
            <ul>{["Early Childhood","Primary School","Secondary School","Undergraduate","Postgraduate"].map((l) => <li key={l}><a href="#">{l}</a></li>)}</ul>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <ul>
              <li><a href="#">📍 123 EduVerse Boulevard</a></li>
              <li><a href="#">📞 +91 98765 43210</a></li>
              <li><a href="#">✉️ admin@eduverse.edu</a></li>
              <li><a href="#">🌐 www.eduverse.edu</a></li>
              <li><a href="#">⏰ Mon–Sat: 8AM–5PM</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 EduVerse Academy. All rights reserved.</span>
          <span>Privacy Policy · Terms of Use · Sitemap</span>
        </div>
      </footer>
    </>
  );
}