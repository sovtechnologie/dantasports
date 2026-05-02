import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./StyleSheets/BookVenues.css";
import "./StyleSheets/PlayHost.css";
import { useCardStagger } from "../hooks/useCardStagger";
import calendarIcon from "../assets/images/home/bookrun/date.svg";
import locationIcon from "../assets/images/home/bookrun/map.svg";
import profile1 from "../assets/images/home/playhost/user1.png";
import profile2 from "../assets/images/home/playhost/user2.png";
import { useFetchHostList } from "../hooks/Hostlist/useFetchHostList.jsx";

function formatTime(t = "00:00") {
  if (!t) return "";
  const [h, m, s = 0] = t.split(":").map(Number);
  const d = new Date(); d.setHours(h, m, s);
  return d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
}

const SKILL_MAP = {
  0: { label: "Novice",  color: "#18429F" },
  1: { label: "Learner", color: "#0FA903" },
  2: { label: "Skilled", color: "#FFA200" },
  3: { label: "Expert",  color: "#E65B00" },
  4: { label: "Elite",   color: "#4C2DFF" },
};

const ACTIVITY_LABEL = { 1: "Regular", 2: "Coaching", 3: "Tournament" };

const FALLBACK_HOSTS = [
  {
    id: "home-host-1",
    activity_type: 1,
    host_name: "Rohan",
    date: "2026-05-09",
    start_time: "18:00:00",
    city: "Bengaluru",
    state: "Karnataka",
    distance_km: 2.2,
    going: 8,
    game_skill: 2,
    userProfile_image: [{ profile_image: profile1 }, { profile_image: profile2 }],
  },
  {
    id: "home-host-2",
    activity_type: 2,
    host_name: "Sneha",
    date: "2026-05-14",
    start_time: "07:00:00",
    city: "Bengaluru",
    state: "Karnataka",
    distance_km: 3.4,
    going: 12,
    game_skill: 1,
    userProfile_image: [{ profile_image: profile2 }, { profile_image: profile1 }],
  },
  {
    id: "home-host-3",
    activity_type: 3,
    host_name: "Danta Club",
    date: "2026-05-21",
    start_time: "16:30:00",
    city: "Bengaluru",
    state: "Karnataka",
    distance_km: 4.6,
    going: 18,
    game_skill: 3,
    userProfile_image: [{ profile_image: profile1 }, { profile_image: profile2 }],
  },
  {
    id: "home-host-4",
    activity_type: 1,
    host_name: "Arjun",
    date: "2026-05-28",
    start_time: "19:00:00",
    city: "Bengaluru",
    state: "Karnataka",
    distance_km: 5.1,
    going: 6,
    game_skill: 0,
    userProfile_image: [{ profile_image: profile2 }, { profile_image: profile1 }],
  },
];

export default function PlayHost() {
  const { lat, lng } = useSelector((s) => s.location);
  const [gridRef, cardVisible] = useCardStagger(4, 90);
  const { data } = useFetchHostList({ lat, lng });
  const hosts = data?.result?.length ? data.result : FALLBACK_HOSTS;

  const handleClick = () => window.open("https://play.google.com/store/apps", "_blank");

  return (
    <section className="hs-section hs-section--alt">
      <Container>
        <div className="hs-header">
          <div className="hs-title-wrap">
            <span className="hs-eyebrow">Community</span>
            <h2 className="hs-title">Play &amp; Host</h2>
          </div>
          <Link to="/host" className="hs-see-all">
            See All
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

        <div className="hs-grid" ref={gridRef}>
          {hosts.slice(0, 4).map((host, idx) => {
            const skill    = SKILL_MAP[host.game_skill] || SKILL_MAP[2];
            const dateText = `${new Date(host?.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })} | ${formatTime(host?.start_time)}`;
            const attendees = host?.userProfile_image?.length
              ? host.userProfile_image
              : [{ profile_image: profile1 }, { profile_image: profile2 }];

            return (
              <div
                key={host.id}
                className={`hs-card ph-card card-stagger${cardVisible.has(idx) ? " card-in" : ""}`}
                onClick={handleClick}
                role="button"
                tabIndex={0}
                style={{ transitionDelay: `${idx * 0.09}s` }}
                onKeyDown={(e) => e.key === "Enter" && handleClick()}
              >
                <div className="ph-inner">
                  {/* Activity type */}
                  <div className="ph-type-badge">
                    {ACTIVITY_LABEL[host.activity_type] || "Regular"}
                  </div>

                  {/* Attendees */}
                  <div className="ph-attendees">
                    <div className="ph-avatars">
                      {attendees.slice(0, 3).map((a, i) => (
                        <img
                          key={i}
                          src={a.profile_image || profile1}
                          alt="player"
                          className="ph-avatar"
                          style={{ zIndex: 3 - i }}
                          onError={(e) => { e.target.src = profile1; }}
                        />
                      ))}
                    </div>
                    <div className="ph-going">
                      <span className="ph-dot" />
                      <span>{host.going || 0} Going</span>
                    </div>
                  </div>

                  {/* Host name */}
                  <p className="ph-host-by">
                    Host By: <strong>{host.host_name || "Unknown"}</strong>
                  </p>

                  {/* Date */}
                  <div className="ph-meta">
                    <img src={calendarIcon} alt="" />
                    <span>{dateText}</span>
                  </div>

                  {/* Location */}
                  <div className="ph-meta">
                    <img src={locationIcon} alt="" />
                    <span>
                      {host.city || "—"}{host.state ? `, ${host.state}` : ""}{" "}
                      (~{host.distance_km?.toFixed(1) || "0"} km)
                    </span>
                  </div>

                  {/* Footer */}
                  <div className="ph-footer">
                    <span className="ph-skill" style={{ color: skill.color }}>
                      {skill.label}
                    </span>
                    <span className="ph-join">
                      Join
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
