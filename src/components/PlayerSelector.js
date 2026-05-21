// src/components/PlayerSelector.js
import React, { useState, useRef, useEffect } from 'react';
import CountryFlag from 'react-country-flag';
import { getCountryCode } from '../utils/countryCodes';

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

// Komponent SmartTooltip
function SmartTooltip({ children, content }) {
  const [position, setPosition] = useState('top');
  const triggerRef = useRef(null);
  const tooltipRef = useRef(null);

  useEffect(() => {
    const checkPosition = () => {
      if (triggerRef.current && tooltipRef.current) {
        const triggerRect = triggerRef.current.getBoundingClientRect();
        const tooltipRect = tooltipRef.current.getBoundingClientRect();
        const spaceAbove = triggerRect.top;
        const spaceBelow = window.innerHeight - triggerRect.bottom;
        if (spaceAbove < tooltipRect.height && spaceBelow > spaceAbove) {
          setPosition('bottom');
        } else {
          setPosition('top');
        }
      }
    };
    const trigger = triggerRef.current;
    if (trigger) {
      trigger.addEventListener('mouseenter', checkPosition);
      return () => trigger.removeEventListener('mouseenter', checkPosition);
    }
  }, [content]);

  return (
    <div className="relative inline-block" ref={triggerRef}>
      <div className="cursor-help">{children}</div>
      <div 
        ref={tooltipRef}
        className={`absolute z-50 px-3 py-1.5 bg-gray-900/95 backdrop-blur rounded-lg text-[10px] font-bold whitespace-nowrap shadow-xl border border-white/15 pointer-events-none transition-opacity duration-150 opacity-0 group-hover/tooltip:opacity-100
          ${position === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'}`}
      >
        <span className="text-white/60 text-[8px] uppercase tracking-wider mr-1">pozycje:</span>
        {content}
      </div>
    </div>
  );
}

export default function PlayerSelector({ players, usedIds, slotLabel, onSelect, onClose, categoryFilter }) {
  const [search, setSearch] = useState('');
  const [filterPos, setFilterPos] = useState('ALL');
  const [filterCountry, setFilterCountry] = useState('ALL');
  const [filterClub, setFilterClub] = useState('ALL');
  
  const isGkSlot = slotLabel === 'GK';
  
  // Filtruj zawodników którzy mogą grać na danej pozycji
  const getValidPlayersForSlot = () => {
    let valid = [];
    
    if (isGkSlot) {
      valid = players.filter(p => p.positions.includes('GK'));
    } else {
      valid = players.filter(player => {
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
    }
    
    // Zastosuj filtr kategorii jeśli istnieje
    if (categoryFilter) {
      valid = valid.filter(categoryFilter);
    }
    
    return valid;
  };
  
  const validPlayers = getValidPlayersForSlot();
  
  // Pobierz unikalne kraje i kluby z dostępnych zawodników
  const getUniqueCountries = () => {
    const countries = new Set();
    validPlayers.forEach(p => countries.add(p.country));
    return Array.from(countries).sort();
  };
  
  const getUniqueClubs = () => {
    const clubs = new Set();
    validPlayers.forEach(p => clubs.add(p.club || p.country));
    return Array.from(clubs).sort();
  };
  
  const uniqueCountries = getUniqueCountries();
  const uniqueClubs = getUniqueClubs();
  
  // Ostateczne filtrowanie (wyszukiwanie, pozycja, kraj, klub)
  const filtered = validPlayers.filter((p) => {
    const matchSearch = search === '' || 
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.country.toLowerCase().includes(search.toLowerCase()) ||
      (p.club && p.club.toLowerCase().includes(search.toLowerCase()));
    
    const matchPos = filterPos === 'ALL' || p.primaryPosition === filterPos;
    const matchCountry = filterCountry === 'ALL' || p.country === filterCountry;
    const matchClub = filterClub === 'ALL' || (p.club && p.club === filterClub);
    
    return matchSearch && matchPos && matchCountry && matchClub;
  });

  // Resetuj filtry przy zmianie slotu
  useEffect(() => {
    setFilterPos('ALL');
    setFilterCountry('ALL');
    setFilterClub('ALL');
    setSearch('');
  }, [slotLabel]);

  return (
    <div className="w-full lg:w-[500px] bg-[#0d1525] border-l border-white/10 flex flex-col animate-in slide-in-from-right duration-200">
      {/* Header */}
      <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between sticky top-0 bg-[#0d1525] z-10">
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
      <div className="px-4 pt-4 pb-2 sticky top-[73px] bg-[#0d1525] z-10">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍 Szukaj po nazwie, kraju lub klubie..."
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-yellow-400/50 focus:bg-white/8 transition-all"
          autoFocus
        />
      </div>

      {/* Filtry */}
      <div className="px-4 pb-3 space-y-2 sticky top-[125px] bg-[#0d1525] z-10">
        {/* Filtr pozycji */}
        {!isGkSlot && (
          <div className="flex gap-2 flex-wrap">
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
        
        {/* Filtr kraju */}
        {uniqueCountries.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] text-white/40 uppercase tracking-wider">🌍 Kraj:</span>
            <select
              value={filterCountry}
              onChange={(e) => setFilterCountry(e.target.value)}
              className="text-xs bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-white focus:outline-none focus:border-yellow-400/50"
            >
              <option value="ALL">Wszystkie kraje</option>
              {uniqueCountries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>
        )}
        
        {/* Filtr klubu */}
        {uniqueClubs.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] text-white/40 uppercase tracking-wider">🏟️ Klub:</span>
            <select
              value={filterClub}
              onChange={(e) => setFilterClub(e.target.value)}
              className="text-xs bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-white focus:outline-none focus:border-yellow-400/50"
            >
              <option value="ALL">Wszystkie kluby</option>
              {uniqueClubs.map(club => (
                <option key={club} value={club}>{club}</option>
              ))}
            </select>
          </div>
        )}
        
        {/* Przycisk reset filtrów */}
        {(filterPos !== 'ALL' || filterCountry !== 'ALL' || filterClub !== 'ALL' || search !== '') && (
          <button
            onClick={() => {
              setFilterPos('ALL');
              setFilterCountry('ALL');
              setFilterClub('ALL');
              setSearch('');
            }}
            className="text-[10px] px-2 py-1 rounded bg-white/10 text-white/60 hover:bg-white/20 transition-all"
          >
            ✕ Resetuj filtry
          </button>
        )}
      </div>

      {/* Player list */}
      <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-2 custom-scrollbar">
        <div className="text-xs text-white/40 px-2 py-1">
          Znaleziono: {filtered.length} zawodników
        </div>
        
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
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-all duration-150 text-left
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
                  <CountryFlag 
                    countryCode={getCountryCode(player.country)} 
                    svg 
                    className="w-full h-full rounded-full object-cover scale-150" 
                  />
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white truncate leading-tight">{player.name}</p>
                <div className="flex flex-wrap items-center gap-x-1 gap-y-0.5 text-[10px] text-white/40">
                  <span>{player.club || player.country}</span>
                  <span className="text-[8px]">•</span>
                  <span>{player.country}</span>
                  {player.age && (
                    <>
                      <span className="text-[8px]">•</span>
                      <span>🎂 {player.age} lat</span>
                    </>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 text-[9px] text-white/30 mt-0.5">
                  {player.height && (
                    <span className="flex items-center gap-0.5">
                      📏 {player.height} cm
                    </span>
                  )}
                  {player.foot && (
                    <span className="flex items-center gap-0.5">
                      {player.foot === 'Right' && '🦶 Prawa'}
                      {player.foot === 'Left' && '🦶 Lewa'}
                      {player.foot === 'Both' && '🦶 Obie'}
                    </span>
                  )}
                  {player.value && (
                    <span className="flex items-center gap-0.5">
                      💰 {player.value}
                    </span>
                  )}
                </div>
              </div>

              {/* Position badges */}
              <div className="flex gap-1 shrink-0">
                {player.positions.slice(0, 2).map(pos => (
                  <span key={pos} className={`text-[9px] font-black px-1.5 py-0.5 rounded border ${positionBg[slotToCategory[pos] || 'MID']}`}>
                    {pos}
                  </span>
                ))}
                
                {hasManyPositions && (
                  <SmartTooltip content={player.positions.join(' · ')}>
                    <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-white/10 text-white/60">
                      +{player.positions.length - 2}
                    </span>
                  </SmartTooltip>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 2px; }
        select option { background: #0d1525; color: white; }
      `}</style>
    </div>
  );
}