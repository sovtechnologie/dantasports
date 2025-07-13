import React from 'react';
import '../Stylesheets/Shimmer/TimeSlotsShimmer.css';

const TimeSlotsShimmer = ({ count = 12 }) => {
    return (
        <div className="ts-wrapper">
            <div className="ts-header">
                <div className="shimmer-card" style={{ width: '80px', height: '20px' }}></div>
                <div className="shimmer-card" style={{ width: '80px', height: '20px', marginLeft: 'auto' }}></div>
            </div>
            <div className="shimmer-row">
                {Array.from({ length: count }).map((_, i) => (
                    <div key={i} className="shimmer-card shimmer-slot"></div>
                ))}
            </div>
        </div>
    );
};

export default TimeSlotsShimmer;
