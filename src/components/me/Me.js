import React from 'react';
import styles from './Me.module.css';
// Note: You'll need to update the image import path to match your project structure
import shiranImage from "../../images/שירן שלום תדמיתית.webp";
import Recommends from '../recommends/Recommends';

const AboutMe = () => {
  
  return (
    <>
      <h2 className={styles.header} id="מי אני">בואי נכיר</h2>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <img loading="lazy" decoding="async" src={shiranImage} alt="שירן שלום, מייסדת האקדמיה ומומחית להדבקת ריסים ואיפור קבוע" className={styles.image} />
        </div>
        <div className={styles.content}>
          <h3 className={styles.title}>שירן שלום</h3>
          <div className={styles.subtitle}>"אני מאמינה שכל אישה יכולה להרגיש ולהיראות במיטבה בכל רגע"</div>
          <p className={styles.description}>
            בשנים האחרונות ליוויתי מאות נשים במסע שלהן לביטחון עצמי והגשמה מקצועית בעולם היופי. האקדמיה שלי מתמחה בהדבקת ריסים, פיגמנט שפתיים ועיצוב גבות, כשהמטרה היא לתת לך את כל הכלים להצלחה.
          </p>
          <p className={styles.description}>
            אני יודעת כמה חשוב להרגיש ביטחון במראה שלך וגם בדרך המקצועית שלך. לכן אני מלווה כל תלמידה באופן אישי, עם דגש על הכשרה מקצועית ברמה הגבוהה ביותר, שימוש בחומרים איכותיים, וליווי צמוד גם אחרי סיום הקורס. אני כאן כדי לתת לך את כל הכלים והביטחון להצליח בעולם היופי, ולהפוך את החלום שלך למציאות.
          </p>
        </div>
      </div>
      <Recommends/>

    </>
  );
};

export default AboutMe;