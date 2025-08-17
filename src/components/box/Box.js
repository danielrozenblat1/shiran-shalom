import { useEffect, useRef } from "react";
import styles from "./Box.module.css"
import { Player } from "@lordicon/react";
import ScrollReveal from "scrollreveal";
const Box=(props)=>{
    const handleComplete = () => {
        setTimeout(() => {
          playerRef1?.current?.playFromBeginning();
        }, 2500); // play again after 2.5 seconds
      };
      const playerRef1 = useRef(null);
    useEffect(()=>{
      playerRef1?.current?.playFromBeginning();
    },[])
    useEffect(()=>{
      ScrollReveal().reveal(`.${styles.title}`, {
          duration: 1000,
          distance: "30px",
          origin: "right", // Start from the right side
          easing: "ease-out",
          reset:false,
          viewFactor: 0.2,
          interval: 300, // Delay between each element
          delay: 200, // Delay before the animation starts
          scale: 1, // Set scale to 1 or null
        });
        ScrollReveal().reveal(`.${styles.description}`, {
          duration: 1000,
          distance: "30px",
          origin: "bottom", // Start from the right side
          easing: "ease-out",
          reset:false,
          viewFactor: 0.2,
          interval: 300, // Delay between each element
          delay: 200, // Delay before the animation starts
          scale: 1, // Set scale to 1 or null
        });
      
        ScrollReveal().reveal(`.${styles.icon}`, {
          duration: 1000,
          distance: "30px",
          origin: "left", // Start from the right side
          easing: "ease-out",
          reset:false,
          viewFactor: 0.2,
          interval: 300, // Delay between each element
          delay: 200, // Delay before the animation starts
          scale: 1, // Set scale to 1 or null
        });
    },[])
return <>
<div className={styles.box}>
        <div className={styles.title}>{props.title}</div>
     <div className={styles.icon}><Player icon={props.icon} ref={playerRef1} size="100%" loop={true} onComplete={handleComplete}></Player></div>  
        <div className={styles.description}>{props.description}</div>
    </div>
</>

}
export default Box