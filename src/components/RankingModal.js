// src/components/RankingModal.js
import React, { useState, useEffect } from 'react';
import { getSquadRanking, getMatchHistory } from '../services/squadService';

export default function RankingModal({ isOpen, onClose }) {
  const [ranking, setRanking] = useState([]);
  const [matches, setMatches] = useState([]);
  const [activeTab, setActiveTab] = useState('ranking'); // ranking, history
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [rankingData, matchesData] = await Promise.all([
        getSquadRanking(),
        getMatchHistory(30)
      ]);
      setRanking(rankingData);
      setMatches(matchesData);
    } catch (error) {
      console.error('Błąd ładowania:', error);
    }
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-[#0d1525] rounded-2xl w-full max-w-2xl max-h-[80vh] flex flex-col border border-white/10 m-4" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="text-xl font-bold text-white">🏆 Ranking i statystyki</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/60 hover:text-white transition-all"
          >
            ✕
          </button>
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
            🏆 Ranking składów
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
              {ranking.length === 0 ? (
                <p className="text-center text-white/30 py-8">Brak rozegranych meczów</p>
              ) : (
                ranking.map((squad, index) => (
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
                            {squad.author || squad.userName || 'Anonim'}
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