// src/components/GameBoard/ScoreHeader.js
import React from 'react';

export const ScoreHeader = ({ squad1, squad2, score, turn, message, chargingPower, power }) => (
  <div className="text-center mb-4">
    <div className="flex justify-center gap-8 mb-2">
      <div className="text-center">
        <div className="w-10 h-10 rounded-full bg-blue-500 mx-auto mb-1" />
        <p className="text-white font-bold text-sm">{squad1?.name || 'Gracz 1'}</p>
        <p className="text-white/40 text-xs">{squad1?.formation}</p>
      </div>
      <div className="text-2xl font-bold text-yellow-400">VS</div>
      <div className="text-center">
        <div className="w-10 h-10 rounded-full bg-red-500 mx-auto mb-1" />
        <p className="text-white font-bold text-sm">{squad2?.name || 'Gracz 2'}</p>
        <p className="text-white/40 text-xs">{squad2?.formation}</p>
      </div>
    </div>
    <p className="text-yellow-400 text-sm">
      Tura: {turn === 1 ? '🔵 Niebiescy' : '🔴 Czerwoni'} | Wynik: {score.team1} : {score.team2}
    </p>
    {message && <p className="text-yellow-400 text-sm mt-2 animate-pulse">{message}</p>}
    {chargingPower && (
      <div className="mt-2 w-48 mx-auto">
        <div className="h-3 bg-white/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-yellow-400 transition-all duration-20"
            style={{ width: `${power}%` }}
          />
        </div>
        <p className="text-yellow-400 text-xs mt-1">💪 Siła: {Math.round(power)}%</p>
      </div>
    )}
  </div>
);