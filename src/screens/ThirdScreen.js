import React from 'react';
import styles from "./ThirdScreen.module.css";
import BeautyServices from '../components/treatments/Treatment';

const ThirdScreen = () => {
  return <>
    <div className={styles.container}>
      <h2 className={styles.title} id="טיפולים">הטיפולים שלי</h2>
      <BeautyServices/>
      </div>
      </>
};

export default ThirdScreen;
