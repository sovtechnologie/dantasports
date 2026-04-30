import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import "./StyleSheets/BookVenues.css";
import "./StyleSheets/BookCoach.css";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import star from "../assets/images/home/bookvenues/star.svg";
import likeIcon from "../assets/images/home/bookvenues/like.svg";
import shareIcon from "../assets/images/home/bookvenues/share.svg";
import mapIcon from "../assets/images/home/bookrun/map.svg";
import fallback from "../assets/images/home/bookcoach/coach1.png";
import sportFallback from "../assets/images/home/bookcoach/Basketball.svg";
import HeartFilled from "../features/auth/assets/VenueCardLogo/heartfilled.png";
import { useFetchCoach } from "../hooks/CoachList/useFetchCoach";
import { useLikeCoach } from "../hooks/favouriteCoach/useLikeCoach";
import { useUnlikeCoach } from "../hooks/favouriteCoach/useUnlikeCoach";

export default function BookCoach() {
  const { lat, lng } = useSelector((s) => s.location);
  const auth = useSelector((s) => s.auth);
  const queryClient = useQueryClient();
  const [sectionRef, sectionVisible] = useIntersectionObserver({ threshold: 0.06 });
  const [list, setList] = useState([]);

  const { data, isLoading } = useFetchCoach({ lat, lng, userId: auth?.id });
  const likeCoach   = useLikeCoach();
  const unlikeCoach = useUnlikeCoach();

  useEffect(() => {
    if (data?.status === 200) setList(data.result.slice(0, 4));
  }, [data]);

  const toggleFav = (e, coach) => {
    e.preventDefault(); e.stopPropagation();
    if (!auth?.id) { alert("Please login first."); return; }
    setList((p) => p.map((c) => c.id === coach.id ? { ...c, favourite: !c.favourite } : c));
    if (!coach.favourite) {
      likeCoach.mutate({ coachesId: coach.id, userId: auth.id }, {
        onSuccess: (d) => {
          setList((p) => p.map((c) => c.id === coach.id ? { ...c, favourite: true, favourite_coach_id: d.favouriteId } : c));
          queryClient.invalidateQueries(["coachList", auth.id]);
        },
      });
    } else {
      unlikeCoach.mutate({ favouriteCoachesId: coach.favourite_coaches_id || coach.favourite_coach_id }, {
        onSuccess: () => queryClient.invalidateQueries(["coachList", auth.id]),
      });
    }
  };

  const handleShare = (e, coach) => {
    e.preventDefault(); e.stopPropagation();
    const url = `${window.location.origin}/Coach/${coach.id}`;
    if (navigator.share) navigator.share({ title: coach.name, url });
    else navigator.clipboard.writeText(url);
  };

  if (isLoading || !list.length) return null;

  return (
    <section className={`hs-section${sectionVisible ? " section-in" : ""}`} ref={sectionRef}>
      <Container>
        <div className="hs-header">
          <div className="hs-title-wrap">
            <span className="hs-eyebrow">Expert Training</span>
            <h2 className="hs-title">Book Coach</h2>
          </div>
          <Link to="/Coach" className="hs-see-all">
            See All
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

        <div className="hs-grid">
          {list.map((coach) => (
            <Link to={`/Coach/${coach.id}`} className="hs-card" key={coach.id}>
              <div className="hs-card-img">
                <img src={coach.desktop_image || coach.mobile_image || fallback} alt={coach.name} loading="lazy"
                  onError={(e) => { e.target.src = fallback; }} />
                <div className="hs-rating">
                  <img src={star} alt="★" />
                  <span>{coach.average_rating || "0.0"} ({coach.review_count || 0})</span>
                </div>
                <div className="hs-actions">
                  <button className="hs-action-btn" onClick={(e) => toggleFav(e, coach)} aria-label="Like">
                    <img src={coach.favourite ? HeartFilled : likeIcon} alt="like" />
                  </button>
                  <button className="hs-action-btn" onClick={(e) => handleShare(e, coach)} aria-label="Share">
                    <img src={shareIcon} alt="share" />
                  </button>
                </div>
                <div className="hs-badge">{coach.type === 1 ? "Trainer" : "Academy"}</div>
              </div>
              <div className="hs-card-body">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                  <h3 className="hs-card-name" style={{ flex: 1 }}>{coach.name}</h3>
                  {coach.training_type && (
                    <span style={{ fontSize: 11, color: "#FC8019", fontFamily: "DM Sans,sans-serif", fontWeight: 500, flexShrink: 0, marginLeft: 6 }}>
                      {coach.training_type}
                    </span>
                  )}
                </div>
                <p className="hs-card-meta">
                  <img src={mapIcon} alt="" />
                  <span>{coach.locations?.area}, {coach.locations?.city}</span>
                </p>
                <div className="hs-sports">
                  {coach.linked_sports?.slice(0, 4).map((s, i) => (
                    <div className="hs-sport-icon" key={i} title={s.sports_name}>
                      <img src={s.sports_images || sportFallback} alt={s.sports_name} loading="lazy"
                        onError={(e) => { e.target.src = sportFallback; }} />
                    </div>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
