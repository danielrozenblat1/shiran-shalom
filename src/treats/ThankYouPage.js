import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './fonts.css';
import styles from './ThankYouPage.module.css';
import LottieIcon from '../components/lottie/LottieIcon';
import { openWhatsApp } from './leadApi';
import { redeemLeadTicket } from './pixel';
import logo from '../images/שירן שלום לוגו.webp';

const iconHeart = () => import('../Icons/form-heart.json');
const loadChatIcon = () => import('../Icons/float-chat.json');

// /thanks - the only place the Meta "Lead" event fires, and only once per lead.
const ThankYouPage = () => {
  const location = useLocation();
  const redeemed = useRef(false);

  useEffect(() => {
    const prevTitle = document.title;
    document.title = 'תודה! | שירן שלום';
    window.scrollTo(0, 0);
    // Keep the thank-you page out of search results without leaving two robots tags.
    const robots = document.querySelector('meta[name="robots"]');
    const prevRobots = robots ? robots.content : null;
    if (robots) robots.content = 'noindex, nofollow';
    return () => {
      document.title = prevTitle;
      if (robots && prevRobots !== null) robots.content = prevRobots;
    };
  }, []);

  useEffect(() => {
    if (redeemed.current) return; // React StrictMode double-invokes effects in dev
    redeemed.current = true;
    redeemLeadTicket(location.state && location.state.leadId);
  }, [location.state]);

  return (
    <main className={styles.page} dir="rtl">
      <img src={logo} alt="שירן שלום" className={styles.logo} width="586" height="285" />
      <div className={styles.card}>
        <div className={styles.mark}>
          <LottieIcon loadIcon={iconHeart} size="48px" colorize="#ffffff" once />
        </div>
        <h1 className={styles.title}>קיבלתי, תודה!</h1>
        <p className={styles.text}>הפרטים הגיעו אליי. אחזור אלייך בהקדם לשיחה קצרה ונתאם את הטיפול</p>
        <p className={styles.sub}>רוצה לדבר כבר עכשיו?</p>
        <button type="button" className={styles.wa} onClick={openWhatsApp}>
          <LottieIcon loadIcon={loadChatIcon} size="26px" colorize="#ffffff" once />
          שירן בוואטסאפ
        </button>
        <Link to="/treats" className={styles.back}>
          חזרה לדף
        </Link>
      </div>
    </main>
  );
};

export default ThankYouPage;
