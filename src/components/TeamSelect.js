// src/components/TeamSelect.js
import React, { useState, useEffect } from 'react';
import { getAllSquads } from '../services/squadService';

export default function TeamSelect({ onStartGame, onBack }) {
  const [squads, setSquads] = useState([]);
  const [selectedSquad1, setSelectedSquad1] = useState(null);
  const [selectedSquad2, setSelectedSquad2] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSquads = async () => {
      try {
        const allSquads = await getAllSquads();
        setSquads(allSquads);
      } catch (error) {
        console.error('Błąd ładowania składów:', error);
      } finally {
        setLoading(false);
      }
    };
    loadSquads();
    // ⚠️ NIE MA onBack() tutaj!
  }, []);

  const handleStart = () => {
    if (selectedSquad1 && selectedSquad2) {
      onStartGame(selectedSquad1, selectedSquad2);
    }
  };

  // ⚠️ NIE WYWOŁUJEMY onBack() automatycznie!

  return (
    <div className="fixed inset-0 z-50 bg-black/95 overflow-y-auto p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-[#0d1525] rounded-2xl p-6 border border-white/10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white">⚽ Wybierz składy</h2>
            <button
              onClick={() => onBack()} // ⚠️ TYLKO TUTAJ jest onBack
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 text-white"
            >
              ✕
            </button>
          </div>

          {loading ? (
            <div className="text-center py-8 text-white">Ładowanie składów...</div>
          ) : squads.length === 0 ? (
            <div className="text-center py-8 text-yellow-400">
              Brak zapisanych składów. Najpierw utwórz i zapisz jakiś skład!
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {/* Gracz 1 */}
              <div className="bg-white/5 rounded-xl p-4">
                <h3 className="text-lg font-bold text-blue-400 mb-3">🔵 Gracz 1 (Niebiescy)</h3>
                <select
                  value={selectedSquad1?.id || ''}
                  onChange={(e) => {
                    const squad = squads.find(s => s.id === e.target.value);
                    setSelectedSquad1(squad);
                  }}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                >
                  <option value="">-- Wybierz skład --</option>
                  {squads.map(squad => (
                    <option key={squad.id} value={squad.id}>
                      {squad.name} ({squad.formation}) - {squad.author || 'Anonim'}
                    </option>
                  ))}
                </select>
                {selectedSquad1 && (
                  <div className="mt-2 text-xs text-white/40">
                    Zawodnicy: {Object.keys(selectedSquad1.squad || {}).length}/11
                  </div>
                )}
              </div>

              {/* Gracz 2 */}
              <div className="bg-white/5 rounded-xl p-4">
                <h3 className="text-lg font-bold text-red-400 mb-3">🔴 Gracz 2 (Czerwoni)</h3>
                <select
                  value={selectedSquad2?.id || ''}
                  onChange={(e) => {
                    const squad = squads.find(s => s.id === e.target.value);
                    setSelectedSquad2(squad);
                  }}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                >
                  <option value="">-- Wybierz skład --</option>
                  {squads.map(squad => (
                    <option key={squad.id} value={squad.id}>
                      {squad.name} ({squad.formation}) - {squad.author || 'Anonim'}
                    </option>
                  ))}
                </select>
                {selectedSquad2 && (
                  <div className="mt-2 text-xs text-white/40">
                    Zawodnicy: {Object.keys(selectedSquad2.squad || {}).length}/11
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={() => onBack()}
              className="px-6 py-2 bg-white/10 rounded-lg text-white hover:bg-white/20"
            >
              Anuluj
            </button>
            <button
              onClick={handleStart}
              disabled={!selectedSquad1 || !selectedSquad2 || loading}
              className={`px-6 py-2 rounded-lg font-bold ${
                selectedSquad1 && selectedSquad2 && !loading
                  ? 'bg-yellow-400 text-black hover:bg-yellow-500'
                  : 'bg-white/20 text-white/50 cursor-not-allowed'
              }`}
            >
              Rozpocznij mecz! ⚽
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}