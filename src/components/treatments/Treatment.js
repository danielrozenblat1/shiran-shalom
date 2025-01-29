import React from 'react';
import styles from './Treatment.module.css';
import brows from "../../images/הרמת ריסים וגבות.png";
import lips from "../../images/פיגמנט שפתייים.png";
import result1 from "../../images/שירן שלום עבודות 5.png";
import result2 from "../../images/פיגמנט שפתיים תוצאה 1.png";
import result3 from "../../images/שירן שלום עבודות 1.png";
import result4 from "../../images/הרמת ריסים תוצאה 2.png";
import result5 from "../../images/הרמת ריסים תוצאה 1.png";
import result6 from "../../images/שירן שלום עבודות 4.png";
import result7 from "../../images/שירן שלום עבודות תלמידות 4.png";
import result8 from "../../images/שירן שלום עבודות 1.png";
import result9 from "../../images/הדבקת ריסים תמונה ראשית.png";
import Button from '../WAbutton/Button';

const BeautyServices = () => {
  const services = [
    {
      title: "פיגמנט שפתיים",
      description: "טיפול המעניק לשפתיים מראה טבעי ומושלם עם צבע מותאם אישית. התוצאה - שפתיים במראה רענן ומלא חיים, ללא צורך בשימוש יומיומי באודם או תיקונים במהלך היום.",
      benefits: [
        "חיסכון משמעותי בזמן התארגנות בוקר",
        "מראה טבעי ורענן לאורך כל היום",
        "פתרון מושלם לשפתיים חיוורות או כהות",
        "ללא צורך בתיקוני איפור במהלך היום",
        "עמידות של שנתיים"
      ],
      processSteps: [
        {
          title: "פגישת ייעוץ והכנה",
          description: "קיום פגישת תיאום ציפיות מדויקת, בחירת גוון מותאם אישית, ומתן הסבר מקיף על תהליך ההחלמה"
        },
        {
          title: "טיפול ראשון",
          description: "ביצוע טיפול בן 3 שעות הכולל סקיצה מדויקת, בחירת גוון סופית וביצוע הפיגמנט תחת אלחוש מקומי"
        },
        {
          title: "טיפול השלמה",
          description: "ביצוע טיפול משלים כעבור חודש לקבלת התוצאה המושלמת והמדויקת"
        }
      ],

      ideal: "מיועד במיוחד לנשים שחולמות על שפתיים במראה טבעי ומושלם, לאלו שנמאס להן מתיקוני אודם תכופים, ולמי שמחפשת פתרון קבוע לשפתיים חיוורות או כהות",
      precare: "מתן הנחיות מדויקות להכנת השפתיים לקליטה מיטבית של הפיגמנט",
      aftercare: "ליווי צמוד ומתן הנחיות מפורטות לשמירה על התוצאות",
      mainImage: lips,
      results: [result1, result2]
    },
    
    {
      title: "הדבקת ריסים",
      description: "טיפול להארכת והעשרת הריסים באמצעות הדבקת ריסים מלאכותיות איכותיות. התוצאה - מראה מלא ומרשים של הריסים ללא צורך במסקרה יומיומית.",
      benefits: [
        "מראה טבעי ומרשים של ריסים ארוכים ומלאים",
        "חיסכון בזמן התארגנות יומיומית",
        "אין צורך בשימוש במסקרה",
        "התאמה אישית לפי מבנה העין והפנים",
        "עמידות של 3-4 שבועות"
      ],
      processSteps: [
        {
          title: "ייעוץ והתאמה",
          description: "בחירה מקצועית של אורך וסגנון הריסים המתאים ביותר למבנה העין ולמראה המבוקש"
        },
        {
          title: "הכנת העין",
          description: "ביצוע ניקוי יסודי של אזור העיניים והכנת הריסים הטבעיים להדבקה"
        },
        {
          title: "הדבקת הריסים",
          description: "הדבקה מדויקת של הריסים תוך שמירה על נוחות מקסימלית"
        }
      ],
      ageRestriction: "16+",
      ideal: "מתאים במיוחד למי שרוצה מראה טבעי ומרשים של ריסים ארוכים ומלאים, למי שרוצה לחסוך זמן בהתארגנות הבוקר, ולמי שמחפשת פתרון נוח וטבעי למראה עיניים מודגש",
      precare: "המלצה להגעה ללא איפור בעיניים והימנעות משימוש בקרמים שמנוניים באזור העיניים",
      aftercare: "מתן הנחיות מפורטות להימנעות ממגע וחיכוך באזור העיניים ב-24 השעות הראשונות ושמירה על ניקיון העיניים",
      mainImage: result7,
      results: [result5, result4]
    },
    {
      title: "הרמת ריסים וגבות",
      description: "טיפול חדשני המעניק מראה מורם וטבעי לריסים ולגבות. התהליך מחזק ומעצב את הריס והגבה הקיימים ליצירת מראה מסורק של הגבה ורענן של העיניים.",
      benefits: [
        "מראה טבעי ופתוח של העיניים",
        "אפקט מיידי שנשמר לאורך זמן",
        "ללא צורך בשימוש במסקרה",
        "מתאים לכל סוגי הריסים והגבות",
        "עמידות של 6-8 שבועות"
      ],
      processSteps: [
        {
          title: "בדיקת התאמה",
          description: "הערכת מצב הריסים הטבעיים ובחירת השתל המתאים"
        },
        {
          title: "הרמת הריס והגבה",
          description: "ביצוע תהליך עדין של עיצוב והרמת הריס והגבה תוך שימוש בחומרים מקצועיים"
        },
        {
          title: "טיפול מזין",
          description: "החדרת חומרים מזינים לחיזוק ושמירה על בריאות הריס והגבה"
        }
      ],
      ageRestriction: "16+",
      ideal: "מושלם עבור מי שרוצה מראה טבעי ומורם של הריס והגבה, למי שיש ריסים ישרים או נוטים כלפי מטה, ולמי שמחפשת פתרון קבוע יותר ממסקרה וג'ל לגבות",
      precare: "המלצה להגעה ללא איפור בעיניים והימנעות מטיפולים כימיים בריסים בשבועיים שלפני הטיפול",
      aftercare: "הנחיה להימנעות מהרטבת הריסים ב-24 שעות הראשונות ומתן המלצות לשימוש בסרום מזין לריסים",
      mainImage: brows,
      results: [result9]
    },
    
  ];

  return (
    <div className={styles.container}>
      <div className={styles.servicesGrid}>
        {services.map((service, index) => (
          <div key={index} className={styles.serviceCard}>
            <div className={styles.titleContainer}>
              <h2 className={styles.serviceTitle}>
                {service.title}
             
              </h2>
            </div>
            
            <div className={styles.mainImageContainer}>
              <img 
                src={service.mainImage}
                alt={`תמונת ${service.title}`}
                className={styles.mainImage}
              />
              <div className={styles.imageOverlay}></div>
            </div>
            
            <div className={styles.contentSection}>
              <p className={styles.serviceDescription}>{service.description}</p>
            </div>

            <div className={styles.benefitsSection}>
              <h3 className={styles.sectionTitle}>יתרונות הטיפול</h3>
              <ul className={styles.benefitsList}>
                {service.benefits.map((benefit, idx) => (
                  <li key={idx} className={styles.benefitItem}>{benefit}</li>
                ))}
              </ul>
            </div>

            <div className={styles.processSection}>
              <h3 className={styles.sectionTitle}>תהליך הטיפול</h3>
              <div className={styles.processList}>
                {service.processSteps.map((step, idx) => (
                  <div key={idx} className={styles.processStep}>
                    <h4 className={styles.stepTitle}>{step.title}</h4>
                    <p className={styles.stepDescription}>{step.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.decorativeLine}></div>
            
            <div className={styles.idealSection}>
              <h3 className={styles.sectionTitle}>למי מתאים?</h3>
              <p className={styles.serviceDescription}>{service.ideal}</p>
            </div>
            
            <div className={styles.gallerySection}>
              <h3 className={styles.sectionTitle}>תוצאות</h3>
              <div className={styles.resultImages}>
                {service.results.map((resultImg, idx) => (
                  <div key={idx} className={styles.resultImageContainer}>
                    <img 
                      src={resultImg}
                      alt={`תוצאה ${idx + 1} ${service.title}`}
                      className={styles.resultImage}
                    />
                    <div className={styles.imageOverlay}></div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.ctaSection}>
              <Button 
                text="אני רוצה לתאם טיפול"
                message={`היי שירן הגעתי מהדף, אני רוצה לשמוע עוד לגבי ${service.title}`}
                className={styles.ctaButton}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BeautyServices;