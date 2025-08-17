import React, { useEffect } from 'react';
import ScrollReveal from "scrollreveal";
import styles from './Can.module.css';

const IconTextComponent = ({ text, imageSrc }) => {
    useEffect(() => {
        ScrollReveal().reveal(`.${styles.text}`, {
            duration: 1000,
            distance: "100px",
            origin: "left",
            easing: "ease-out",
            reset: false,
            viewFactor: 0.2,
            interval: 300,
            delay: 200,
            scale: 1,
        });
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.imageWrapper}>
                <img 
                    src={imageSrc} 
                    alt="" 
                    className={styles.image}
                />
            </div>
            <p className={styles.text}>{text}</p>
        </div>
    );
};

export default IconTextComponent;