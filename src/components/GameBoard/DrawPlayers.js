// src/components/GameBoard/DrawPlayers.js
import React from 'react';

const getPositionLabel = (label) => {
  const posMap = {
    'GK': 'GK', 'RB': 'RB', 'LB': 'LB', 'CB': 'CB',
    'CDM': 'CDM', 'CM': 'CM', 'CAM': 'CAM', 'RM': 'RM', 'LM': 'LM',
    'RW': 'RW', 'LW': 'LW', 'ST': 'ST'
  };
  return posMap[label] || label;
};

export const DrawPlayers = ({ players, color, turn, canMove, selectedPlayer, onPlayerClick }) => {
  const gradient = color === 'blue' 
    ? 'radial-gradient(circle at 35% 35%, #3b82f6, #1e40af)'
    : 'radial-gradient(circle at 35% 35%, #ef4444, #991b1b)';
  
  return players.map((player) => {
    // Sprawdź czy TEN konkretny zawodnik jest wybrany
    const isThisPlayerSelected = selectedPlayer?.id === player.id;
    
    return (
      <div
        key={player.id}
        onClick={() => onPlayerClick(player, color === 'blue' ? 1 : 2)}
        className={`absolute rounded-full border-2 border-white shadow-lg flex flex-col items-center justify-center text-white font-bold transition-all
          ${canMove && turn === (color === 'blue' ? 1 : 2) ? 'cursor-pointer hover:ring-2 hover:ring-yellow-400 hover:scale-105' : 'cursor-default'}
          ${isThisPlayerSelected ? 'ring-4 ring-yellow-400 scale-105' : ''}`}
        style={{
          left: player.x - player.r,
          top: player.y - player.r,
          width: player.r * 2,
          height: player.r * 2,
          background: gradient,
          zIndex: 10
        }}
      >
        <span className="text-[9px] font-black">{getPositionLabel(player.position)}</span>
        <span className="text-[7px] text-white/80">{player.name.split(' ').pop()?.substring(0, 3)}</span>
      </div>
    );
  });
};