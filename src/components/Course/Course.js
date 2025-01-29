import React from 'react';
import styles from './Course.module.css';
import kit from "../../images/שירן שלום ערכה.png"
import { 
  Clock, 
  GraduationCap, 
  BookOpen, 
  Shield, 
 
  Eye, 
  Cat,
  Heart,
  Volume2,
  Star,
  Users,
  Book,
  Award,
  MessageCircle,
  BadgeCheck,
  MessageSquare
} from 'lucide-react';
import Button from '../WAbutton/Button';

const Syllabus = () => {
  return <>
    <div className={styles.container}>
      <h1 className={styles.title}>קורס מקצועי להדבקת ריסים</h1>
      
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>מה מיוחד בקורס שלנו?</h2>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <Clock className={styles.icon} />
            עבודה בזמנים נוחים וקצרים!
          </li>
          <li className={styles.listItem}>
            <GraduationCap className={styles.icon} />
            מתאים גם למי שמגיעה ללא רקע וללא ניסיון כלל!
          </li>
          <li className={styles.listItem}>
            <BookOpen className={styles.icon} />
            לימוד שיטת ההדבקה ודגשים נכונים על צפיפות ושלבי עבודה
          </li>
          <li className={styles.listItem}>
            <Shield className={styles.icon} />
            שיטות מיוחדות לעמידות מרבית של הסט
          </li>
          <li className={styles.listItem}>
            <Eye className={styles.icon} />
            סוגי דבקים והשימוש בהם
          </li>
          <li className={styles.listItem}>
            <Eye className={styles.icon} />
            מבנה העין, מחלות עיניים ואלרגיות
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>סגנונות הדבקה</h2>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <Cat className={styles.icon} />
            חתולי
          </li>
          <li className={styles.listItem}>
            <Heart className={styles.icon} />
            בובתי
          </li>
          <li className={styles.listItem}>
            <Volume2 className={styles.icon} />
            ווליום
          </li>
          <li className={styles.listItem}>
            <Star className={styles.icon} />
            קלאסי
          </li>
        </ul>
      </section>

      <div className={styles.highlight}>
        <h2 className={styles.sectionTitle}>התנסות מעשית</h2>
        <p>
          <Users className={styles.icon} />
          לאחר החלק העיוני נתרגל על שתי מודליסטיות שני סוגי סגנונות הדבקה שונים, 
          בנוסף תקבלי כלים וטיפים מקצועיים להפוך אותך למאסטרית
        </p>
      </div>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>מה את מקבלת?</h2>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <Book className={styles.icon} />
            ערכת קורס מפוארת ומלאה לעבודה מיידית
          </li>
          <li className={styles.listItem}>
            <BookOpen className={styles.icon} />
            חוברת מפורטת עם כל המידע הדרוש לך
          </li>
          <li className={styles.listItem}>
            <Award className={styles.icon} />
            תעודת הסמכה
          </li>
          <li className={styles.listItem}>
            <MessageCircle className={styles.icon} />
            ליווי אישי וייעוץ לאחר הקורס
          </li>
          <li className={styles.listItem}>
            <BadgeCheck className={styles.icon} />
            שיווק נכון ופרסום
          </li>
          <li className={styles.listItem}>
            <MessageSquare className={styles.icon} />
            קבוצת ווטסאפ עם הנבחרת שלי לייעוץ, שיתוף וטיפים
          </li>
        </ul>
      </section>

   

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>ערכת הקורס כוללת</h2>
        <div className={styles.kitList}>
          <div className={styles.kitItem}>מזוודה</div>
          <div className={styles.kitItem}>10 קופסאות ריסי משי</div>
          <div className={styles.kitItem}>דבק לבן</div>
          <div className={styles.kitItem}>דבק שחור</div>
          <div className={styles.kitItem}>בונדר</div>
          <div className={styles.kitItem}>רימובר</div>
          <div className={styles.kitItem}>חבילת אפליקטורים</div>
          <div className={styles.kitItem}>חבילת מיקרובראש</div>
          <div className={styles.kitItem}>חבילת מסרקים לריסים</div>
          <div className={styles.kitItem}>מאוורר</div>
          <div className={styles.kitItem}>מראת יד</div>
          <div className={styles.kitItem}>קצף לניקוי הריסים</div>
          <div className={styles.kitItem}>פינצטה</div>
          <div className={styles.kitItem}>שפריצר מים לניקוי הריסים</div>
        </div>
        <div className={styles.kitImageContainer}>
        <img 
          src={kit}
          alt="ערכת הקורס"
          className={styles.kitImage}
        />
      </div>
      </section>
  
 
    </div>

  </>
};

export default Syllabus;