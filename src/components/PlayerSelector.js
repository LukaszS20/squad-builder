import React, { useState } from 'react';

const positionLabel = { GK: '🧤 GK', DEF: '🛡️ DEF', MID: '⚙️ MID', FWD: '⚡ FWD' };
const positionBg = {
  GK: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  DEF: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  MID: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  FWD: 'bg-red-500/20 text-red-300 border-red-500/30',
};

// Mapowanie label slots na kategorie
const slotToCategory = {
  'GK': 'GK',
  'RB': 'DEF', 'LB': 'DEF', 'CB': 'DEF', 'RWB': 'DEF', 'LWB': 'DEF',
  'CDM': 'MID', 'CM': 'MID', 'CAM': 'MID', 'RM': 'MID', 'LM': 'MID',
  'RW': 'FWD', 'LW': 'FWD', 'ST': 'FWD',
};

export default function PlayerSelector({ players, usedIds, slotLabel, onSelect, onClose }) {
  const [search, setSearch] = useState('');
  const [filterPos, setFilterPos] = useState('ALL');
  
  const isGkSlot = slotLabel === 'GK';
  
  // Filtruj zawodników którzy mogą grać na danej pozycji
  const getValidPlayersForSlot = () => {
    if (isGkSlot) {
      return players.filter(p => p.positions.includes('GK'));
    }
    
    return players.filter(player => {
      if (player.positions.includes(slotLabel)) return true;
      
      if (slotLabel === 'CM' && player.positions.some(p => ['CM', 'CAM', 'CDM'].includes(p))) return true;
      if (slotLabel === 'CB' && player.positions.some(p => ['CB', 'LB', 'RB'].includes(p))) return true;
      if (slotLabel === 'CDM' && player.positions.includes('CDM')) return true;
      if (slotLabel === 'CAM' && player.positions.includes('CAM')) return true;
      if (slotLabel === 'RM' && player.positions.some(p => ['RM', 'RW'].includes(p))) return true;
      if (slotLabel === 'LM' && player.positions.some(p => ['LM', 'LW'].includes(p))) return true;
      if (slotLabel === 'RB' && player.positions.some(p => ['RB', 'RWB'].includes(p))) return true;
      if (slotLabel === 'LB' && player.positions.some(p => ['LB', 'LWB'].includes(p))) return true;
      if (slotLabel === 'RW' && player.positions.some(p => ['RW', 'RM'].includes(p))) return true;
      if (slotLabel === 'LW' && player.positions.some(p => ['LW', 'LM'].includes(p))) return true;
      
      return false;
    });
  };
  
  const validPlayers = getValidPlayersForSlot();
  
  const filtered = validPlayers.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.country.toLowerCase().includes(search.toLowerCase()) ||
      p.club.toLowerCase().includes(search.toLowerCase());
    const matchPos = filterPos === 'ALL' || p.primaryPosition === filterPos;
    return matchSearch && matchPos;
  });

  return (
    <div className="w-full lg:w-96 bg-[#0d1525] border-l border-white/10 flex flex-col animate-in slide-in-from-right duration-200">
      {/* Header */}
      <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-black tracking-widest uppercase text-white">Wybierz zawodnika</h2>
          <p className="text-xs text-white/40 tracking-wider">
            Pozycja: <span className="text-yellow-400 font-bold">{slotLabel}</span>
            {isGkSlot && <span className="ml-2 text-blue-400 text-[10px]">(tylko bramkarz)</span>}
          </p>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/60 hover:text-white transition-all"
        >
          ✕
        </button>
      </div>

      {/* Search */}
      <div className="px-4 pt-4 pb-2">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Szukaj zawodnika, klubu, kraju..."
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-yellow-400/50 focus:bg-white/8 transition-all"
          autoFocus
        />
      </div>

      {/* Position filter */}
      {!isGkSlot && (
        <div className="px-4 pb-3 flex gap-2 flex-wrap">
          {['ALL', 'GK', 'DEF', 'MID', 'FWD'].map((pos) => (
            <button
              key={pos}
              onClick={() => setFilterPos(pos)}
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border transition-all ${
                filterPos === pos
                  ? 'bg-yellow-400 text-black border-yellow-400'
                  : 'bg-white/5 text-white/50 border-white/10 hover:bg-white/10 hover:text-white'
              }`}
            >
              {pos === 'ALL' ? 'Wszyscy' : positionLabel[pos]}
            </button>
          ))}
        </div>
      )}

      {/* Player list */}
      <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-2 custom-scrollbar">
        {filtered.length === 0 && (
          <p className="text-center text-white/30 text-sm py-8">
            {validPlayers.length === 0 
              ? `Brak zawodników którzy mogą grać na pozycji ${slotLabel}`
              : 'Brak wyników wyszukiwania'}
          </p>
        )}
        
        {filtered.map((player) => {
          const isUsed = usedIds.has(player.id);
          const hasManyPositions = player.positions.length > 2;
          
          return (
            <button
              key={player.id}
              onClick={() => !isUsed && onSelect(player)}
              disabled={isUsed}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-all duration-150 text-left group
                ${isUsed
                  ? 'opacity-30 cursor-not-allowed border-white/5 bg-white/2'
                  : 'border-white/8 bg-white/4 hover:bg-white/10 hover:border-white/20 hover:scale-[1.01] cursor-pointer'
                }`}
            >
              {/* Avatar */}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl shrink-0 border overflow-hidden ${positionBg[player.primaryPosition]}`}>
                {player.image ? (
                  <img src={player.image} alt={player.name} className="w-full h-full object-cover" />
                ) : (
                  <span>{player.flag}</span>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white truncate leading-tight">{player.name}</p>
                <p className="text-xs text-white/40 truncate">{player.club} · {player.country}</p>
              </div>

              {/* Position badges z tooltipem */}
              <div className="relative shrink-0">
                <div className="flex gap-1">
                  {/* Pokazujemy pierwsze 2 pozycje */}
                  {player.positions.slice(0, 2).map(pos => (
                    <span key={pos} className={`text-[9px] font-black px-1.5 py-0.5 rounded border ${positionBg[slotToCategory[pos] || 'MID']}`}>
                      {pos}
                    </span>
                  ))}
                  
                  {/* Jeśli jest więcej niż 2 pozycje - pokazujemy +X z tooltipem */}
                  {hasManyPositions && (
                    <div className="group/tooltip relative">
                      <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-white/10 text-white/60 cursor-help block">
                        +{player.positions.length - 2}
                      </span>
                      {/* Tooltip - pojawia się na hover */}
                      <div className="absolute top-full right-0 mt-2 px-3 py-1.5 bg-gray-900/95 backdrop-blur rounded-lg text-[10px] font-bold whitespace-nowrap pointer-events-none opacity-0 group-hover/tooltip:opacity-100 transition-opacity z-50 shadow-xl border border-white/15">
                        <span className="text-white/60 text-[8px] uppercase tracking-wider mr-1">pozycje:</span>
                        {player.positions.join(' · ')}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 2px; }
      `}</style>
    </div>
  );
}