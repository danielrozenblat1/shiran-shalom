import React, { useEffect, useRef, useState } from 'react';
import './fonts.css';
import styles from './TreatsPage.module.css';
import LeadForm from './LeadForm';
import ByMe from '../components/ByMe/ByMe';
import LottieIcon from '../components/lottie/LottieIcon';
import { openWhatsApp } from './leadApi';
import { trackWhatsAppLead } from './pixel';


// ---- media ---------------------------------------------------------------
// Lip pigment results. Add more photos here and they flow into the ribbon and the grid.
import lips01 from '../images/פיגמנט שפתייים.webp';
import lips02 from '../images/פיגמנט שפתיים תוצאה 1.webp';
import ig01 from '../images/פיגמנט שפתיים אינסטגרם 1.webp';
import ig02 from '../images/פיגמנט שפתיים אינסטגרם 2.webp';
import ig03 from '../images/פיגמנט שפתיים אינסטגרם 3.webp';
import ig04 from '../images/פיגמנט שפתיים אינסטגרם 4.webp';
import ig05 from '../images/פיגמנט שפתיים אינסטגרם 5.webp';
import ig06 from '../images/פיגמנט שפתיים אינסטגרם 6.webp';
import ig07 from '../images/פיגמנט שפתיים אינסטגרם 7.webp';

// Posters for the embedded Instagram reels (the clips themselves stream from Instagram).
import reel01 from '../images/ריל פיגמנט שפתיים 1.webp';
import reel02 from '../images/ריל פיגמנט שפתיים 2.webp';
import reel03 from '../images/ריל פיגמנט שפתיים 3.webp';
import reel04 from '../images/ריל פיגמנט שפתיים 4.webp';
import reel05 from '../images/ריל פיגמנט שפתיים 5.webp';

// Testimonials about the treatments (screenshots / collages).
import review01 from '../images/שירן שלום המלצות.webp';
import review02 from '../images/שירן שלום המלצות 2.webp';
import review03 from '../images/שירן שלום המלצות 3.webp';
import review04 from '../images/שירן שלום המלצות 4.webp';
import review05 from '../images/שירן שלום המלצות 5.webp';
import review06 from '../images/שירן שלום המלצות 6.webp';

const resultImages = [ig01, lips01, ig03, ig04, lips02, ig02, ig05, ig06, ig07];

// Served from public/ so index.html can preload it (the hashed import URL is not known up front).
const logo = '/images/shiran-logo.webp';

const loadChatIcon = () => import('../Icons/float-chat.json');

// Lip pigment reels from Shiran's Instagram, embedded via the official /embed/ page (nothing is downloaded).
// `id` is the reel shortcode. The section renders only when this has items.
const reels = [
  { id: 'DfFtKdkRXBz', poster: reel04 },
  { id: 'DdrsiSnRDOe', poster: reel02 },
  { id: 'DYDCiYHuQkr', poster: reel01 },
  { id: 'DfKx-_JxyW2', poster: reel05 },
  { id: 'DemlO_DONeS', poster: reel03 },
];

const testimonials = [review02, review04, review01, review05, review03, review06];

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
                  fetchpriority="low"
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

// Instagram reel embed. The iframe (and Instagram's scripts) mount only when the tile
// approaches the viewport; until it has loaded, a lightweight local poster is shown.
const ReelEmbed = ({ id, poster, label }) => {
  const wrapRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);

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
      { rootMargin: '250px' }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <figure className={styles.reelTile} ref={wrapRef}>
      <img src={poster} alt="" className={styles.reelPoster} loading="lazy" decoding="async" draggable="false" aria-hidden={loaded} />
      {inView && (
        <iframe
          className={`${styles.reelFrame} ${loaded ? styles.reelFrameIn : ''}`}
          src={`https://www.instagram.com/reel/${id}/embed/`}
          title={label}
          loading="lazy"
          allow="encrypted-media; fullscreen"
          allowFullScreen
          onLoad={() => setLoaded(true)}
        />
      )}
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

  // A WhatsApp click is a lead too; the pixel helper makes sure one visit reports at most one Lead.
  const onWhatsApp = () => {
    trackWhatsAppLead();
    openWhatsApp();
  };

  return (
    <main className={styles.page} dir="rtl">
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <img src={logo} alt="שירן שלום" className={styles.logo} width="586" height="285" fetchpriority="high" decoding="async" />
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

        {reels.length > 0 && (
          <>
            <Reveal as="p" className={`${styles.subtitle} ${styles.subtitleGap}`}>
              ובווידאו, ישר מהקליניקה
            </Reveal>
            <Reveal className={styles.videoGrid}>
              {reels.map((r, i) => (
                <ReelEmbed key={r.id} id={r.id} poster={r.poster} label={`סרטון פיגמנט שפתיים ${i + 1} מהאינסטגרם של שירן שלום`} />
              ))}
            </Reveal>
          </>
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
      <button type="button" className={styles.floatWa} onClick={onWhatsApp} aria-label="פנייה בוואטסאפ">
        <span className={styles.floatPulse} aria-hidden="true" />
        <LottieIcon loadIcon={loadChatIcon} size="32px" colorize="#ffffff" />
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
