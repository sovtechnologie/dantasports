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
import mapIcon   from "../assets/images/home/bookrun/map.svg";
import HeartFilled from "../assets/svg-icons/heart-filled.svg";
import fallback from "../assets/images/home/bookgym/bookgym.png";
import { useFetchGym }  from "../hooks/GymList/useFetchGym.js";
import { useLikeGym }   from "../hooks/FavouriteGym/useLikeGym.js";
import { useUnlikeGym } from "../hooks/FavouriteGym/useUnlikeGym.js";

export default function BookGym() {
  const { lat, lng } = useSelector(s => s.location);
  const userId = useSelector(s => s.auth.id);
  const auth   = useSelector(s => s.auth);
  const queryClient = useQueryClient();
  const [gridRef, cardVisible] = useCardStagger(4, 80);
  const [list, setList] = useState([]);

  const { data, isLoading } = useFetchGym({ lat, lng, userId: userId || null });
  const likeGym   = useLikeGym();
  const unlikeGym = useUnlikeGym();

  useEffect(() => { if (data?.result) setList(data.result); }, [data]);

  const toggleFav = (e, gym) => {
    e.preventDefault(); e.stopPropagation();
    if (!auth?.id) { alert("Please login first."); return; }
    const id = gym.Id;
    setList(p => p.map(v => v.Id === id ? { ...v, favourite: !v.favourite } : v));
    if (!gym.favourite) {
      likeGym.mutate({ gymId: id, userId }, {
        onSuccess: () => queryClient.invalidateQueries(["GymList", userId]),
        onError:   () => setList(p => p.map(v => v.Id === id ? { ...v, favourite: false } : v)),
      });
    } else {
      unlikeGym.mutate({ gymFavouriteId: gym.favourite_gym_id }, {
        onSuccess: () => queryClient.invalidateQueries(["GymList", userId]),
        onError:   () => setList(p => p.map(v => v.Id === id ? { ...v, favourite: true } : v)),
      });
    }
  };

  const handleShare = (e, gym) => {
    e.preventDefault(); e.stopPropagation();
    const url = `${window.location.origin}/gym/${gym.Id}`;
    if (navigator.share) navigator.share({ title: gym.gym_name, url });
    else navigator.clipboard.writeText(url);
  };

  if (isLoading || !list.length) return null;

  return (
    <section className="hs-section">
      <Container>
        <div className="hs-header">
          <div className="hs-title-wrap">
            <span className="hs-eyebrow">Fitness</span>
            <h2 className="hs-title">Book Gym</h2>
          </div>
          <Link to="/gym" className="hs-see-all">
            See All
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

        <div className="hs-grid" ref={gridRef}>
          {list.slice(0, 4).map((gym, idx) => {
            const minPrice = gym.gym_price_slot?.length
              ? gym.gym_price_slot.reduce((m, c) => c.price < m.price ? c : m).price
              : null;
            return (
              <Link
                to={`/gym/${gym.Id}`}
                key={gym.Id}
                className={`hs-card card-stagger${cardVisible.has(idx) ? " card-in" : ""}`}
                style={{ transitionDelay: `${idx * 0.08}s` }}
              >
                <div className="hs-card-img">
                  <img src={gym.desktop_image || gym.mobile_image || fallback} alt={gym.gym_name} loading="lazy"
                    onError={e => { e.target.src = fallback; }} />
                  <div className="hs-rating">
                    <img src={star} alt="★" />
                    <span>{gym.average_rating || "0.0"} ({gym.review_count || 0})</span>
                  </div>
                  <div className="hs-actions">
                    <button className="hs-action-btn" onClick={e => toggleFav(e, gym)} aria-label="Like">
                      <img src={gym.favourite ? HeartFilled : likeIcon} alt="like" />
                    </button>
                    <button className="hs-action-btn" onClick={e => handleShare(e, gym)} aria-label="Share">
                      <img src={shareIcon} alt="share" />
                    </button>
                  </div>
                </div>

                <div className="hs-card-body">
                  <p className="hs-card-name">{gym.gym_name}</p>

                  <div className="hs-card-meta">
                    <img src={mapIcon} alt="" />
                    <span>{gym.city} (~{gym.distance ? gym.distance.toFixed(1) : 0} km)</span>
                  </div>

                  <div className="hs-card-footer">
                    <span className="hs-offer">
                      {gym.coupon_type === "percentage" && gym.discount_offer ? `Upto ${parseFloat(gym.discount_offer)}% Off` :
                       gym.coupon_type === "flat" && gym.discount_offer ? `Upto ₹${parseFloat(gym.discount_offer)} Off` : ""}
                    </span>
                    <span className="hs-price">{minPrice ? `₹${minPrice} onwards` : ""}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
