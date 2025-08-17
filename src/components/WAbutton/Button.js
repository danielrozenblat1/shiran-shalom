import styles from "./Button.module.css"
const Button =(props)=>{

    const handleButtonClick = () => {
        const phoneNumber = "+972509365362";
        // Set the message content
        const message =props.message ? props.message :"היי שירן הגעתי מהדף ,אני רוצה לשמוע ממך עוד על..";
    
        // Encode the message for the URL
        const encodedMessage = encodeURIComponent(message);
        // Construct the WhatsApp message URL with phone number and message
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
      
        // Open the URL in a new tab
        window.open(whatsappURL, "_blank");
    
      };
    return <>
    <div className={styles.center}>
    <button className={styles.button} onClick={handleButtonClick}>{props.text}</button></div></>
}
export default Button