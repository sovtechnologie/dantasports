import React from "react";
import "../Stylesheets/Shimmer/VenueListShimmer.css";

export const VenueListShimmer = () => {
    return (
        <div style={{ display: 'flex', gap: '20px', padding: '100px 20px', marginTop: '30px' }}>
            {/* Left filter panel */}
            <div style={{ flex: '0 0 22%' }}>
                <div className="skeleton filter-large">
                </div>
                <div className="skeleton filter-small" />
            </div>

            {/* Right cards grid: 4x3 */}
            <div style={{
                flex: '1',
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '20px'
            }}>
                {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} style={{ borderRadius: '12px', overflow: 'hidden' }}>
                        <div className="skeleton card-img" />
                        <div className="skeleton card-title" />
                        <div className="skeleton card-text" />
                    </div>
                ))}
            </div>
        </div>
    )
}