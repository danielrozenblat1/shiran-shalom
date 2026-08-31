import React from 'react';
import styles from './Students.module.css';

// Import your images
import result1 from "../../images/שירן שלום עבודות 1.webp";
import result3 from "../../images/שירן שלום עבודות 3.webp";
import result4 from "../../images/שירן שלום עבודות 4.webp";
import result5 from "../../images/שירן שלום עבודות 8.webp";
import result6 from "../../images/שירן שלום עבודות 9.webp";





const Students = () => {
  const images = [
    result1,result6,  result3, result4,result5
  ];

  return (
    <>
      <h3 className={styles.explain}>דוגמא קטנה.. הנה חלק ממקבץ העבודות שלי</h3>

      <div className={styles.container}>
        <div className={styles.scrollTrack}>
          {/* First group of images */}
          <div className={styles.scrollContainer}>
            {images.map((img, index) => (
              <div key={`first-${index}`} className={styles.imageWrapper}>
                <img loading="lazy" decoding="async"
                  src={img}
                  className={styles.image}
                  alt={`עבודת הדבקת ריסים מקצועית של שירן שלום - דוגמה ${index + 1}`}
                  itemProp="image"
                />
              </div>
            ))}
          </div>
          {/* Second identical group of images */}
          <div className={styles.scrollContainer}>
            {images.map((img, index) => (
              <div key={`second-${index}`} className={styles.imageWrapper}>
                <img loading="lazy" decoding="async"
                  src={img}
                  className={styles.image}
                  alt={`עבודת הדבקת ריסים מקצועית של שירן שלום - דוגמה ${index + 1}`}
                  itemProp="image"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

    </>
  );
};

export default Students;