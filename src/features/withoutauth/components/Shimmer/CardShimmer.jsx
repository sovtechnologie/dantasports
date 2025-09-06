import React from "react";
import "../Stylesheets/Shimmer/CardShimmer.css"

export const CardShimmer = () =>{
    return (
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
    )
}