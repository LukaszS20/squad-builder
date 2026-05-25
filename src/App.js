// App.js
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from 'react';
import Pitch from './components/Pitch';
import PlayerSelector from './components/PlayerSelector';
import StatsPanel from './components/StatsPanel';
import { loadPlayers, PLAYERS } from './data/players';
import { FORMATIONS } from './data/formations';
import SquadsModal from './components/SquadsModal';
import FormationsModal from './components/FormationsModal';
import { auth } from './firebase';
import RefereeMode from './components/RefereeMode';
import RankingModal from './components/RankingModal';
import GameBoard from './components/GameBoard/GameBoard';
import TeamSelect from './components/TeamSelect';
import CategoryBuilder from './components/CategoryBuilder';
import { PREDEFINED_CATEGORIES } from './data/predefinedCategories';
import CategoriesList from './components/CategoriesList';
import { getUserCategories } from './services/squadService';
import WelcomeSlider from './components/WelcomeSlider';

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
  const [isFormationsModalOpen, setIsFormationsModalOpen] = useState(false);
  const [isRefereeModeOpen, setIsRefereeModeOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isRankingOpen, setIsRankingOpen] = useState(false);
  const [isCategoryBuilderOpen, setIsCategoryBuilderOpen] = useState(false);
  const [savedCategories, setSavedCategories] = useState([]);
  const [showCategoriesList, setShowCategoriesList] = useState(false);
  const [showCategoryBuilder, setShowCategoryBuilder] = useState(false);
  const [gameStep, setGameStep] = useState(null); // null, 'select', 'playing'
  const [selectedSquad1, setSelectedSquad1] = useState(null);
  const [selectedSquad2, setSelectedSquad2] = useState(null);
  const ENABLE_GAME_MODE = false; // ustaw na false żeby wyłączyć grę
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [userCategories, setUserCategories] = useState([]); // kategorie użytkownika
  const [categoriesMode, setCategoriesMode] = useState('predefined'); // 'predefined' lub 'my'
  const [showWelcome, setShowWelcome] = useState(false);


  // Funkcja do ładowania kategorii z Firebase
  const loadUserCategories = useCallback(async () => {
    if (currentUser) {
      try {
        const categories = await getUserCategories();
        setUserCategories(categories);
        console.log('Załadowano kategorie z Firebase:', categories.length);
      } catch (error) {
        console.error('Błąd ładowania kategorii:', error);
        setUserCategories([]);
      }
    } else {
      setUserCategories([]);
    }
  }, [currentUser]);

  // Funkcja do wczytywania składu z kategorii 
  const handleLoadCategory = (players) => {
    console.log('Wczytuję skład z kategorii:', players);
  };

  // Funkcja do zapisywania nowej kategorii (wywoływana przez CategoryBuilder)
  const handleSaveUserCategory = (category) => {
    loadUserCategories();
    setShowCategoryBuilder(false);
  };

  // Funkcja wyboru kategorii (do filtrowania)
  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setCategoryFilter(() => category.filter);
    setShowCategoriesList(false);
  };

// Sprawdź czy użytkownik już widział powitanie
useEffect(() => {
  const hasSeenWelcome = localStorage.getItem('wc_welcome_seen');
  if (!hasSeenWelcome) {
    // Małe opóźnienie żeby strona się załadowała
    setTimeout(() => setShowWelcome(true), 500);
  }
}, []);

  // Wywołaj ładowanie kategorii po zalogowaniu
  useEffect(() => {
    loadUserCategories();
  }, [loadUserCategories]);

  // Predefiniowane kategorie - ładujemy raz na starcie
  useEffect(() => {
    // Predefiniowane kategorie są w pliku, nie potrzebują localStorage
    setSavedCategories(PREDEFINED_CATEGORIES);
  }, []);


  const handleStartGame = (squad1, squad2) => {
    console.log('Start gry z:', squad1?.name, squad2?.name);
    setSelectedSquad1(squad1);
    setSelectedSquad2(squad2);
    setGameStep('playing');
  };

  const handleBackToSelect = () => {
    setGameStep('select');
    setSelectedSquad1(null);
    setSelectedSquad2(null);
  };

  const handleLoadSquad = (loadedSquad, loadedFormation) => {
    setSquad(loadedSquad);
    setFormation(loadedFormation);
    setSelectingSlot(null);
    setSelectedSlotLabel('');
  };

  useEffect(() => {
    console.log('📢 gameStep zmienił się na:', gameStep);
  }, [gameStep]);

  // Nasłuchuj użytkownika
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

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
    <div className="min-h-screen w-full min-w-full bg-[#0a0f1a] text-white font-['Barlow_Condensed',sans-serif] overflow-x-hidden">
      <header className="border-b border-white/10 px-4 py-3 flex items-center justify-between bg-[#0d1525]">
        {/* Lewa strona - logo */}
        <div className="flex items-center gap-2">
          <span className="text-2xl">⚽</span>
          <div className="hidden sm:block">
            <h1 className="text-lg font-black tracking-widest uppercase text-yellow-400">
              World Cup
            </h1>
            <p className="text-[8px] tracking-[0.3em] text-white/40 uppercase">Squad Builder</p>
          </div>
        </div>

        {/* Środkowa część - przycisk formacji */}
        <button
          onClick={() => setIsFormationsModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-yellow-400/20 text-yellow-400 font-bold text-sm uppercase tracking-wider flex items-center gap-2"
        >
          <span>📐</span>
          <span>{formation}</span>
          <span>▼</span>
        </button>

        {/* Przycisk do otwierania trybu gry */}
        {ENABLE_GAME_MODE && (
        <button
          onClick={() => {
            console.log('🔵 Kliknięto Graj, ustawiam gameStep na "select"');
            setGameStep('select');
          }}
          className="px-3 py-2 rounded-lg text-sm font-bold bg-orange-500/20 text-orange-400 hover:bg-orange-500/30 transition-all flex items-center gap-2"
        >
          <span>🎮</span>
          <span className="hidden sm:inline">Graj</span>
        </button>
        )}


        {/* Przycisk - Kategorie podstawowe (Twoje) */}
        <button
          onClick={() => {
            setShowCategoriesList(true);
            setCategoriesMode('predefined');
          }}
          className="px-3 py-2 rounded-lg text-sm font-bold bg-teal-500/20 text-teal-400 hover:bg-teal-500/30 transition-all flex items-center gap-2"
        >
          <span>🏆</span>
          <span className="hidden sm:inline">Kategorie</span>
        </button>

        {/* Przycisk - Moje kategorie (tylko gdy zalogowany) */}
        {currentUser && (
          <button
            onClick={() => {
              setShowCategoriesList(true);
              setCategoriesMode('my');
            }}
            className="px-3 py-2 rounded-lg text-sm font-bold bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 transition-all flex items-center gap-2"
          >
            <span>📁</span>
            <span className="hidden sm:inline">Moje kategorie</span>
          </button>
        )}


        {/* Przycisk trybu sędziowskiego */}
        <button
          onClick={() => setIsRefereeModeOpen(true)}
          className="px-3 py-2 rounded-lg text-sm font-bold bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-all flex items-center gap-2"
        >
          <span>⚖️</span>
          <span className="hidden sm:inline">Sędziuj</span>
        </button>

        {/* Przycisk rankingu */}
        <button
          onClick={() => setIsRankingOpen(true)}
          className="px-3 py-2 rounded-lg text-sm font-bold bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-all flex items-center gap-2"
        >
          <span>🏆</span>
          <span className="hidden sm:inline">Ranking</span>
        </button>

        {/* Przycisk składów */}
        <button
          onClick={() => setIsSquadsModalOpen(true)}
          className="px-3 py-2 rounded-lg text-sm font-bold bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 transition-all flex items-center gap-2"
        >
          <span>📋</span>
          <span className="hidden sm:inline">Składy</span>
        </button>
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
            categoryFilter={categoryFilter} // kategorie filtrujące zawodników
          />
        )}
      </main>

      {/* Modale */}
      <SquadsModal
        isOpen={isSquadsModalOpen}
        onClose={() => setIsSquadsModalOpen(false)}
        currentSquad={squad}
        currentFormation={formation}
        onLoadSquad={handleLoadSquad}
      />

      {/* W App.js */}
      <RefereeMode
        isOpen={isRefereeModeOpen}
        onClose={() => setIsRefereeModeOpen(false)}
        currentUser={currentUser}
        userCategories={userCategories}
      />

      <RankingModal
        isOpen={isRankingOpen}
        onClose={() => setIsRankingOpen(false)}
        userCategories={userCategories}
      />

      <FormationsModal
        isOpen={isFormationsModalOpen}
        onClose={() => setIsFormationsModalOpen(false)}
        currentFormation={formation}
        onSelectFormation={handleFormationChange}
      />

      {/* Modal tworzenia kategorii */}
      {isCategoryBuilderOpen && (
        <CategoryBuilder 
          onSaveCategory={handleSaveUserCategory}
          onClose={() => setIsCategoryBuilderOpen(false)}
        />
      )}

      {/* Modal listy kategorii */}
      {showCategoriesList && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0d1525] rounded-2xl w-full max-w-2xl max-h-[80vh] flex flex-col border border-white/10 m-4">
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h2 className="text-xl font-bold text-white">📋 Moje kategorie</h2>
              <button onClick={() => setShowCategoriesList(false)} className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 text-white/60">✕</button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {savedCategories.length === 0 ? (
                <p className="text-center text-white/40 py-8">Nie masz jeszcze żadnych kategorii. Stwórz pierwszą!</p>
              ) : (
                <div className="space-y-3">
                  {savedCategories.map((cat, idx) => (
                    <div key={idx} className="bg-white/5 rounded-lg p-3 border border-white/10">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-white">{cat.name}</h3>
                          <p className="text-xs text-white/40">
                            {cat.players?.length || 0}/11 zawodników • {new Date(cat.createdAt).toLocaleDateString()}
                          </p>
                          <p className="text-[10px] text-white/30 mt-1">
                            Warunki: {cat.conditions?.length || 0}
                          </p>
                        </div>
                        <button
                          onClick={() => handleLoadCategory(cat.players)}
                          className="text-xs px-2 py-1 bg-yellow-400/20 text-yellow-400 rounded"
                        >
                          🔄 Wczytaj
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="p-4 border-t border-white/10">
              <button onClick={() => setShowCategoriesList(false)} className="w-full py-2 bg-white/10 rounded-lg text-white">
                Zamknij
              </button>
            </div>
          </div>
        </div>
      )}


      {/* Modal kategorii */}
      {showCategoriesList && (
        <CategoriesList 
          userCategories={userCategories || []}
          mode={categoriesMode}
          onSelectCategory={handleSelectCategory}
          onClose={() => setShowCategoriesList(false)}
          onCreateNew={() => {
            setShowCategoriesList(false);
            setShowCategoryBuilder(true);
          }}
          currentUser={currentUser}
        />
      )}

      {/* Modal kreatora kategorii */}
      {showCategoryBuilder && (
        <CategoryBuilder 
          onSaveCategory={handleSaveUserCategory}
          onClose={() => setShowCategoryBuilder(false)}
        />
      )}

      {/* Wybór składów do gry */}
      {ENABLE_GAME_MODE && gameStep === 'select' && (
        <TeamSelect 
          onStartGame={handleStartGame}
          onBack={() => setGameStep(null)}
        />
      )}

      {/* Modal powitalny */}
      {showWelcome && (
        <WelcomeSlider onClose={() => setShowWelcome(false)} />
      )}

      {/* Ekran gry */}
      {ENABLE_GAME_MODE && gameStep === 'playing' && selectedSquad1 && selectedSquad2 && (
        <div className="fixed inset-0 z-50 bg-black/95 overflow-y-auto">
          <GameBoard 
            squad1={selectedSquad1}
            squad2={selectedSquad2}
            onBack={handleBackToSelect}
          />
        </div>
      )}
    </div>
  );
}