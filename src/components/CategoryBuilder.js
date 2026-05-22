// src/components/CategoryBuilder.js
import React, { useState, useEffect, useCallback } from 'react';
import { PLAYERS } from '../data/players';
import { saveUserCategory } from '../services/squadService';

export default function CategoryBuilder({ onSaveCategory, onClose }) {
  const [categoryName, setCategoryName] = useState('');
  const [conditions, setConditions] = useState([]);
  const [previewPlayers, setPreviewPlayers] = useState([]);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
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
      'Chelsea': 'Premier League', 'Manchester United': 'Premier League', 'Tottenham': 'Premier League',
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
    
    conditionTypes.forEach(c => {
      if (c.id === 'league') c.options = leagues;
      if (c.id === 'country') c.options = countries;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Dodaj warunek
  const addCondition = () => {
    setConditions([...conditions, { id: Date.now(), type: 'age_max', value: '' }]);
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

  // Oblicz podgląd (ilu zawodników spełnia warunki)
  const updatePreview = useCallback(() => {
    let filtered = [...PLAYERS];
    
    conditions.forEach(cond => {
      if (!cond.value) return;
      
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
        case 'league':
          filtered = filtered.filter(p => extractLeague(p.club) === cond.value);
          break;
        default:
          break;
      }
    });
    
    setPreviewPlayers(filtered);
  }, [conditions]);

  // Aktualizuj podgląd przy zmianie warunków
  useEffect(() => {
    updatePreview();
  }, [updatePreview]);

  // Zbuduj funkcję filtra na podstawie warunków
  const buildFilterFunction = useCallback(() => {
    return (player) => {
      for (const cond of conditions) {
        if (!cond.value) continue;
        
        switch(cond.type) {
          case 'age_max':
            if ((player.age || 0) > parseFloat(cond.value)) return false;
            break;
          case 'age_min':
            if ((player.age || 0) < parseFloat(cond.value)) return false;
            break;
          case 'height_max':
            if ((player.height || 0) > parseFloat(cond.value)) return false;
            break;
          case 'height_min':
            if ((player.height || 0) < parseFloat(cond.value)) return false;
            break;
          case 'foot':
            if (player.foot !== cond.value) return false;
            break;
          case 'country':
            if (player.country !== cond.value) return false;
            break;
          case 'position':
            if (player.primaryPosition !== cond.value) return false;
            break;
          case 'league':
            if (extractLeague(player.club) !== cond.value) return false;
            break;
          default:
            break;
        }
      }
      return true;
    };
  }, [conditions]);

  // ZAPIS DO FIREBASE
  const handleSave = async () => {
    if (!categoryName.trim()) {
      setError('Podaj nazwę kategorii');
      return;
    }
    if (conditions.length === 0) {
      setError('Dodaj przynajmniej jeden warunek');
      return;
    }
    
    setSaving(true);
    setError('');
    
    try {
      const filterFunction = buildFilterFunction();
      
      const newCategory = {
        name: categoryName,
        filter: filterFunction.toString(),
        conditions: conditions,
        createdAt: new Date().toISOString()
      };
      
      await saveUserCategory(newCategory);
      onSaveCategory(newCategory);
      onClose();
    } catch (error) {
      setError('Błąd zapisu: ' + error.message);
    }
    setSaving(false);
  };

  const getConditionType = (typeId) => {
    return conditionTypes.find(t => t.id === typeId);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="bg-[#0d1525] rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col border border-white/10 m-4">
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
              <p className="text-white/30 text-xs text-center py-4">Dodaj warunki, aby zdefiniować kategorię</p>
            )}
          </div>

          {/* Podgląd */}
          {conditions.length > 0 && (
            <div className="mb-4">
              <h3 className="text-sm font-bold text-white/60 mb-2">Podgląd: pasujący zawodnicy ({previewPlayers.length})</h3>
              <div className="max-h-32 overflow-y-auto space-y-1 bg-white/5 rounded-lg p-2">
                {previewPlayers.slice(0, 10).map(p => (
                  <div key={p.id} className="flex items-center gap-2 text-xs">
                    <span>{p.flag}</span>
                    <span className="text-white">{p.name}</span>
                    <span className="text-white/40">{p.age} lat</span>
                    <span className="text-white/40">{p.height} cm</span>
                    <span className="text-yellow-400/70">{p.value}</span>
                  </div>
                ))}
                {previewPlayers.length > 10 && <p className="text-white/30 text-xs">... i {previewPlayers.length - 10} więcej</p>}
              </div>
            </div>
          )}
        </div>

        {error && <div className="mx-4 mb-2 text-red-400 text-sm">{error}</div>}

        <div className="flex gap-3 p-4 border-t border-white/10">
          <button onClick={onClose} className="flex-1 py-2 bg-white/10 rounded-lg text-white">Anuluj</button>
          <button onClick={handleSave} disabled={saving || conditions.length === 0} className="flex-1 py-2 bg-green-500 text-white rounded-lg font-bold disabled:opacity-50">
            {saving ? 'Zapisywanie...' : '💾 Zapisz kategorię'}
          </button>
        </div>
      </div>
    </div>
  );
}