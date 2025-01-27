import React from 'react';
import styles from "./ThirdScreen.module.css";
import TreatmentCard from '../components/treatments/Treatment';
import shiran from "../images/שירן שלום תמונה ימין.png"
import BeautyServices from '../components/treatments/Treatment';
const ThirdScreen = () => {
  const treatments = [
    {
      title: "פיגמנט שפתיים",
      description: "הפסיקי להתאפר כל בוקר מחדש והיפטרי מהצורך בתיקון אודם לאורך היום",
      details: [
        {
          title: "תהליך הטיפול",
          content: "טיפול מקצועי הכולל תיאום ציפיות, בחירת גוון בשיתוף פעולה הדדי, ושימוש במאלחשים לטיפול נוח ונעים"
        },
        {
          title: "משך הטיפול",
          content: "שני מפגשים של כשלוש שעות כל אחד. במפגש הראשון נבצע סקיצה ותיאום ציפיות, ובמפגש השני את הטיפול עצמו"
        },
        {
          title: "יתרונות",
          content: "חיסכון בזמן יקר בהתארגנות, מראה טבעי ויציב לאורך זמן, פתרון לכהויות בשפתיים ושפתיים חיוורות"
        }
      ],
      leftImage: shiran,
      centerImage: shiran,
      rightImage: shiran
    },
    {
      title: "עיצוב ושיקום גבות",
      description: "עיצוב מקצועי המותאם למבנה הפנים שלך",
      details: [
        {
          title: "תהליך הטיפול",
          content: "תהליך מקצועי הכולל עיצוב, מריטה והגדרת צורה מדויקת המותאמת למבנה הפנים שלך"
        },
        {
          title: "יתרונות",
          content: "מראה טבעי ומוקפד, חיסכון בזמן בהתארגנות היומיומית, מסגרת פנים מושלמת"
        }
      ],
      leftImage:shiran,
      centerImage:shiran,
      rightImage:shiran
    },
    {
      title: "הדבקת ריסים",
      description: "ריסים טבעיים ועמידים בשיטה ייחודית",
      details: [
        {
          title: "שיטת העבודה",
          content: "שיטה מיוחדת הדומה להלחמה, שימוש בריסים וחומרים איכותיים במיוחד"
        },
        {
          title: "משך הטיפול והעמידות",
          content: "שבועיים וחצי עד שלושה שבועות של מראה מושלם"
        },
        {
          title: "מיתוסים",
          content: "בניגוד למה שחושבים, הדבקת ריסים מקצועית אינה תולשת את הריסים הטבעיים"
        }
      ],
      leftImage:shiran,
      centerImage:shiran,
      rightImage:shiran
    },
    {
      title: "הרמת ריסים",
      description: "פתרון מושלם לריסים קצרים ובהירים",
      details: [
        {
          title: "התאמה אישית",
          content: "טיפול המותאם במיוחד לריסים שלך, מעניק מראה טבעי ופתוח לעיניים"
        },
        {
          title: "יתרונות",
          content: "מראה טבעי, ללא צורך במסקרה, פתרון מושלם לריסים ישרים או בהירים"
        }
      ],
      leftImage:shiran,
      centerImage:shiran,
      rightImage:shiran
    }
  ];

  return <>
    <div className={styles.container}>
      <h2 className={styles.title} id="טיפולים">הטיפולים שלי</h2>
      <BeautyServices/>
      </div>
      </>
};

export default ThirdScreen;