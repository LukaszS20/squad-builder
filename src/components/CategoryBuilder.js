// src/components/CategoryBuilder.js
import React, { useState, useEffect } from 'react';
import { PLAYERS } from '../data/players';

export default function CategoryBuilder({ onSaveCategory, onClose }) {
  const [categoryName, setCategoryName] = useState('');
  const [conditions, setConditions] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [error, setError] = useState('');
  const [conditionTypes] = useState([
    { id: 'age_max', label: 'Wiek ≤', type: 'number', unit: 'lat' },
    { id: 'age_min', label: 'Wiek ≥', type: 'number', unit: 'lat' },
    { id: 'height_max', label: 'Wzrost ≤', type: 'number', unit: 'cm' },
    { id: 'height_min', label: 'Wzrost ≥', type: 'number', unit: 'cm' },
    { id: 'value_max', label: 'Wartość ≤', type: 'number', unit: 'M €' },
    { id: 'value_min', label: 'Wartość ≥', type: 'number', unit: 'M €' },
    { id: 'foot', label: 'Noga', type: 'select', options: ['Right', 'Left', 'Both'] },
    { id: 'league', label: 'Liga', type: 'select', options: [] },
    { id: 'country', label: 'Kraj', type: 'select', options: [] },
    { id: 'position', label: 'Pozycja', type: 'select', options: ['GK', 'DEF', 'MID', 'FWD'] }
  ]);

  const extractLeague = (club) => {
    const leagues = {
      'Liverpool': 'Premier League', 'Manchester City': 'Premier League', 'Arsenal': 'Premier League',
      'Real Madryt': 'La Liga', 'Barcelona': 'La Liga', 'Atletico Madryt': 'La Liga',
      'Bayern Monachium': 'Bundesliga', 'Borussia Dortmund': 'Bundesliga',
      'PSG': 'Ligue 1', 'AC Milan': 'Serie A', 'Inter Mediolan': 'Serie A', 'Juventus': 'Serie A'
    };
    return leagues[club] || 'Inna';
  };

  // Pobierz unikalne ligi i kraje z danych
  useEffect(() => {
    const leagues = [...new Set(PLAYERS.map(p => extractLeague(p.club)))].filter(Boolean);
    const countries = [...new Set(PLAYERS.map(p => p.country))].filter(Boolean);
    
    // Aktualizuj conditionTypes z opcjami - to jest OK, nie trzeba używać zmiennej
    conditionTypes.forEach(c => {
      if (c.id === 'league') c.options = leagues;
      if (c.id === 'country') c.options = countries;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Dodaj warunek
  const addCondition = () => {
    setConditions([...conditions, { id: Date.now(), type: 'age_max', value: '', operator: '<=' }]);
  };

  // Usuń warunek
  const removeCondition = (id) => {
    setConditions(conditions.filter(c => c.id !== id));
  };

  // Aktualizuj warunek
  const updateCondition = (id, field, value) => {
    setConditions(conditions.map(c => 
      c.id === id ? { ...c, [field]: value } : c
    ));
  };

  // Filtruj zawodników
  const applyFilters = () => {
    let filtered = [...PLAYERS];
    
    conditions.forEach(cond => {
      switch(cond.type) {
        case 'age_max':
          filtered = filtered.filter(p => (p.age || 0) <= parseFloat(cond.value));
          break;
        case 'age_min':
          filtered = filtered.filter(p => (p.age || 0) >= parseFloat(cond.value));
          break;
        case 'height_max':
          filtered = filtered.filter(p => (p.height || 0) <= parseFloat(cond.value));
          break;
        case 'height_min':
          filtered = filtered.filter(p => (p.height || 0) >= parseFloat(cond.value));
          break;
        case 'foot':
          filtered = filtered.filter(p => p.foot === cond.value);
          break;
        case 'country':
          filtered = filtered.filter(p => p.country === cond.value);
          break;
        case 'position':
          filtered = filtered.filter(p => p.primaryPosition === cond.value);
          break;
        default:
          // domyślnie nie filtruj
          break;
      }
    });
    
    setFilteredPlayers(filtered);
    return filtered;
  };

  // Wybierz najlepszą jedenastkę
  const selectBestEleven = () => {
    const filtered = applyFilters();
    
    // Wybierz najlepszych według wartości rynkowej
    const sorted = [...filtered].sort((a, b) => {
      const valA = parseFloat(a.value) || 0;
      const valB = parseFloat(b.value) || 0;
      return valB - valA;
    });
    
    // Podział na pozycje
    const gk = sorted.filter(p => p.primaryPosition === 'GK').slice(0, 1);
    const def = sorted.filter(p => p.primaryPosition === 'DEF').slice(0, 4);
    const mid = sorted.filter(p => p.primaryPosition === 'MID').slice(0, 4);
    const fwd = sorted.filter(p => p.primaryPosition === 'FWD').slice(0, 2);
    
    const best11 = [...gk, ...def, ...mid, ...fwd];
    setSelectedPlayers(best11);
  };

  const handleSave = () => {
    if (!categoryName.trim()) {
      setError('Podaj nazwę kategorii');
      return;
    }
    if (selectedPlayers.length === 0) {
      setError('Najpierw wybierz zawodników');
      return;
    }
    
    onSaveCategory({
      name: categoryName,
      players: selectedPlayers,
      conditions: conditions,
      createdAt: new Date().toISOString()
    });
    onClose();
  };

  // Pobierz typ warunku po ID
  const getConditionType = (typeId) => {
    return conditionTypes.find(t => t.id === typeId);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="bg-[#0d1525] rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col border border-white/10 m-4">
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="text-xl font-bold text-white">🏆 Tworzenie kategorii</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 text-white/60">✕</button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {/* Nazwa kategorii */}
          <div className="mb-4">
            <label className="block text-sm font-bold text-white/60 mb-1">Nazwa kategorii</label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="np. Najlepsza 11 młodych zawodników"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
            />
          </div>

          {/* Warunki */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-bold text-white/60">Warunki filtrowania</label>
              <button onClick={addCondition} className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded">+ Dodaj warunek</button>
            </div>
            
            <div className="space-y-2">
              {conditions.map(cond => {
                const condType = getConditionType(cond.type);
                return (
                  <div key={cond.id} className="flex items-center gap-2 bg-white/5 rounded-lg p-2">
                    <select
                      value={cond.type}
                      onChange={(e) => updateCondition(cond.id, 'type', e.target.value)}
                      className="bg-white/10 border border-white/20 rounded px-2 py-1 text-sm text-white"
                    >
                      {conditionTypes.map(type => (
                        <option key={type.id} value={type.id}>{type.label}</option>
                      ))}
                    </select>
                    
                    {condType?.type === 'select' ? (
                      <select
                        value={cond.value}
                        onChange={(e) => updateCondition(cond.id, 'value', e.target.value)}
                        className="bg-white/10 border border-white/20 rounded px-2 py-1 text-sm text-white flex-1"
                      >
                        <option value="">-- Wybierz --</option>
                        {condType.options?.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    ) : (
                      <div className="flex items-center gap-1 flex-1">
                        <input
                          type="number"
                          value={cond.value}
                          onChange={(e) => updateCondition(cond.id, 'value', e.target.value)}
                          placeholder="wartość"
                          className="bg-white/10 border border-white/20 rounded px-2 py-1 text-sm text-white w-24"
                        />
                        <span className="text-white/40 text-xs">{condType?.unit}</span>
                      </div>
                    )}
                    
                    <button onClick={() => removeCondition(cond.id)} className="text-red-400 text-sm">✕</button>
                  </div>
                );
              })}
            </div>
            {conditions.length === 0 && (
              <p className="text-white/30 text-xs text-center py-4">Dodaj warunki, aby filtrować zawodników</p>
            )}
          </div>

          {/* Przyciski akcji */}
          <div className="flex gap-2 mb-4">
            <button onClick={applyFilters} className="flex-1 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30">
              🔍 Pokaż pasujących zawodników
            </button>
            <button onClick={selectBestEleven} className="flex-1 py-2 bg-yellow-400/20 text-yellow-400 rounded-lg hover:bg-yellow-400/30">
              ⭐ Wybierz najlepszą 11
            </button>
          </div>

          {/* Lista pasujących zawodników */}
          {filteredPlayers.length > 0 && (
            <div className="mb-4">
              <h3 className="text-sm font-bold text-white/60 mb-2">Pasujący zawodnicy ({filteredPlayers.length})</h3>
              <div className="max-h-40 overflow-y-auto space-y-1 bg-white/5 rounded-lg p-2">
                {filteredPlayers.slice(0, 20).map(p => (
                  <div key={p.id} className="flex items-center gap-2 text-xs">
                    <span>{p.flag}</span>
                    <span className="text-white">{p.name}</span>
                    <span className="text-white/40">{p.age} lat</span>
                    <span className="text-white/40">{p.height} cm</span>
                    <span className="text-yellow-400/70">{p.value}</span>
                  </div>
                ))}
                {filteredPlayers.length > 20 && <p className="text-white/30 text-xs">... i {filteredPlayers.length - 20} więcej</p>}
              </div>
            </div>
          )}

          {/* Wybrana jedenastka */}
          {selectedPlayers.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-white/60 mb-2">Wybrana jedenastka ({selectedPlayers.length}/11)</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {selectedPlayers.map(p => (
                  <div key={p.id} className="bg-white/5 rounded-lg p-2 text-center">
                    <span className="text-2xl">{p.flag}</span>
                    <p className="text-xs font-bold text-white">{p.name}</p>
                    <p className="text-[10px] text-white/40">{p.primaryPosition}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {error && <div className="mx-4 mb-2 text-red-400 text-sm">{error}</div>}

        <div className="flex gap-3 p-4 border-t border-white/10">
          <button onClick={onClose} className="flex-1 py-2 bg-white/10 rounded-lg text-white">Anuluj</button>
          <button onClick={handleSave} className="flex-1 py-2 bg-green-500 text-white rounded-lg font-bold">💾 Zapisz kategorię</button>
        </div>
      </div>
    </div>
  );
}