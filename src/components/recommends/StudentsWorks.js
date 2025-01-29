import React from 'react';
import styles from './Students.module.css';

// Import your images
import result1 from "../../images/שירן שלום עבודות תלמידות 1.png";
import result2 from "../../images/שירן שלום עבודות תלמידות 2.png";
import result3 from "../../images/שירן שלום עבודות תלמידות 3.png";
import result4 from "../../images/שירן שלום עבודות תלמידות 4.png";
import result5 from "../../images/שירן שלום עבודות תלמידות 5.png";
import result6 from "../../images/שירן שלום עבודות תלמידות 6.png";

import result8 from "../../images/שירן שלום עבודות תלמידות 9.png";
import result10 from "../../images/שירן שלום עבודות תלמידות 10.png";
import Button from '../WAbutton/Button';






const StudentsWorks = () => {
  const images = [
    result8, result2, result3,result10, result4,result5 ,result6
  ];

  return (
    <>
      <div className={styles.explain}>ואלה עבודות של תלמידות שלי ממש בסיום הקורס!</div>

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
<Button text="תלחצי כאן כדי לשמוע ממני"/>
    </>
  );
};

export default StudentsWorks;