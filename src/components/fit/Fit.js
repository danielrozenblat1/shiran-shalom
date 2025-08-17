import Button from '../WAbutton/Button';
import styles from './Fit.module.css';

export default function CourseSuitability() {
  const suitable = [
    'מי שיש לה תשוקה לתחום הביוטי ובעיקר להדבקת ריסים',
    'מי שרעבה להצלחה ורוצה לשלוט על החיים שלה',
    'מי שיודעת שהתהליך ידרוש ממנה זמן ומאמץ'
  ];

  const notSuitable = [
    'מי שמחפשת התעשרות מהירה',
    'מי שמוותרת בקלות כשהדברים לא הולכים בדרך שלה',
    'מי שבאה ללמוד את התחום רק בגלל הכסף',
    'מי שיודעת שהיא לא עומדת לתרגל ולהקדיש זמן לבניית העסק'
  ];

  return <>
  <div className={styles.header}>הקורס לא מתאים לכל אחת!</div>
    <div className={styles.row}>
      <div className={styles.suitabilityContainer}>
        <h2 className={styles.title}>הקורס מתאים ל:</h2>
        <ul className={styles.list}>
          {suitable.map((item, index) => (
            <li key={index} className={styles.listItem}>
              <div className={`${styles.circle} ${styles.checkmark}`}></div>
              <span className={styles.text}>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.suitabilityContainer}>
        <h2 className={styles.title}>הקורס לא מתאים ל:</h2>
        <ul className={styles.list}>
          {notSuitable.map((item, index) => (
            <li key={index} className={styles.listItem}>
              <div className={`${styles.circle} ${styles.crossmark}`}></div>
              <span className={styles.text}>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
    <Button text="שירן אני מתאימה, בואי נדבר!"/>
  </>
}