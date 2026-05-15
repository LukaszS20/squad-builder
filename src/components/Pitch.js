import React from 'react';
import { FORMATIONS } from '../data/formations';

const positionColors = {
  GK: 'from-yellow-500 to-yellow-600',
  DEF: 'from-blue-500 to-blue-700',
  MID: 'from-green-500 to-green-700',
  FWD: 'from-red-500 to-red-700',
};

const slotRoleColor = (label) => {
  if (label === 'GK') return 'border-yellow-400 shadow-yellow-400/40';
  if (['CB', 'RB', 'LB', 'CB1', 'CB2', 'CB3', 'RWB', 'LWB'].includes(label)) return 'border-blue-400 shadow-blue-400/40';
  if (['ST', 'ST1', 'ST2', 'RW', 'LW', 'CF'].includes(label)) return 'border-red-400 shadow-red-400/40';
  return 'border-emerald-400 shadow-emerald-400/40';
};

const playerGradient = (pos) => {
  if (pos === 'GK') return positionColors.GK;
  if (pos === 'DEF') return positionColors.DEF;
  if (pos === 'MID') return positionColors.MID;
  return positionColors.FWD;
};

export default function Pitch({ formation, squad, onSlotClick, onRemovePlayer, selectingSlot }) {
  const slots = FORMATIONS[formation]?.slots || [];

  return (
    <div className="w-full max-w-lg">
      {/* Pitch container */}
      <div
        className="relative w-full rounded-2xl overflow-hidden"
        style={{ paddingBottom: '145%' }}
      >
        {/* Grass background */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, #1a472a 0%, #206135 15%, #1a5c2e 30%, #206135 45%, #1a5c2e 60%, #206135 75%, #1a5c2e 90%, #206135 100%)',
          }}
        />

        {/* Pitch markings */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 145"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="0.4" result="coloredBlur" />
              <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          <g stroke="rgba(255,255,255,0.35)" strokeWidth="0.6" fill="none" filter="url(#glow)">
            {/* Border */}
            <rect x="5" y="5" width="90" height="135" />
            {/* Center line */}
            <line x1="5" y1="72.5" x2="95" y2="72.5" />
            {/* Center circle */}
            <circle cx="50" cy="72.5" r="12" />
            <circle cx="50" cy="72.5" r="0.8" fill="rgba(255,255,255,0.35)" stroke="none" />
            {/* Top penalty box */}
            <rect x="22" y="5" width="56" height="22" />
            {/* Top goal box */}
            <rect x="34" y="5" width="32" height="9" />
            {/* Top penalty spot */}
            <circle cx="50" cy="19" r="0.8" fill="rgba(255,255,255,0.35)" stroke="none" />
            {/* Bottom penalty box */}
            <rect x="22" y="118" width="56" height="22" />
            {/* Bottom goal box */}
            <rect x="34" y="131" width="32" height="9" />
            {/* Bottom penalty spot */}
            <circle cx="50" cy="126" r="0.8" fill="rgba(255,255,255,0.35)" stroke="none" />
          </g>
        </svg>

        {/* Player slots */}
        {slots.map((slot) => {
          const player = squad[slot.id];
          const isSelecting = selectingSlot === slot.id;

          return (
            <div
              key={slot.id}
              className="absolute"
              style={{
                left: `${slot.col}%`,
                bottom: `${slot.row}%`,
                transform: 'translate(-50%, 50%)',
                zIndex: 10,
              }}
            >
              {player ? (
                <PlayerCard
                  player={player}
                  slotLabel={slot.label}
                  isSelecting={isSelecting}
                  onRemove={() => onRemovePlayer(slot.id)}
                  onClick={() => onSlotClick(slot.id)}
                />
              ) : (
                <EmptySlot
                  label={slot.label}
                  isSelecting={isSelecting}
                  onClick={() => onSlotClick(slot.id)}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function EmptySlot({ label, isSelecting, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        flex flex-col items-center justify-center gap-1
        w-14 h-14 rounded-full border-2 border-dashed
        transition-all duration-200 cursor-pointer group
        ${slotRoleColor(label)}
        ${isSelecting
          ? 'bg-white/20 border-solid scale-110 shadow-lg'
          : 'bg-black/20 hover:bg-white/10 hover:scale-105'
        }
      `}
    >
      <span className="text-lg group-hover:scale-110 transition-transform">+</span>
      <span className="text-[9px] font-black tracking-widest uppercase text-white/70">{label}</span>
    </button>
  );
}

// Pitch.js - tylko zmieniona funkcja PlayerCard
function PlayerCard({ player, slotLabel, isSelecting, onRemove, onClick }) {
  return (
    <div className="relative group">
      <button
        onClick={onClick}
        className={`
          flex flex-col items-center w-16 transition-all duration-200
          ${isSelecting ? 'scale-110' : 'hover:scale-105'}
        `}
      >
        {/* Avatar circle z zdjęciem lub flagą */}
        <div className={`
          w-12 h-12 rounded-full border-2 flex items-center justify-center
          shadow-lg relative overflow-hidden
          bg-gradient-to-br ${playerGradient(player.primaryPosition)}
          ${slotRoleColor(slotLabel)}
        `}>
          {player.image ? (
            <img src={player.image} alt={player.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-2xl select-none">{player.flag}</span>
          )}
          {/* Shine overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
        </div>

        {/* Name */}
        <div className="mt-1 bg-black/70 backdrop-blur-sm rounded px-1 py-0.5 max-w-[68px]">
          <p className="text-[9px] font-black tracking-wide text-white truncate text-center leading-tight">
            {player.name.split(' ').pop()}
          </p>
          <p className="text-[8px] text-white/50 text-center">{slotLabel}</p>
        </div>
      </button>

      {/* Remove button */}
      <button
        onClick={(e) => { e.stopPropagation(); onRemove(); }}
        className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold
          opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center shadow-md z-20
          hover:bg-red-600 hover:scale-110"
      >
        ×
      </button>
    </div>
  );
}
