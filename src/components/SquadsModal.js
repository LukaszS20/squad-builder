// src/components/SquadsModal.js
import React, { useState, useEffect } from 'react';
import { auth, signOut } from '../firebase';
import { getAllSquads, saveSquad, likeSquad, deleteSquad, getMySquads } from '../services/squadService';
import LoginModal from './LoginModal';

export default function SquadsModal({ isOpen, onClose, currentSquad, currentFormation, onLoadSquad }) {
  const [squads, setSquads] = useState([]);
  const [mySquads, setMySquads] = useState([]);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [squadName, setSquadName] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const [showMySquads, setShowMySquads] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isOpen) {
      loadSquads();
    }
  }, [isOpen]);

  useEffect(() => {
    if (user && showMySquads && isOpen) {
      loadMySquads();
    }
  }, [user, showMySquads, isOpen]);

  const loadSquads = async () => {
    setLoading(true);
    try {
      const data = await getAllSquads();
      setSquads(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const loadMySquads = async () => {
    setLoading(true);
    try {
      const data = await getMySquads();
      setMySquads(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    if (!squadName.trim()) {
      setError('Podaj nazwę składu');
      return;
    }
    
    if (!user) {
      setError('Musisz się zalogować aby zapisać skład');
      return;
    }
    
    const playersCount = Object.keys(currentSquad).length;
    if (playersCount === 0) {
      setError('Najpierw dodaj zawodników do składu!');
      return;
    }
    
    setSaving(true);
    setError('');
    
    try {
      const newSquad = {
        name: squadName,
        author: user.displayName || user.email,
        formation: currentFormation,
        squad: currentSquad,
        playersCount: playersCount
      };
      
      await saveSquad(newSquad);
      setShowSaveModal(false);
      setSquadName('');
      await loadSquads();
      if (showMySquads) await loadMySquads();
      alert('✅ Skład został zapisany!');
    } catch (error) {
      console.error('Błąd zapisu:', error);
      setError(error.message || 'Błąd zapisu. Spróbuj ponownie');
    }
    setSaving(false);
  };

  const handleDelete = async (squadId, squadUserId) => {
    if (!user) return;
    
    if (squadUserId !== user.uid) {
      alert('Możesz usuwać tylko swoje składy!');
      return;
    }
    
    if (window.confirm('Czy na pewno chcesz usunąć ten skład?')) {
      try {
        await deleteSquad(squadId, squadUserId);
        await loadSquads();
        await loadMySquads();
        alert('✅ Skład usunięty');
      } catch (error) {
        alert('Błąd usuwania: ' + error.message);
      }
    }
  };

  const handleLike = async (id, currentLikes) => {
    try {
      await likeSquad(id, currentLikes);
      await loadSquads();
      if (showMySquads) await loadMySquads();
    } catch (error) {
      console.error('Błąd like:', error);
    }
  };

  const displayedSquads = showMySquads ? mySquads : squads;

  if (!isOpen) return null;

  return (
    <>
      {/* Modal główny */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
        <div className="bg-[#0d1525] rounded-2xl w-full max-w-2xl max-h-[80vh] flex flex-col border border-white/10">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <h2 className="text-xl font-bold text-white">📋 Składy społeczności</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/60 hover:text-white transition-all"
            >
              ✕
            </button>
          </div>

          {/* Login i przyciski */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center">
                  <span className="text-sm">👤</span>
                </div>
                <span className="text-sm text-white/70">{user.email}</span>
                <button
                  onClick={async () => {
                    await signOut(auth);
                    setUser(null);
                  }}
                  className="text-xs px-3 py-1 rounded bg-red-500/20 text-red-400 hover:bg-red-500/30"
                >
                  Wyloguj
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="text-sm px-4 py-2 rounded bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
              >
                🔑 Zaloguj się
              </button>
            )}
            
            <div className="flex gap-2">
              <button
                onClick={() => setShowMySquads(false)}
                className={`px-3 py-1 rounded text-xs transition-all ${
                  !showMySquads 
                    ? 'bg-yellow-400 text-black' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                Wszystkie
              </button>
              <button
                onClick={() => {
                  setShowMySquads(true);
                  loadMySquads();
                }}
                className={`px-3 py-1 rounded text-xs transition-all ${
                  showMySquads 
                    ? 'bg-yellow-400 text-black' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                Moje składy
              </button>
              {user && (
                <button
                  onClick={() => {
                    if (Object.keys(currentSquad).length === 0) {
                      setError('Najpierw dodaj zawodników!');
                      return;
                    }
                    setShowSaveModal(true);
                  }}
                  className="px-3 py-1 rounded text-xs bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-all"
                >
                  💾 Zapisz obecny
                </button>
              )}
            </div>
          </div>

          {/* Lista składów */}
          <div className="flex-1 overflow-y-auto p-4">
            {loading && (
              <div className="text-center py-8">
                <div className="inline-block w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />
              </div>
            )}

            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 mb-4">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <div className="space-y-2">
              {displayedSquads.map((squad) => (
                <div key={squad.id} className="bg-white/5 rounded-lg p-3 border border-white/10 hover:bg-white/10 transition-all">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-bold text-white text-sm">{squad.name}</p>
                      <p className="text-[10px] text-white/40">
                        {squad.userName || squad.author} • {squad.formation} • {squad.playersCount || Object.keys(squad.squad || {}).length}/11
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          onLoadSquad(squad.squad, squad.formation);
                          onClose();
                        }}
                        className="text-[10px] px-2 py-1 rounded bg-yellow-400/20 text-yellow-400 hover:bg-yellow-400/30 transition-all"
                      >
                        🔄 Wczytaj
                      </button>
                      <button
                        onClick={() => handleLike(squad.id, squad.likes)}
                        className="text-[10px] px-2 py-1 rounded bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all flex items-center gap-1"
                      >
                        ❤️ {squad.likes || 0}
                      </button>
                      {user && squad.userId === user.uid && (
                        <button
                          onClick={() => handleDelete(squad.id, squad.userId)}
                          className="text-[10px] px-2 py-1 rounded bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all"
                        >
                          🗑️
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {displayedSquads.length === 0 && !loading && (
                <p className="text-center text-white/30 text-sm py-8">
                  {showMySquads ? 'Nie masz jeszcze zapisanych składów' : 'Brak składów. Bądź pierwszy! 🎉'}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal zapisu */}
      {showSaveModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0d1525] rounded-2xl p-6 w-full max-w-md border border-white/10">
            <h3 className="text-xl font-bold text-white mb-4">Zapisz swój skład</h3>
            
            <input
              type="text"
              value={squadName}
              onChange={(e) => setSquadName(e.target.value)}
              placeholder="Nazwa składu (np. 'Mistrzowski skład 2026')"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 mb-4 text-white placeholder-white/30 focus:outline-none focus:border-yellow-400/50"
              autoFocus
            />
            
            <div className="flex gap-3">
              <button
                onClick={handleSave}
                disabled={saving || !squadName.trim()}
                className="flex-1 py-2 rounded-lg bg-green-500 text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-600 transition-all"
              >
                {saving ? 'Zapisywanie...' : '💾 Zapisz'}
              </button>
              <button
                onClick={() => {
                  setShowSaveModal(false);
                  setError('');
                }}
                className="flex-1 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-all"
              >
                Anuluj
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal logowania */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={(user) => {
          setUser(user);
          loadSquads();
        }}
      />
    </>
  );
}