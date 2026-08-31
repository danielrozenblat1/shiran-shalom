import React from 'react';
import styles from './Recommends.module.css';

// Import your images
import result1 from "../../images/שירן שלום תלמידה 1.webp";
import result2 from "../../images/שירן שלום תלמידה 2.webp";
import result3 from "../../images/שירן שלום תלמידה 3.webp";
import result4 from "../../images/שירן שלום תלמידה 4.webp";
import result5 from "../../images/שירן שלום תלמידה 5.webp";
import result6 from "../../images/שירן שלום תלמידה 6.webp";
import result7 from "../../images/שירן שלום תלמידה 7.webp";





const Recommends = () => {
  const images = [
    result1, result2, result3, result4,result5,result6,result7
  ];

  return (
    <>
      <h2 className={styles.title}>הוצאתי עשרות נשים עם מקצוע ביד</h2>

      <div className={styles.container}>
        <div className={styles.scrollTrack}>
          {/* First group of images */}
          <div className={styles.scrollContainer}>
            {images.map((img, index) => (
              <div key={`first-${index}`} className={styles.imageWrapper}>
                <img loading="lazy" decoding="async"
                  src={img}
                  className={styles.image}
                  alt={`תלמידה של שירן שלום עם מקצוע ביד בסיום קורס הדבקת ריסים ${index + 1}`}
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
                  alt={`תלמידה של שירן שלום עם מקצוע ביד בסיום קורס הדבקת ריסים ${index + 1}`}
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

export default Recommends;