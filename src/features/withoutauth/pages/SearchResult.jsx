import React, { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchGlobalSearchQuery } from "../../../services/withoutLoginApi/SportListApi/endpointApi";
import "../Stylesheets/SearchResult.css";
import searchlogo from "../assets/icons/Search.svg";
import AppDownloadBanner from "../components/AppDownloadBanner";

/* ── Type config ── */
const TYPE_CONFIG = {
  1: { label: "Venues",  route: "venue",  icon: "🏟️" },
  2: { label: "Events",  route: "events", icon: "🏃" },
  3: { label: "Coaches", route: "coach",  icon: "🎯" },
};

/* ── Skeleton cards ── */
const SkeletonGrid = () => (
  <div className="sr-loading-grid">
    {Array.from({ length: 4 }).map((_, i) => (
      <div className="sr-skeleton-card" key={i}>
        <div className="sr-skeleton-img" />
        <div className="sr-skeleton-body">
          <div className="sr-skeleton-line" />
          <div className="sr-skeleton-line sr-skeleton-line-sm" />
          <div className="sr-skeleton-line sr-skeleton-line-xs" />
        </div>
      </div>
    ))}
  </div>
);

export default function SearchResult() {
  const { query } = useParams();
  const [groupedResults, setGroupedResults] = useState({ 1: [], 2: [], 3: [] });
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState(query || "");
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);
  const inputRef = useRef(null);

  const fetchData = (keyword) => {
    const kw = (keyword || "").trim();
    if (kw.length < 3) {
      setError("Please enter at least 3 characters");
      return;
    }
    setError("");
    setLoading(true);
    setSearched(true);
    fetchGlobalSearchQuery(kw)
      .then((res) => {
        const data = Array.isArray(res.result) ? res.result : [];
        const grouped = { 1: [], 2: [], 3: [] };
        data.forEach((item) => {
          if (grouped[item.type]) grouped[item.type].push(item);
        });
        setGroupedResults(grouped);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (query) fetchData(query);
  }, [query]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") fetchData(search);
  };

  const totalResults = Object.values(groupedResults).reduce((s, a) => s + a.length, 0);
  const hasResults = totalResults > 0;

  return (
    <div className="sr-page">

      {/* ── Hero ── */}
      <div className="sr-hero">
        <div className="sr-hero-inner">
          <h1>Find Your Sport</h1>
          <p>Search venues, events, and coaches near you</p>

          <div className="sr-search-wrap">
            <div className="sr-search-box">
              <img src={searchlogo} alt="" className="sr-search-icon" aria-hidden="true" />
              <input
                ref={inputRef}
                type="text"
                className="sr-search-input"
                placeholder="Search venue, sport, location…"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setError(""); }}
                onKeyDown={handleKeyDown}
                aria-label="Search"
              />
              <button className="sr-search-btn" onClick={() => fetchData(search)}>
                Search
              </button>
            </div>
            {error && <p className="sr-error">{error}</p>}
          </div>
        </div>

        <div className="sr-hero-wave">
          <svg viewBox="0 0 1440 40" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,20 C360,40 1080,0 1440,20 L1440,40 L0,40 Z" fill="#f7f9fb"/>
          </svg>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="sr-body">

        {/* Query label */}
        {searched && !loading && (
          <p className="sr-query-label">
            {hasResults
              ? <><strong>{totalResults}</strong> result{totalResults !== 1 ? "s" : ""} for <strong>"{query || search}"</strong></>
              : <>No results for <strong>"{query || search}"</strong></>
            }
          </p>
        )}

        {/* Loading skeletons */}
        {loading && (
          <>
            {[1, 2, 3].map(t => (
              <div className="sr-section" key={t}>
                <div className="sr-section-header">
                  <h2 className="sr-section-title">{TYPE_CONFIG[t].icon} {TYPE_CONFIG[t].label}</h2>
                </div>
                <SkeletonGrid />
              </div>
            ))}
          </>
        )}

        {/* Results */}
        {!loading && searched && (
          <>
            {hasResults ? (
              Object.entries(TYPE_CONFIG).map(([typeKey, config]) => {
                const items = groupedResults[Number(typeKey)] || [];
                if (items.length === 0) return null;
                return (
                  <div className="sr-section" key={typeKey} style={{ animationDelay: `${Number(typeKey) * .1}s` }}>
                    <div className="sr-section-header">
                      <h2 className="sr-section-title">
                        {config.icon} {config.label}
                      </h2>
                      <span className="sr-section-count">{items.length}</span>
                    </div>
                    <div className="sr-grid">
                      {items.map((item, i) => (
                        <Link
                          key={item.id || i}
                          to={`/${config.route}/${item.id}`}
                          className="sr-card"
                          style={{ animationDelay: `${i * .05}s` }}
                        >
                          <div className="sr-card-img-wrap">
                            <img
                              src={item.image || "/placeholder.png"}
                              alt={item.name || "Result"}
                              onError={e => { e.target.src = "/placeholder.png"; }}
                            />
                          </div>
                          <div className="sr-card-body">
                            <p className="sr-card-name">{item.name || "Untitled"}</p>
                            <span className="sr-card-type">{config.label.slice(0, -1)}</span>
                            <div className="sr-card-arrow">
                              <span>View details</span>
                              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                <path d="M3 7h8M8 4l3 3-3 3" stroke="#1163C7" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="sr-no-results">
                <div className="sr-no-results-icon">🔍</div>
                <h2>No results found</h2>
                <p>Try a different keyword — venue name, sport, or city</p>
              </div>
            )}
          </>
        )}

        {/* Initial state — not searched yet */}
        {!loading && !searched && (
          <div className="sr-no-results">
            <div className="sr-no-results-icon">🏅</div>
            <h2>Start searching</h2>
            <p>Enter a venue, sport, or location above to find results</p>
          </div>
        )}

        <div style={{ marginTop: 40 }}>
          <AppDownloadBanner />
        </div>
      </div>
    </div>
  );
}
