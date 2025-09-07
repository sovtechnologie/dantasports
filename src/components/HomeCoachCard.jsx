import "./StyleSheets/HomeCoachCard.css";
import LocationIcon from "../features/withoutauth/assets/LocationLogo.svg";
import { useNavigate } from "react-router-dom";
import coachImage from '../features/withoutauth/assets/CoachImage1.svg';

const CoachCard = ({ coach }) => {
    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate(`/Coach/${coach?.id}`);
    };

    return (
        <div className="coach-card" onClick={handleClick} style={{ cursor: "pointer" }}>
            <div className="coach-card-image-wrapper">
                <img src={coach?.image} alt={coach?.name} className="coach-card-image" onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = coachImage;
                            }} />
                <div className="coach-card-tag">{coach?.tag}</div>
                <div className="icon-bottom-left">
                    {/* <img src={coach?.sportIcon} alt='sport' className='icon-img-btn' /> */}
                    {coach.sportIcon?.map((sport, idx) => (
                        <img
                            key={sport.id || idx}
                            src={sport.sports_images}
                            alt={sport.sports_name}
                            className="icon_img_btn-coach"
                            onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = '/fallback-sport-icon.png';
                            }}
                        />
                    ))}
                </div>
            </div>

            <div className="coach-card-details">
                <div className="coach-card-profile">
                    <div className="coach-card-name-location">
                        <div className="coach-card-name">{coach?.name}</div>

                    </div>
                    <div className="coach-card-rating">
                        <span className="coach-card-star">★</span>
                        <span>{coach?.rating}</span>
                        <span className="coach-card-rating-count">({coach?.ratingCount})</span>
                    </div>
                </div>
                <div className="coach-raw-footer">
                    <div className="coach-card-location"><img src={LocationIcon} alt='location icon' className='event-time-img' /><span>{coach?.location}</span></div>
                    <div className="coach-card-category">{coach?.category}</div>
                </div>

            </div>
        </div>
    );
};

export default CoachCard;
