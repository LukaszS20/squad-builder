// App.js
import React, { useState, useEffect } from 'react';
import Pitch from './components/Pitch';
import PlayerSelector from './components/PlayerSelector';
import StatsPanel from './components/StatsPanel';
import { loadPlayers, PLAYERS } from './data/players';
import { FORMATIONS } from './data/formations';
import SquadsModal from './components/SquadsModal';

const STORAGE_KEY = 'wc_squad_builder';

export default function App() {
  const [formation, setFormation] = useState('4-3-3');
  const [squad, setSquad] = useState({});
  const [selectingSlot, setSelectingSlot] = useState(null);
  const [selectedSlotLabel, setSelectedSlotLabel] = useState('');
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState({ current: 0, total: 0, team: '' });
  const [isSquadsModalOpen, setIsSquadsModalOpen] = useState(false);

  const handleLoadSquad = (loadedSquad, loadedFormation) => {
    setSquad(loadedSquad);
    setFormation(loadedFormation);
    setSelectingSlot(null);
    setSelectedSlotLabel('');
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      const onProgress = (current, total, team) => {
        setLoadProgress({ current, total, team });
      };
      await loadPlayers(onProgress);
      setPlayers([...PLAYERS]);
      setLoading(false);
    };
    init();
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setSquad(parsed.squad || {});
        setFormation(parsed.formation || '4-3-3');
      }
    } catch (e) {}
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ squad, formation }));
  }, [squad, formation]);

  const handleSlotClick = (slotId) => {
    const slots = FORMATIONS[formation]?.slots || [];
    const slot = slots.find(s => s.id === slotId);
    setSelectedSlotLabel(slot?.label || '');
    setSelectingSlot(slotId);
  };

  const handleSelectPlayer = (player) => {
    if (!selectingSlot) return;
    const newSquad = Object.fromEntries(
      Object.entries(squad).filter(([, p]) => p.id !== player.id)
    );
    newSquad[selectingSlot] = player;
    setSquad(newSquad);
    setSelectingSlot(null);
    setSelectedSlotLabel('');
  };

  const handleRemovePlayer = (slotId) => {
    const newSquad = { ...squad };
    delete newSquad[slotId];
    setSquad(newSquad);
  };

  const handleFormationChange = (f) => {
    setFormation(f);
    setSquad({});
    setSelectingSlot(null);
    setSelectedSlotLabel('');
  };

  const usedPlayerIds = new Set(Object.values(squad).map((p) => p.id));

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white text-lg font-bold">Ładowanie zawodników...</p>
          {loadProgress.total > 0 && (
            <>
              <p className="text-white/60 text-sm mt-2">
                {loadProgress.current} / {loadProgress.total} drużyn
              </p>
              <p className="text-yellow-400 text-xs mt-1">
                Pobieranie: {loadProgress.team}
              </p>
              <div className="w-64 h-1 bg-white/10 rounded-full mt-3 mx-auto overflow-hidden">
                <div 
                  className="h-full bg-yellow-400 rounded-full transition-all duration-300"
                  style={{ width: `${(loadProgress.current / loadProgress.total) * 100}%` }}
                />
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white font-['Barlow_Condensed',sans-serif]">
      {/* Header */}
      <header className="border-b border-white/10 px-6 py-3 flex items-center justify-between bg-[#0d1525]">
        {/* Lewa strona - logo */}
        <div className="flex items-center gap-3">
          <span className="text-2xl">⚽</span>
          <div>
            <h1 className="text-xl font-black tracking-widest uppercase text-yellow-400">
              World Cup
            </h1>
            <p className="text-[9px] tracking-[0.3em] text-white/40 uppercase">Squad Builder</p>
          </div>
        </div>

        {/* Prawa strona - formacje i skład społeczności */}
        <div className="flex items-center gap-4">
          {/* Przycisk otwierający modal składów */}
          <button
            onClick={() => setIsSquadsModalOpen(true)}
            className="px-3 py-1.5 rounded-lg text-sm font-bold bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 transition-all flex items-center gap-2"
          >
            📋 Składy
          </button>

          {/* Selektor formacji */}
          <div className="flex items-center gap-3">
            <span className="text-white/40 text-xs uppercase tracking-widest hidden sm:inline">Formation</span>
            <div className="flex gap-1">
              {Object.keys(FORMATIONS).map((f) => (
                <button
                  key={f}
                  onClick={() => handleFormationChange(f)}
                  className={`px-3 py-1 rounded text-xs font-bold tracking-wider uppercase transition-all duration-200 ${
                    formation === f
                      ? 'bg-yellow-400 text-black shadow-[0_0_20px_rgba(250,204,21,0.4)]'
                      : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="flex flex-col lg:flex-row gap-0 min-h-[calc(100vh-57px)]">
        <div className="flex-1 flex flex-col items-center justify-start py-6 px-4">
          <Pitch
            formation={formation}
            squad={squad}
            onSlotClick={handleSlotClick}
            onRemovePlayer={handleRemovePlayer}
            selectingSlot={selectingSlot}
          />
          <StatsPanel squad={squad} />
        </div>

        {selectingSlot && (
          <PlayerSelector
            players={players}
            usedIds={usedPlayerIds}
            slotLabel={selectedSlotLabel}
            onSelect={handleSelectPlayer}
            onClose={() => {
              setSelectingSlot(null);
              setSelectedSlotLabel('');
            }}
          />
        )}
      </main>

      {/* Modal składów */}
      <SquadsModal
        isOpen={isSquadsModalOpen}
        onClose={() => setIsSquadsModalOpen(false)}
        currentSquad={squad}
        currentFormation={formation}
        onLoadSquad={handleLoadSquad}
      />
    </div>
  );
}