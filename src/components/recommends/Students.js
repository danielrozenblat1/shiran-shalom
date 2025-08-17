import React from 'react';
import styles from './Students.module.css';

// Import your images
import result1 from "../../images/שירן שלום עבודות 1.png";
import result2 from "../../images/שירן שלום עבודות 2.png";
import result3 from "../../images/שירן שלום עבודות 3.png";
import result4 from "../../images/שירן שלום עבודות 4.png";
import result5 from "../../images/שירן שלום עבודות 8.png";
import result6 from "../../images/שירן שלום עבודות 9.png";





const Students = () => {
  const images = [
    result1,result6,  result3, result4,result5
  ];

  return (
    <>
      <div className={styles.explain}>דוגמא קטנה.. הנה חלק ממקבץ העבודות שלי</div>

      <div className={styles.container}>
        <div className={styles.scrollTrack}>
          {/* First group of images */}
          <div className={styles.scrollContainer}>
            {images.map((img, index) => (
              <div key={`first-${index}`} className={styles.imageWrapper}>
                <img
                  src={img}
                  className={styles.image}
                  alt={`שירן שלום עבודה מספר ${index + 1}`}
                  itemProp="image"
                />
              </div>
            ))}
          </div>
          {/* Second identical group of images */}
          <div className={styles.scrollContainer}>
            {images.map((img, index) => (
              <div key={`second-${index}`} className={styles.imageWrapper}>
                <img
                  src={img}
                  className={styles.image}
                  alt={`שירן שלום עבודה מספר ${index + 1}`}
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