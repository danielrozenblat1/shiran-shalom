import React, { useEffect, useRef, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import './fonts.css';
import styles from './TreatsPage.module.css';
import LeadForm from './LeadForm';
import ByMe from '../components/ByMe/ByMe';
import { openWhatsApp } from './leadApi';

import logo from '../images/שירן שלום לוגו.webp';

// ---- media ---------------------------------------------------------------
// Lip pigment results. Add more photos here and they flow into the ribbon and the grid.
import lips01 from '../images/פיגמנט שפתייים.webp';
import lips02 from '../images/פיגמנט שפתיים תוצאה 1.webp';

// Testimonials about the treatments (screenshots / collages).
import review01 from '../images/שירן שלום המלצות.webp';

const resultImages = [lips01, lips02];

// Before / after clips: [{ src, poster }]. The section renders only when this has items.
const beforeAfterVideos = [];

const testimonials = [review01];

// ---- helpers -------------------------------------------------------------
const useReveal = () => {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (!('IntersectionObserver' in window) || el.getBoundingClientRect().top < window.innerHeight * 0.9) {
      setShown(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, shown];
};

const Reveal = ({ children, className = '', as: Tag = 'div' }) => {
  const [ref, shown] = useReveal();
  return (
    <Tag ref={ref} className={`${styles.reveal} ${shown ? styles.revealIn : ''} ${className}`}>
      {children}
    </Tag>
  );
};

// Seamless infinite strip. The list is repeated until it is long enough to loop without a gap.
const Ribbon = ({ images, duration = 60, label }) => {
  const minItems = 10;
  const repeats = Math.max(1, Math.ceil(minItems / Math.max(1, images.length)));
  const list = Array.from({ length: repeats }, () => images).flat();
  return (
    <div className={styles.ribbon} aria-label={label}>
      <div className={styles.ribbonTrack} style={{ animationDuration: `${duration}s` }}>
        {[0, 1].map((group) => (
          <div className={styles.ribbonGroup} key={group} aria-hidden={group === 1}>
            {list.map((src, i) => (
              <div className={styles.ribbonItem} key={`${group}-${i}`}>
                <img
                  src={src}
                  alt={group === 0 ? `${label} ${(i % images.length) + 1}` : ''}
                  loading={i < 5 ? 'eager' : 'lazy'}
                  decoding="async"
                  draggable="false"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const LazyVideo = ({ src, poster, label }) => {
  const wrapRef = useRef(null);
  const videoRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = wrapRef.current;
    if (!node || !('IntersectionObserver' in window)) {
      setInView(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: '300px' }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || !videoRef.current) return;
    const p = videoRef.current.play();
    if (p && typeof p.catch === 'function') p.catch(() => {});
  }, [inView]);

  return (
    <figure className={styles.videoTile} ref={wrapRef}>
      <video
        ref={videoRef}
        src={inView ? src : undefined}
        poster={poster}
        aria-label={label}
        preload="none"
        loop
        muted
        playsInline
        controls
      />
    </figure>
  );
};

// Scrolls to the lead form closest below the viewport (or the last one when at the bottom).
const scrollToNearestForm = () => {
  const forms = Array.from(document.querySelectorAll('[data-lead-form]'));
  if (!forms.length) return;
  const next = forms.find((f) => f.getBoundingClientRect().top > window.innerHeight * 0.25) || forms[forms.length - 1];
  next.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const input = next.querySelector('input[name="fullName"]');
  if (input) setTimeout(() => input.focus({ preventScroll: true }), 650);
};

// ---- page ----------------------------------------------------------------
const TreatsPage = () => {
  const [gridRef, gridShown] = useReveal();
  const [barShown, setBarShown] = useState(false);
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    const prevTitle = document.title;
    document.title = 'פיגמנט שפתיים | שירן שלום';
    window.scrollTo(0, 0);
    return () => {
      document.title = prevTitle;
    };
  }, []);

  // The bottom bar appears after 40% of the page has been scrolled.
  useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setBarShown(max > 0 && window.scrollY / max >= 0.4);
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // Hide the bar while a form is on screen so it never covers the submit button.
  useEffect(() => {
    const forms = Array.from(document.querySelectorAll('[data-lead-form]'));
    if (!forms.length || !('IntersectionObserver' in window)) return undefined;
    const visible = new Set();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
        setFormVisible(visible.size > 0);
      },
      { threshold: 0.2 }
    );
    forms.forEach((f) => io.observe(f));
    return () => io.disconnect();
  }, []);

  return (
    <main className={styles.page} dir="rtl">
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <img src={logo} alt="שירן שלום" className={styles.logo} width="586" height="285" />
        <p className={styles.heroIntro}>אם תמיד חשבת לעשות פיגמנט שפתיים, הדף הזה בשבילך</p>
        <h1 className={styles.heroTitle}>את יכולה להיראות בשיא שלך כל בוקר מחדש</h1>
        <ul className={styles.perks} aria-label="מה חוסכות">
          {['בלי להתארגן', 'בלי אודם', 'בלי תיקונים לאורך היום'].map((perk, i) => (
            <li className={styles.perk} style={{ '--i': i }} key={perk}>
              {perk}
            </li>
          ))}
        </ul>
        <p className={styles.heroAccent}>תוך שעתיים בלבד!</p>
        <p className={styles.heroText}>טיפול פיגמנט שפתיים מותאם אישית אלייך, בכל השיטות הכי מתקדמות שיש</p>
      </section>

      <div className={styles.heroRibbon}>
        <Ribbon images={resultImages} duration={55} label="תוצאת פיגמנט שפתיים אצל שירן שלום" />
      </div>

      <LeadForm />

      {/* RESULTS */}
      <section className={styles.section}>
        <Reveal as="h2" className={styles.title}>
          למקרה ולא ראית..
        </Reveal>
        <Reveal as="p" className={styles.subtitle}>
          כך הבנות יוצאות ממני אחרי הטיפול
        </Reveal>

        <div ref={gridRef} className={`${styles.grid} ${gridShown ? styles.gridIn : ''}`}>
          {resultImages.map((src, i) => (
            <figure className={styles.tile} style={{ '--i': i }} key={i}>
              <img src={src} alt={`תוצאת פיגמנט שפתיים ${i + 1}`} loading="lazy" decoding="async" draggable="false" />
            </figure>
          ))}
        </div>

        {beforeAfterVideos.length > 0 && (
          <Reveal className={styles.videoGrid}>
            {beforeAfterVideos.map((v, i) => (
              <LazyVideo key={i} src={v.src} poster={v.poster} label={`לפני ואחרי פיגמנט שפתיים ${i + 1}`} />
            ))}
          </Reveal>
        )}
      </section>

      <LeadForm title="רוצה גם תוצאה כזאת?" subtitle="השאירי פרטים ונתאם שיחה קצרה להתאמת הגוון" />

      {/* TESTIMONIALS */}
      <section className={styles.section}>
        <Reveal as="h2" className={styles.title}>
          מה הבנות אומרות אחרי הטיפול
        </Reveal>
        <Reveal className={styles.reviews}>
          {testimonials.map((src, i) => (
            <figure className={styles.reviewTile} key={i}>
              <img src={src} alt={`המלצה על טיפול פיגמנט שפתיים ${i + 1}`} loading="lazy" decoding="async" draggable="false" />
            </figure>
          ))}
        </Reveal>
      </section>

      <LeadForm title="מוכנה לשפתיים שנראות מושלם?" subtitle="השאירי פרטים ואני כבר חוזרת אלייך" />

      <footer className={styles.footer}>
        <img src={logo} alt="" className={styles.footerLogo} aria-hidden="true" />
        <ByMe />
      </footer>

      {/* FLOATING WHATSAPP */}
      <button type="button" className={styles.floatWa} onClick={openWhatsApp} aria-label="פנייה בוואטסאפ">
        <span className={styles.floatPulse} aria-hidden="true" />
        <FaWhatsapp />
      </button>

      {/* STICKY BOTTOM CTA */}
      <div className={`${styles.stickyBar} ${barShown && !formVisible ? styles.stickyBarIn : ''}`} aria-hidden={!barShown || formVisible}>
        <button type="button" className={styles.stickyBtn} onClick={scrollToNearestForm} tabIndex={barShown && !formVisible ? 0 : -1}>
          שירן, בואי נדבר
        </button>
      </div>
    </main>
  );
};

export default TreatsPage;
