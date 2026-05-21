// src/components/GameBoard/DrawPitch.js
import React from 'react';

export const DrawPitch = ({ boardWidth, boardHeight }) => (
  <>
    {/* Linie */}
    <div className="absolute inset-0 border-2 border-white/20 rounded-xl" />
    <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white/30" />
    <div className="absolute left-1/2 top-1/2 w-28 h-28 rounded-full border-2 border-white/20 transform -translate-x-1/2 -translate-y-1/2" />
    
    {/* Pole karne lewe */}
    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-44 h-60 border-2 border-white/20 rounded-r-lg" />
    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-4 h-28 bg-white/10 border-2 border-white/40 rounded-r-lg" />
    
    {/* Pole karne prawe */}
    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-44 h-60 border-2 border-white/20 rounded-l-lg" />
    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-28 bg-white/10 border-2 border-white/40 rounded-l-lg" />
  </>
);