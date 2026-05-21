// src/components/GameBoard/DrawBall.js
import React from 'react';

export const DrawBall = ({ ball }) => (
  <div
    className="absolute bg-white rounded-full shadow-lg"
    style={{
      left: ball.x - ball.r,
      top: ball.y - ball.r,
      width: ball.r * 2,
      height: ball.r * 2,
      zIndex: 15,
      background: 'radial-gradient(circle at 30% 30%, white, #cbd5e1)',
      boxShadow: '0 0 8px rgba(255,255,255,0.5)'
    }}
  />
);