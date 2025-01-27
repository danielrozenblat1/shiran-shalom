import React from 'react';
import styles from "./FifthScreen.module.css";
import FAQItem from '../components/questions/Questions';

const FifthScreen = () => {
  const faqs = [
    {
      question: "האם הדבקת ריסים פוגעת בריסים הטבעיים שלי?",
      answer: "זהו מיתוס נפוץ! כאשר ההדבקה מתבצעת על ידי מקצוענית מוסמכת, תוך שימוש בחומרים איכותיים ובטכניקה נכונה, הריסים הטבעיים שלך נשארים בריאים ושלמים. אנו משתמשים בשיטה מיוחדת הדומה להלחמה, עם ריסים וחומרים ייחודיים שנבחרו בקפידה."
    },
    {
      question: "יש המון מתחרים בשוק, איך אני יכולה להצליח?",
      answer: "נכון שיש הרבה מתחרים, אבל הביקוש גדול באותה מידה! אנחנו מלמדים שיטה ייחודית שמבדלת אותך בשוק. בנוסף, את מקבלת ליווי צמוד גם אחרי הקורס, כולל אפשרות להתלמדות מעשית איתי. ברגע שלקוחה מרוצה, היא תחזור ותביא איתה עוד 5 לקוחות."
    },
    {
      question: "האם הפיגמנט בשפתיים כואב?",
      answer: "הטיפול מתבצע תחת אלחוש מקומי ובצורה עדינה ונינוחה. אנחנו בוחרים את הגוון ביחד, והכל נעשה בשיתוף פעולה מלא ותוך התחשבות מלאה בנוחות שלך. התהליך כולל הכנה מקדימה והנחיות מפורטות לפני ואחרי הטיפול למקסום התוצאות."
    },
    {
      question: "אני מפחדת להתחיל מקצוע חדש, התנסיתי בעבר ולא הצלחתי...",
      answer: "אין דבר כזה חוסר הצלחה - יש רק חוסר רצון וחוסר משמעת עצמית. את מקבלת את כל הכלים והידע הנדרשים להצלחה, כולל חוברת עבודה מפורטת וליווי צמוד. אני נשארת איתך לאורך כל הדרך עד להצלחה מלאה. התלמידות שלנו שמתייחסות לתחום כמקצוע לכל דבר - מצליחות!"
    },
    {
      question: "כמה זמן לוקח להתחיל להרוויח?",
      answer: "ההשקעה בתחום היא מינימלית, ואת יכולה להתחיל לעבוד כבר במהלך הקורס! את לא חייבת להתפטר מהעבודה הנוכחית שלך כדי להתחיל. הקורס בנוי משני מפגשים אינטנסיביים שכוללים חלק עיוני ומעשי, ואחריהם את מוכנה לצאת לדרך. ברגע שתתחילי לעבוד ותספקי שירות מעולה, הלקוחות יגיעו בזכות המלצות."
    },
    {
      question: "האם מרחק הוא בעיה? אני גרה רחוק",
      answer: "המרחק לא צריך להיות מכשול! יש לנו תלמידות שמגיעות מכל הארץ, כולל תלמידה שהגיעה מטבריה וישנה במרכז כדי לעבור את הקורס. ההשקעה משתלמת כי את מקבלת הכשרה מקיפה ומקצועית שתלווה אותך להצלחה בתחום."
    }
  ];

  return (
    <>
      <div className={styles.title}>אתן שואלות ואני עונה</div>
      <div className={styles.description}>
        אם הגעת לכאן כנראה שאת באמת רצינית לגבי התחום! קיבצתי לך שאלות שחוזרות על עצמן מבנות שמעוניינות בתחום ורוצות לדעת כמה פרטים לפני שאנחנו מדברות
      </div>
      {faqs.map((faq, index) => (
        <FAQItem 
          key={index}
          question={faq.question}
          answer={faq.answer}
        />
      ))}
    </>
  );
};

export default FifthScreen;