import React, { useState, useEffect } from 'react';
import styles from './FirstScreen.module.css';
import middleImage from "../images/שירן שלום תמונה מרכזית.webp";
import rightImage from "../images/שירן שלום תמונה ימין.webp"
import leftImage from "../images/שירן שלום תמונה שמאל.webp"
import Loader from '../components/Loader/Loader';
import PinkScrollButton from '../components/button/Button';

// Module-scope so the identity stays stable across renders.
const loadLashesIcon = () => import("../Icons/wired-outline-1575-eyelash-hover-pinch.json");
const loadLearnIcon = () => import("../Icons/wired-outline-112-book-morph-open (1).json");
// import GradientLoader from '../components/loader/Loader';

const FirstScreen = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const imageUrls = [
      middleImage,
      rightImage,
      leftImage
    ];

    const loadImage = (url) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = url;
      });
    };

    Promise.all(imageUrls.map(loadImage))
      .then(() => setImagesLoaded(true))
      .catch((err) => console.error("Failed to load images", err));
  }, []);

  if (!imagesLoaded) {
    return <Loader/>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <div className={`${styles.backgroundImage} ${styles.leftImage}`}></div>
        <div className={`${styles.backgroundImage} ${styles.centerImage}`}></div>
        <div className={`${styles.backgroundImage} ${styles.rightImage}`}></div>
      </div>
      
      <div className={styles.contentBox}>
        <h1 className={styles.title}>SHIRAN SHALOM</h1>
        <div className={styles.buttonContainer}>
        <PinkScrollButton text="אני רוצה ללמוד הדבקת ריסים" loadIcon={loadLearnIcon} to="קורס"/>
        <PinkScrollButton text="אני רוצה לשמוע על הטיפולים" loadIcon={loadLashesIcon} to="טיפולים"/>
  
        </div>
   
      </div>
  
    </div>
  );
};

export default FirstScreen;