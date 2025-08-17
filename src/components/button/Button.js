import React, { useRef, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Player } from "@lordicon/react";
import styles from './Button.module.css';

const PinkScrollButton = ({ text, icon, to }) => {
    const playerRef1 = useRef(null);
    const playerRef2 = useRef(null);

    useEffect(() => {
      playerRef1?.current?.playFromBeginning();
      playerRef2?.current?.playFromBeginning();
    }, []);
  
    const handleComplete = (ref) => {
      setTimeout(() => {
        ref?.current?.playFromBeginning();
      }, 1000);
    };

    return (
      <ScrollLink to={to} smooth={true} duration={1500} className={styles.button}>
        <div className={styles.rightIcon}>
          <Player 
            icon={icon} 
            size="100%" 
            onComplete={() => handleComplete(playerRef2)} 
            ref={playerRef2} 
            offset={-100}
          />
        </div>
        <span className={styles.text}>{text}</span>

      </ScrollLink>
    );
};

export default PinkScrollButton;