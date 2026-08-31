import React from 'react';
import { Link as ScrollLink } from 'react-scroll';
import LottieIcon from '../lottie/LottieIcon';
import styles from './Button.module.css';

const PinkScrollButton = ({ text, loadIcon, to }) => {
    return (
      <ScrollLink to={to} smooth={true} duration={1500} className={styles.button}>
        <div className={styles.rightIcon}>
          <LottieIcon loadIcon={loadIcon} />
        </div>
        <span className={styles.text}>{text}</span>

      </ScrollLink>
    );
};

export default PinkScrollButton;
