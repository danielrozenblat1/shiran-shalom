import React from 'react';
import Bonus from "../components/Bonus/Bonus";
import styles from "./ForthScreen.module.css";
import keep from "../Icons/wired-outline-1581-mascara-eyelash-hover-pinch.json";
import book from "../Icons/wired-outline-779-books-hover-hit.json"
import handshake from "../Icons/wired-outline-645-people-handshake-transaction-hover-pinch (2).json" 
import brain from "../Icons/wired-outline-426-brain-hover-pinch (1).json"
import love from "../Icons/wired-outline-20-love-heart-morph-two-hearts.json"
import Button from '../components/WAbutton/Button';
const ForthScreen = () => {
  return (
    <>
      <div className={styles.title}>חשוב לי להדגיש</div>
      <div className={styles.description}>בכל קורס וקורס אני שמה דגש על</div>
      <div className={styles.row}>
        <Bonus 
          title="ליווי צמוד" 
          description="אני כאן גם לאחר הקורס, זמינה לכל שאלה, התייעצות או חשש שעולה.  את לא לבד בדרך להגשמת החלום!" 
          icon={handshake}
        />
        <Bonus 
          title="ידע פרקטי" 
          description="את תקבלי ממני את כל הכלים להצלחה - משיווק ועד לטכניקות המתקדמות ביותר בתחום." 
          icon={brain}
        />
        <Bonus 
          title="חומרים איכותיים" 
          description="אנחנו נעבוד עם ליין מוצרים ייחודי וחומרים איכותיים במיוחד שיבטיחו תוצאות מושלמות ומראה טבעי." 
          icon={keep}
        />
        <Bonus 
          title="יחס אישי" 
          description="הקורס מועבר בצורה פרטנית - אחת על אחת, באווירה נעימה וחמה. מה שמאפשר לי להתאים את הלימוד בדיוק לקצב שלך ולצרכים שלך" 
          icon={love}
        />
        <Bonus 
          title="חוברת הדרכה מקיפה" 
          description="את תקבלי חוברת עבודה מפורטת שתלווה אותך גם אחרי הקורס כדי שהידע יישאר איתך, החוברת כוללת את כל הטכניקות, השיטות והטיפים שילוו אותך להצלחה" 
          icon={book}
        />
      </div>
      <Button text="שירן בואי נדבר!"/>
    </>
  );
};

export default ForthScreen;