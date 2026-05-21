// src/components/RankingModal.js
import React, { useState, useEffect, useCallback } from 'react';
import { getSquadRanking, getMatchHistory } from '../services/squadService';
import { PREDEFINED_CATEGORIES } from '../data/predefinedCategories';

export default function RankingModal({ isOpen, onClose, userCategories }) {
  const [ranking, setRanking] = useState([]);
  const [matches, setMatches] = useState([]);
  const [activeTab, setActiveTab] = useState('ranking');
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredRanking, setFilteredRanking] = useState([]);

  const allCategories = [
    { id: 'all', name: '🌍 Wszystkie kategorie', filter: null },
    ...PREDEFINED_CATEGORIES.map(cat => ({ ...cat, id: cat.name, filter: cat.filter })),
    ...(userCategories || []).map(cat => ({ ...cat, id: cat.name, filter: cat.filter }))
  ];

  // Funkcja filtrowania - użyj useCallback
  const filterRankingByCategory = useCallback(() => {
    if (!selectedCategory || !selectedCategory.filter) {
      setFilteredRanking(ranking);
      return;
    }
    
    const filtered = ranking.filter(squad => {
      const squadPlayers = Object.values(squad.squad || {});
      if (squadPlayers.length === 0) return false;
      return squadPlayers.every(player => selectedCategory.filter(player));
    });
    setFilteredRanking(filtered);
  }, [selectedCategory, ranking]);

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  // Dodaj zależność filterRankingByCategory
  useEffect(() => {
    filterRankingByCategory();
  }, [filterRankingByCategory]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [rankingData, matchesData] = await Promise.all([
        getSquadRanking(),
        getMatchHistory(30)
      ]);
      setRanking(rankingData);
      setMatches(matchesData);
      setFilteredRanking(rankingData);
    } catch (error) {
      console.error('Błąd ładowania:', error);
    }
    setLoading(false);
  };

  // Usuń nieużywaną funkcję getCategoryName

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-[#0d1525] rounded-2xl w-full max-w-2xl max-h-[80vh] flex flex-col border border-white/10 m-4" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="text-xl font-bold text-white">🏆 Ranking i statystyki</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 text-white/60">✕</button>
        </div>

        {/* Wybór kategorii */}
        <div className="p-4 border-b border-white/10">
          <label className="text-sm font-bold text-white/60 mb-2 block">Filtruj według kategorii:</label>
          <select
            value={selectedCategory?.id || 'all'}
            onChange={(e) => {
              if (e.target.value === 'all') {
                setSelectedCategory(null);
              } else {
                const cat = allCategories.find(c => c.id === e.target.value);
                setSelectedCategory(cat);
              }
            }}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm"
          >
            {allCategories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          {selectedCategory && (
            <p className="text-xs text-blue-400 mt-2">
              🔍 Pokazano składy spełniające kryteria: {selectedCategory.name}
            </p>
          )}
        </div>

        {/* Taby */}
        <div className="flex border-b border-white/10">
          <button
            onClick={() => setActiveTab('ranking')}
            className={`flex-1 py-3 text-sm font-bold uppercase tracking-wider transition-all ${
              activeTab === 'ranking'
                ? 'text-yellow-400 border-b-2 border-yellow-400'
                : 'text-white/40 hover:text-white/60'
            }`}
          >
            🏆 Ranking składów ({filteredRanking.length})
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-3 text-sm font-bold uppercase tracking-wider transition-all ${
              activeTab === 'history'
                ? 'text-yellow-400 border-b-2 border-yellow-400'
                : 'text-white/40 hover:text-white/60'
            }`}
          >
            📜 Historia meczów
          </button>
        </div>

        {/* Zawartość */}
        <div className="flex-1 overflow-y-auto p-4">
          {loading && (
            <div className="text-center py-8">
              <div className="w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
          )}

          {/* Ranking składów */}
          {activeTab === 'ranking' && !loading && (
            <div className="space-y-2">
              {filteredRanking.length === 0 ? (
                <p className="text-center text-white/30 py-8">
                  {selectedCategory ? `Brak składów spełniających kryteria "${selectedCategory.name}"` : 'Brak rozegranych meczów'}
                </p>
              ) : (
                filteredRanking.map((squad, index) => (
                  <div key={squad.id} className="bg-white/5 rounded-lg p-3 border border-white/10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                          index === 0 ? 'bg-yellow-400 text-black' :
                          index === 1 ? 'bg-gray-400 text-black' :
                          index === 2 ? 'bg-orange-600 text-white' :
                          'bg-white/10 text-white/60'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-bold text-white">{squad.name}</p>
                          <p className="text-[10px] text-white/40">
                            {squad.author || squad.userName || 'Anonim'} • {squad.formation}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-yellow-400">
                          {squad.stats?.wins || 0}W - {squad.stats?.draws || 0}R - {squad.stats?.losses || 0}P
                        </p>
                        <p className="text-[10px] text-white/40">
                          Mecze: {squad.stats?.matches || 0} • Win rate: {squad.winRate || 0}%
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Historia meczów */}
          {activeTab === 'history' && !loading && (
            <div className="space-y-3">
              {matches.length === 0 ? (
                <p className="text-center text-white/30 py-8">Brak rozegranych meczów</p>
              ) : (
                matches.map((match, index) => (
                  <div key={match.id} className="bg-white/5 rounded-lg p-3 border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-[10px] text-white/40">
                        {match.refereeName} • {match.createdAt ? new Date(match.createdAt.toDate()).toLocaleString() : 'Przed chwilą'}
                      </p>
                      {match.category && (
                        <span className="text-[8px] text-blue-400/70 px-1 py-0.5 bg-blue-500/20 rounded">
                          {match.category}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex-1 text-right">
                        <p className="font-bold text-white text-sm">{match.squad1Name}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xl font-bold text-yellow-400">
                          {match.score1} : {match.score2}
                        </p>
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-white text-sm">{match.squad2Name}</p>
                      </div>
                    </div>
                    <div className="text-center mt-2">
                      <span className={`text-xs px-2 py-1 rounded ${
                        match.score1 > match.score2 
                          ? 'bg-green-500/20 text-green-400'
                          : match.score2 > match.score1
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-white/10 text-white/60'
                      }`}>
                        {match.score1 > match.score2 
                          ? `🏆 Zwycięstwo ${match.squad1Name}` 
                          : match.score2 > match.score1
                          ? `🏆 Zwycięstwo ${match.squad2Name}`
                          : '🤝 Remis'}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}