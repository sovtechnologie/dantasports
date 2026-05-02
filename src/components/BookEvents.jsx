import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import "./StyleSheets/BookVenues.css";
import { useCardStagger } from "../hooks/useCardStagger";
import star     from "../assets/images/home/bookvenues/star.svg";
import likeIcon from "../assets/images/home/bookvenues/like.svg";
import shareIcon from "../assets/images/home/bookvenues/share.svg";
import dateIcon  from "../assets/images/home/bookrun/date.svg";
import mapIcon   from "../assets/images/home/bookrun/map.svg";
import HeartFilled from "../assets/svg-icons/heart-filled.svg";
import fallback from "../assets/images/home/bookevents/bookevents.png";
import { useFetchEvent }  from "../hooks/EventList/useFetchEvents.js";
import { useLikeEvent }   from "../hooks/favouriteEvent/useLikeEvent.js";
import { useUnlikeEvent } from "../hooks/favouriteEvent/useUnLikeEvent.js";

function fmt(t = "00:00") {
  if (!t) return "";
  const [h, m, s = 0] = t.split(":").map(Number);
  const d = new Date(); d.setHours(h, m, s);
  return d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
}
const DIFF = { 0: "Moderate", 1: "Easy", 2: "Difficult" };

export default function BookEvents() {
  const { lat, lng } = useSelector(s => s.location);
  const userId = useSelector(s => s.auth.id);
  const auth   = useSelector(s => s.auth);
  const queryClient = useQueryClient();
  const [gridRef, cardVisible] = useCardStagger(4, 80);
  const [list, setList] = useState([]);

  const { data, isLoading } = useFetchEvent({ lat, lng, type: 1, userId });
  const likeEvent   = useLikeEvent();
  const unlikeEvent = useUnlikeEvent();

  useEffect(() => { if (data?.result?.length) setList(data.result); }, [data]);

  const toggleFav = async (e, evt) => {
    e.preventDefault(); e.stopPropagation();
    if (!auth?.id) { alert("Please login first."); return; }
    const id = evt.id; const was = evt.favourite;
    setList(p => p.map(v => v.id === id ? { ...v, favourite: !was } : v));
    try {
      if (!was) {
        const res = await likeEvent.mutateAsync({ eventId: id, userId, type: evt.type });
        setList(p => p.map(v => v.id === id ? { ...v, favourite_event_id: res.favourite_event_id } : v));
      } else {
        await unlikeEvent.mutateAsync({ favouriteEventId: evt.favourite_event_id, type: evt.type });
      }
      queryClient.invalidateQueries(["EventList", userId]);
    } catch { setList(p => p.map(v => v.id === id ? { ...v, favourite: was } : v)); }
  };

  const handleShare = (e, evt) => {
    e.preventDefault(); e.stopPropagation();
    const url = `${window.location.origin}/events/${evt.id}`;
    if (navigator.share) navigator.share({ title: evt.event_title, url });
    else navigator.clipboard.writeText(url);
  };

  if (isLoading || !list.length) return null;

  return (
    <section className="hs-section--alt">
      <Container>
        <div className="hs-header">
          <div className="hs-title-wrap">
            <span className="hs-eyebrow">Upcoming</span>
            <h2 className="hs-title">Book Events</h2>
          </div>
          <Link to="/events" className="hs-see-all">
            See All
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

        <div className="hs-grid" ref={gridRef}>
          {list.slice(0, 4).map((evt, idx) => (
            <Link
              to={`/events/${evt.id}`}
              key={evt.id}
              className={`hs-card card-stagger${cardVisible.has(idx) ? " card-in" : ""}`}
              style={{ transitionDelay: `${idx * 0.08}s` }}
            >
              <div className="hs-card-img">
                <img src={evt.desktop_image || fallback} alt={evt.event_title} loading="lazy"
                  onError={e => { e.target.src = fallback; }} />
                <div className="hs-rating">
                  <img src={star} alt="★" />
                  <span>{evt.average_rating || "0.0"}</span>
                </div>
                <div className="hs-actions">
                  <button className="hs-action-btn" onClick={e => toggleFav(e, evt)} aria-label="Like">
                    <img src={evt.favourite ? HeartFilled : likeIcon} alt="like" />
                  </button>
                  <button className="hs-action-btn" onClick={e => handleShare(e, evt)} aria-label="Share">
                    <img src={shareIcon} alt="share" />
                  </button>
                </div>
                {evt.difficulty !== undefined && (
                  <div className="hs-badge">{DIFF[evt.difficulty] || "Not Specified"}</div>
                )}
              </div>

              <div className="hs-card-body">
                <p className="hs-card-name">{evt.event_title}</p>

                <div className="hs-card-meta">
                  <img src={dateIcon} alt="" />
                  <span>
                    {new Date(evt.start_date).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })} –{" "}
                    {new Date(evt.end_date).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })} | {fmt(evt.start_time)}
                  </span>
                </div>

                <div className="hs-card-meta">
                  <img src={mapIcon} alt="" />
                  <span>{evt.locations?.[0]?.area}, {evt.locations?.[0]?.city}</span>
                </div>

                <div className="hs-card-footer">
                  <span className="hs-offer">
                    {evt.coupon_type === "percentage" && evt.discount_offer ? `Upto ${parseFloat(evt.discount_offer)}% Off` :
                     evt.coupon_type === "flat" && evt.discount_offer ? `Upto ₹${parseFloat(evt.discount_offer)} Off` : ""}
                  </span>
                  <span className="hs-price">
                    {evt.lowest_ticket_price ? `₹${parseInt(evt.lowest_ticket_price)} onwards` : ""}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
