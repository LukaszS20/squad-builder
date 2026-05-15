// src/components/SquadsList.js
import React, { useState, useEffect } from 'react';
import { auth, googleProvider, signInWithPopup, signOut } from '../firebase';
import { getAllSquads, saveSquad, likeSquad, deleteSquad, getMySquads } from '../services/squadService';

export default function SquadsList({ currentSquad, currentFormation, onLoadSquad }) {
  const [squads, setSquads] = useState([]);
  const [mySquads, setMySquads] = useState([]);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [squadName, setSquadName] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const [showMySquads, setShowMySquads] = useState(false);

  useEffect(() => {
    // Nasłuchuj zmian logowania
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    loadSquads();
  }, []);

  useEffect(() => {
    if (user && showMySquads) {
      loadMySquads();
    }
  }, [user, showMySquads]);

  const loadSquads = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getAllSquads();
      setSquads(data);
    } catch (err) {
      console.error('Błąd ładowania:', err);
      setError('Nie udało się załadować składów');
    }
    setLoading(false);
  };

  const loadMySquads = async () => {
    setLoading(true);
    try {
      const data = await getMySquads();
      setMySquads(data);
    } catch (err) {
      console.error('Błąd ładowania moich składów:', err);
    }
    setLoading(false);
  };

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Błąd logowania:', error);
      setError('Nie udało się zalogować');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setShowMySquads(false);
    } catch (error) {
      console.error('Błąd wylogowania:', error);
    }
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
        author: authorName.trim() || user.displayName || user.email,
        formation: currentFormation,
        squad: currentSquad,
        playersCount: playersCount
      };
      
      await saveSquad(newSquad);
      setShowSaveModal(false);
      setSquadName('');
      setAuthorName('');
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

  return (
    <div className="relative">
      {/* Login/Logout button */}
      <div className="flex items-center gap-2 mb-3">
        {user ? (
          <div className="flex items-center gap-2">
            <img src={user.photoURL} alt="" className="w-6 h-6 rounded-full" />
            <span className="text-xs text-white/70">{user.displayName || user.email}</span>
            <button
              onClick={handleLogout}
              className="text-xs px-2 py-1 rounded bg-red-500/20 text-red-400 hover:bg-red-500/30"
            >
              Wyloguj
            </button>
            <button
              onClick={() => {
                setShowMySquads(!showMySquads);
                if (!showMySquads) loadMySquads();
              }}
              className={`text-xs px-2 py-1 rounded transition-all ${
                showMySquads 
                  ? 'bg-yellow-400 text-black' 
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {showMySquads ? 'Wszystkie' : 'Moje składy'}
            </button>
          </div>
        ) : (
          <button
            onClick={handleLogin}
            className="text-xs px-3 py-1 rounded bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-all"
          >
            🔑 Zaloguj przez Google
          </button>
        )}
      </div>

      {/* Zapisz skład */}
      <button
        onClick={() => {
          if (!user) {
            setError('Zaloguj się aby zapisać skład');
            return;
          }
          if (Object.keys(currentSquad).length === 0) {
            setError('Najpierw dodaj zawodników!');
            return;
          }
          setShowSaveModal(true);
        }}
        className={`w-full py-2 rounded-lg font-bold text-sm uppercase tracking-wider transition-all
          ${user && Object.keys(currentSquad).length > 0 
            ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:scale-105 shadow-lg shadow-green-500/20' 
            : 'bg-gray-600 text-gray-300 cursor-not-allowed'
          }`}
      >
        💾 Zapisz ten skład
      </button>

      {/* Lista składów */}
      <div className="mt-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-white/50 mb-3">
          📋 {showMySquads ? 'Moje składy' : 'Składy społeczności'} ({displayedSquads.length})
        </h3>
        
        {loading && (
          <div className="text-center py-4">
            <div className="inline-block w-6 h-6 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-2 mb-3">
            <p className="text-red-400 text-xs">{error}</p>
          </div>
        )}

        <div className="space-y-2 max-h-96 overflow-y-auto">
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
                    onClick={() => onLoadSquad(squad.squad, squad.formation)}
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
                      🗑️ Usuń
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {displayedSquads.length === 0 && !loading && !error && (
            <p className="text-center text-white/30 text-sm py-4">
              {showMySquads ? 'Nie masz jeszcze zapisanych składów' : 'Brak składów. Bądź pierwszy! 🎉'}
            </p>
          )}
        </div>
      </div>

      {/* Modal zapisu */}
      {showSaveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0d1525] rounded-2xl p-6 w-full max-w-md border border-white/10">
            <h3 className="text-xl font-bold text-white mb-4">Zapisz swój skład</h3>
            
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-2 mb-3">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}
            
            <input
              type="text"
              value={squadName}
              onChange={(e) => setSquadName(e.target.value)}
              placeholder="Nazwa składu (np. 'Mistrzowski skład 2026')"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 mb-3 text-white placeholder-white/30 focus:outline-none focus:border-yellow-400/50"
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
    </div>
  );
}