import IconTextComponent from "../components/Can/Can"
import styles from "./SecondScreen.module.css"
import shiran from "../images/שירן שלום הכנסות.png"
import learn from "../images/שירן שלום מקצוע.png"
import time from "../images/שירן שלום זמן.png"
import NewBox from "../components/newBox/NewBox"
import keep from "../Icons/wired-outline-456-handshake-deal-hover-pinch (1).json"
import doing from "../Icons/wired-outline-1581-mascara-eyelash-hover-pinch.json"
import always from "../Icons/wired-outline-1575-eyelash-hover-pinch (1).json"
import AboutMe from "../components/me/Me"
import Students from "../components/recommends/Students"
import recomend from "../images/שירן שלום המלצות.png"
import Button from "../components/WAbutton/Button"
import { ChevronDown } from "lucide-react"
import StudentsWorks from "../components/recommends/StudentsWorks"
import VideoGallery from "../components/studioVideos/StudioVideos"
import video1 from "../videos/שירן שלום סרטון המלצה 1.mp4"
import video2 from "../videos/שירן שלום סרטון המלצה 2.mp4"
const SecondScreen=()=>{
  const videos=[
    {src:video1,alt:"שירן שלום סרטון המלצה"}, {src:video2,alt:"שירן שלום סרטון המלצה 2"}
  ]

    return <>
    <div className={styles.title} id="קורס">לא הגעת לכאן בטעות</div>
    <div className={styles.description}>אם את כאן זה אומר ששמעת כבר על תחום הביוטי ועל כל היתרונות שהוא מביא איתו</div>
<div className={styles.row}>
<IconTextComponent text="להתפרנס מהתחום שאת הכי אוהבת בכל יום מחדש" imageSrc={shiran}/>
    <IconTextComponent text="להכניס עשרות אלפי שקלים כל חודש" imageSrc={time}/>
    <IconTextComponent text="לשלוט בזמן שלך ולעבוד בזמנים שלך" imageSrc={learn}/>

</div>
<div className={styles.descriptionSpecial}>אני יכולה להגיד לך בפה מלא</div>
<div className={styles.title}>שזה אפשרי</div>
<div className={styles.description}>אבל חשוב לי שתביני! הצלחה לא מגיעה ברגע ואת לא עומדת לנהל עסק משגשג בתחום בתוך שבוע</div>
<div className={styles.title}>הצלחה בתחום תדרוש ממך</div>
<div className={styles.row}>
<NewBox
        title="מחוייבות"
        description="את מקימה כאן עסק לכל דבר ועניין. זה אומר ניהול זמן, שיווק, תמחור ושירות לקוחות. ההצלחה שלך תלויה במחויבות שלך לכל ההיבטים העסקיים, לא רק למקצועיים."
        icon={keep}
      />
      <NewBox
        title="יישום ותרגול"
        description="כדי להישאר בשיא המקצועיות ולשמור על רלוונטיות בשוק המתפתח, חשוב להתעדכן ולתרגל באופן קבוע. הטכניקות משתכללות והטרנדים משתנים - התרגול המתמיד הוא המפתח להצלחה."
        icon={doing}
      />
      <NewBox
        title="התמדה ורצינות"
        description="לא תמיד הדברים ילכו בדיוק כמו שתכננת. יהיו אתגרים, תקופות פחות טובות ושינויים בשוק. ההתמדה והנחישות שלך הן אלו שיעזרו לך לצלוח את האתגרים ולבנות עסק יציב ומצליח."
        icon={always}
      />
</div>
<div className={styles.description}>וברגע שתיישמי את כל השלושה</div>
<div className={styles.title}>תגיעי לתוצאות</div>

<Students/>
<StudentsWorks/>

<AboutMe/>
<div className={styles.title}>שבסוף התהליך דיברו ככה:</div>
<div className={styles.center}><img className={styles.image} src={recomend} alt="שירן שלום המלצות"/></div>
<VideoGallery videos={videos}/>
<Button text="שמעתי מספיק, בואי נדבר"/>
<div className={styles.title}>בואי נדבר תכלס על מה שאת הולכת לעבור אצלי</div>
<div className={styles.arrowContainer}>
        <ChevronDown className={styles.bounceArrow} size={40} strokeWidth={1} />
      </div>

    </>
}
export default SecondScreen