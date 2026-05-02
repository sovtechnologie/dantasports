
import "./StyleSheets/BookVenues.css";
import "./StyleSheets/PlayHost.css";
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
    <div className="hs-card ph-card hs-list-card">
      <div className="ph-inner">
        <div className="ph-type-badge">{typeObj ? typeObj.label : "Regular"}</div>
        <div className="ph-attendees">
          <div className="ph-avatars">
            {host?.attendeesAvatars?.slice(0, 3).map((src, i) => (
              <img key={i} src={src.profile_image} alt="avatar" className="ph-avatar" onError={e => { e.target.onerror = null; e.target.src = gameImage; }} />
            ))}
          </div>
          <div className="ph-going">
            <span className="ph-dot" aria-hidden="true"></span>
            <span>{host?.attendees} Going</span>
          </div>
        </div>
        <p className="ph-host-by">Host By: <strong>{host?.host}</strong></p>
        <div className="ph-meta">
          <img src={calendarIcon} alt="" />
          <span>{host?.date}</span>
        </div>
        <div className="ph-meta">
          <img src={locationIcon} alt="" />
          <span>{host?.address || host?.city}, (~{host?.distance}Km)</span>
        </div>
        <div className="ph-footer">
          <span className="ph-skill" style={{ color: SKILL_MAP[host?.skill]?.color || "#d99312" }}>
            {SKILL_MAP[host?.skill]?.label || "Skilled"}
          </span>
          <span className="ph-join">Join</span>
        </div>
      </div>
    </div>
  );
}



