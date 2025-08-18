
import styles from "./StyleSheets/HostCard.module.css";
import calendarIcon from "../features/withoutauth/assets/Calandarlogo.svg"
import locationIcon from "../features/withoutauth/assets/LocationLogo.svg";
import gameImage from "../features/withoutauth/assets/gameImage.png";



const TYPE_LIST = [
  { value: 1, label: "Regular" },
  { value: 2, label: "Coaching" },
  { value: 3, label: "Tournament" },
  // add more types as needed
];

const SKILL_MAP = {
  
  0: { label: "Novice", color: "#18429F" },
  1: { label: "Learner", color: "#0FA903" },
  2: { label: "Skilled", color: "#FFA200" },
  3: { label: "Expert", color: "#E65B00" },
  4: { label: "Elite", color: "#4C2DFF" },
  // Add more if needed
};





export const HostCard = ({ host }) => {

  const typeObj = TYPE_LIST.find(t => t.value === host?.type);
  return (
    <div className={styles.card}>
      <span className={styles.type}>{typeObj ? typeObj.label : "Regular"}</span>
      <div className={styles.avatarRow}>
        {host?.attendeesAvatars?.map((src, i) => (
          <img key={i} src={src.profile_image} alt="avatar" className={styles.avatar} onError={e => { e.target.onerror = null; e.target.src = gameImage; }} />
        ))}
        <span className={styles.dot} aria-hidden="true"></span>
        <span className={styles.going}>{host?.attendees} Going</span>
      </div>
      <div className={styles.hostBy}>Host By: <span className={styles.host}>{host?.host}</span></div>
      <div className={styles.detailRow}>
        <img src={calendarIcon} alt="Calendar" className={styles.icon} />
        <span className={styles.detailText}>{host?.date}</span>
      </div>
      <div className={styles.detailRow}>
        <img src={locationIcon} alt="Location" className={styles.icon} />
        <span className={styles.detailText}>{host?.fullAddress || "Chandhe Patil Sports Zone, Aundh"}, (~{host?.distance}Km)</span>
      </div>
      <span
        style={{
          color: SKILL_MAP[host?.skill]?.color || "#d99312",
          fontWeight: 500,
          fontSize: 15,
          marginTop: 12,
          display: "inline-block"
        }}
      >
        {SKILL_MAP[host?.skill]?.label || "Skilled"}
      </span>

    </div>
  );
}



