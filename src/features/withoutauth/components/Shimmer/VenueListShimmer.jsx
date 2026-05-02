import React from "react";
import "../Stylesheets/Shimmer/VenueListShimmer.css";

export const VenueListShimmer = () => {
  return (
    <div className="shimmer-page">
      {/* Top search bar skeleton */}
      <div className="shimmer-search-bar">
        <div className="shimmer-pulse shimmer-search-input" />
      </div>

      <div className="shimmer-layout">
        {/* Left filter panel */}
        <div className="shimmer-sidebar">
          <div className="shimmer-pulse shimmer-filter-block" />
          <div className="shimmer-pulse shimmer-filter-block shimmer-filter-sm" />
          <div className="shimmer-pulse shimmer-filter-block shimmer-filter-xs" />
        </div>

        {/* Right cards grid */}
        <div className="shimmer-grid">
          {Array.from({ length: 9 }).map((_, i) => (
            <div className="shimmer-card" key={i}>
              <div className="shimmer-pulse shimmer-card-img" />
              <div className="shimmer-card-body">
                <div className="shimmer-pulse shimmer-card-title" />
                <div className="shimmer-pulse shimmer-card-text" />
                <div className="shimmer-pulse shimmer-card-text shimmer-card-text-sm" />
                <div className="shimmer-card-footer">
                  <div className="shimmer-pulse shimmer-card-badge" />
                  <div className="shimmer-pulse shimmer-card-price" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
