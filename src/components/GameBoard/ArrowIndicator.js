// src/components/GameBoard/ArrowIndicator.js
import React from 'react';

export const ArrowIndicator = ({ player, angle }) => (
  <div
    className="absolute pointer-events-none"
    style={{
      left: player.x,
      top: player.y,
      transform: 'translate(-50%, -50%)',
      zIndex: 20
    }}
  >
    <svg width="70" height="70" viewBox="0 0 70 70">
      <circle cx="35" cy="35" r="33" fill="none" stroke="rgba(255,255,0,0.4)" strokeWidth="2" />
      
      <line
        x1="35"
        y1="35"
        x2="35"
        y2="12"
        stroke="yellow"
        strokeWidth="3"
        strokeLinecap="round"
        style={{
          transform: `rotate(${angle}deg)`,
          transformOrigin: '35px 35px'
        }}
      />
      <polygon
        points="30,12 35,4 40,12"
        fill="yellow"
        style={{
          transform: `rotate(${angle}deg)`,
          transformOrigin: '35px 35px'
        }}
      />
    </svg>
  </div>
);