// src/components/RefereeMode.js
import React, { useState, useEffect, useCallback } from 'react';
import { getAllSquads, saveMatchResult, updateSquadStats } from '../services/squadService';
import CountryFlag from 'react-country-flag';
import { getCountryCode } from '../utils/countryCodes';

export default function RefereeMode({ isOpen, onClose, currentUser }) {
  const [step, setStep] = useState('loading');
  const [availableSquads, setAvailableSquads] = useState([]);
  const [squad1, setSquad1] = useState(null);
  const [squad2, setSquad2] = useState(null);
  const [comparisons, setComparisons] = useState([]);
  const [currentComparisonIndex, setCurrentComparisonIndex] = useState(0);
  const [scores, setScores] = useState({ squad1: 0, squad2: 0 });
  const [error, setError] = useState('');

  // Hierarchia pozycji do elastycznego dopasowania
  const positionHierarchy = {
    // Bramkarz - tylko GK
    'GK': ['GK'],
    
    // Obrońcy
    'RB': ['RB', 'RWB', 'RM'],
    'RWB': ['RWB', 'RB', 'RM'],
    'CB': ['CB', 'CDM'],
    'LB': ['LB', 'LWB', 'LM'],
    'LWB': ['LWB', 'LB', 'LM'],
    
    // Pomocnicy
    'CDM': ['CDM', 'CB', 'CM'],
    'CM': ['CM', 'CAM', 'CDM', 'RM', 'LM'],
    'CAM': ['CAM', 'CM', 'ST'],
    'RM': ['RM', 'RW', 'CM'],
    'LM': ['LM', 'LW', 'CM'],
    
    // Napastnicy
    'RW': ['RW', 'RM', 'ST'],
    'ST': ['ST', 'CAM', 'RW', 'LW'],
    'LW': ['LW', 'LM', 'ST']
  };

  // Kategorie pozycji dla punktacji
  const getCategory = (label) => {
    if (label === 'GK') return 'GK';
    if (['RB', 'LB', 'CB', 'RWB', 'LWB'].includes(label)) return 'DEF';
    if (['CM', 'CAM', 'CDM', 'RM', 'LM'].includes(label)) return 'MID';
    if (['ST', 'LW', 'RW'].includes(label)) return 'FWD';
    return 'MID';
  };

  const loadSquads = useCallback(async () => {
    setError('');
    try {
      const allSquads = await getAllSquads();
      const otherSquads = allSquads.filter(squad => {
        if (!currentUser) return true;
        return squad.userId !== currentUser.uid;
      });
      
      if (otherSquads.length < 2) {
        setError('Potrzebujesz co najmniej 2 składów innych użytkowników!');
        setStep('error');
      } else {
        setAvailableSquads(otherSquads);
        setStep('select');
      }
    } catch (err) {
      setError('Nie udało się załadować składów');
      setStep('error');
    }
  }, [currentUser]);

  useEffect(() => {
    if (isOpen) {
      loadSquads();
    }
  }, [isOpen, loadSquads]);

  const randomizeSquads = () => {
  if (availableSquads.length < 2) return;
  
  const shuffled = [...availableSquads];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  // 🔍 DODAJ TE LOGI
   console.log('=== LOSOWANIE SKŁADÓW ===');
   console.log('Skład 1:', shuffled[0]);
   console.log('Skład 1 ID:', shuffled[0].id);
   console.log('Skład 1 name:', shuffled[0].name);
   console.log('Skład 2:', shuffled[1]);
   console.log('Skład 2 ID:', shuffled[1].id);
   console.log('Skład 2 name:', shuffled[1].name);
  
    setSquad1(shuffled[0]);
    setSquad2(shuffled[1]);
   prepareComparison(shuffled[0].squad, shuffled[1].squad);
  };

  // Główna funkcja porównująca
  const prepareComparison = (squadData1, squadData2) => {
    // Kopie składów
    const players1 = { ...squadData1 };
    const players2 = { ...squadData2 };
    
    // 1. USUŃ IDENTYCZNYCH ZAWODNIKÓW
    const toRemove = [];
    Object.keys(players1).forEach(slotId1 => {
      const player1 = players1[slotId1];
      if (!player1) return;
      
      Object.keys(players2).forEach(slotId2 => {
        const player2 = players2[slotId2];
        if (player2 && player1.id === player2.id) {
          toRemove.push({ slotId1, slotId2 });
        }
      });
    });
    
    toRemove.forEach(({ slotId1, slotId2 }) => {
      delete players1[slotId1];
      delete players2[slotId2];
    });
    
    // 2. NAJPIERW BRAMKARZ (zawsze)
    const comparisonsList = [];
    let gk1 = null, gk1Slot = null;
    let gk2 = null, gk2Slot = null;
    
    Object.keys(players1).forEach(slot => {
      if (slot === 'GK') {
        gk1 = players1[slot];
        gk1Slot = slot;
      }
    });
    Object.keys(players2).forEach(slot => {
      if (slot === 'GK') {
        gk2 = players2[slot];
        gk2Slot = slot;
      }
    });
    
    if (gk1 && gk2) {
      comparisonsList.push({
        slotId1: gk1Slot,
        slotId2: gk2Slot,
        player1: gk1,
        player2: gk2,
        position: 'GK',
        category: 'GK',
        winner: null
      });
      delete players1[gk1Slot];
      delete players2[gk2Slot];
    }
    
    // 3. DOPASUJ POZYCJE IDEALNE (ST-ST, RW-RW, CB-CB itp.)
    const perfectMatches = [];
    Object.keys(players1).forEach(slotId1 => {
      if (!players1[slotId1]) return;
      Object.keys(players2).forEach(slotId2 => {
        if (!players2[slotId2]) return;
        if (slotId1 === slotId2) {
          perfectMatches.push({
            slotId1,
            slotId2,
            player1: players1[slotId1],
            player2: players2[slotId2],
            position: slotId1,
            category: getCategory(slotId1),
            winner: null
          });
        }
      });
    });
    
    perfectMatches.forEach(match => {
      comparisonsList.push(match);
      delete players1[match.slotId1];
      delete players2[match.slotId2];
    });
    
    // 4. DOPASUJ ELASTYCZNIE (na podstawie hierarchii pozycji)
    const flexibleMatches = [];
    const remainingSlots1 = Object.keys(players1);
    const remainingSlots2 = Object.keys(players2);
    
    for (const slotId1 of remainingSlots1) {
      if (!players1[slotId1]) continue;
      
      const possiblePositions = positionHierarchy[slotId1] || [slotId1];
      let bestMatch = null;
      let bestMatchSlot = null;
      let bestMatchPriority = 999;
      
      for (const slotId2 of remainingSlots2) {
        if (!players2[slotId2]) continue;
        if (flexibleMatches.some(m => m.slotId2 === slotId2)) continue;
        
        const matchPriority = possiblePositions.indexOf(slotId2);
        if (matchPriority !== -1 && matchPriority < bestMatchPriority) {
          bestMatch = players2[slotId2];
          bestMatchSlot = slotId2;
          bestMatchPriority = matchPriority;
        }
      }
      
      if (bestMatch) {
        flexibleMatches.push({
          slotId1,
          slotId2: bestMatchSlot,
          player1: players1[slotId1],
          player2: bestMatch,
          position: `${slotId1} → ${bestMatchSlot}`,
          category: getCategory(slotId1),
          winner: null
        });
        delete players1[slotId1];
        delete players2[bestMatchSlot];
      }
    }
    
    comparisonsList.push(...flexibleMatches);
    
    // 5. POZOSTAŁE (jeśli zostały, porównaj wg kategorii)
    const remaining1 = Object.values(players1);
    const remaining2 = Object.values(players2);
    const minLength = Math.min(remaining1.length, remaining2.length);
    
    for (let i = 0; i < minLength; i++) {
      comparisonsList.push({
        slotId1: `extra_${i}_1`,
        slotId2: `extra_${i}_2`,
        player1: remaining1[i],
        player2: remaining2[i],
        position: `${getCategory(remaining1[i]?.positions?.[0] || 'MID')} → ${getCategory(remaining2[i]?.positions?.[0] || 'MID')}`,
        category: getCategory(remaining1[i]?.positions?.[0] || 'MID'),
        winner: null
      });
    }
    
    setComparisons(comparisonsList);
    setCurrentComparisonIndex(0);
    setScores({ squad1: 0, squad2: 0 });
    setStep('compare');
  };

  const selectWinner = (winner) => {
    const updatedComparisons = [...comparisons];
    updatedComparisons[currentComparisonIndex].winner = winner;
    setComparisons(updatedComparisons);
    
    const newScores = { ...scores };
    if (winner === 'squad1') newScores.squad1++;
    if (winner === 'squad2') newScores.squad2++;
    setScores(newScores);
    
    if (currentComparisonIndex + 1 < comparisons.length) {
      setCurrentComparisonIndex(currentComparisonIndex + 1);
    } else {
      // Zapisz wynik meczu
      saveMatchResultAsync(newScores);
      setStep('result');
    }
  };

  const saveMatchResultAsync = async (finalScores) => {
  try {
    console.log('=== ZAPIS WYNIKU ===');
    console.log('squad1:', squad1);
    console.log('squad1.id:', squad1?.id);
    console.log('squad2:', squad2);
    console.log('squad2.id:', squad2?.id);
    console.log('Wynik:', finalScores);
    
    // Sprawdź czy ID istnieją
    if (!squad1?.id || !squad2?.id) {
      console.error('❌ BRAK ID SKŁADÓW! Nie mogę zapisać wyniku.');
      return;
    }
    
    const squad1Win = finalScores.squad1 > finalScores.squad2;
    const squad2Win = finalScores.squad2 > finalScores.squad1;
    const isDraw = finalScores.squad1 === finalScores.squad2;
    
    console.log('Zapisuję mecz...');
    await saveMatchResult({
      squad1Id: squad1.id,
      squad1Name: squad1.name,
      squad2Id: squad2.id,
      squad2Name: squad2.name,
      score1: finalScores.squad1,
      score2: finalScores.squad2,
      comparisons: comparisons.length
    });
    console.log('✅ Mecz zapisany');
    
    console.log('Aktualizuję statystyki składu 1...');
    if (squad1.id) await updateSquadStats(squad1.id, squad1Win, isDraw);
    console.log('✅ Statystyki składu 1 zaktualizowane');
    
    console.log('Aktualizuję statystyki składu 2...');
    if (squad2.id) await updateSquadStats(squad2.id, squad2Win, isDraw);
    console.log('✅ Statystyki składu 2 zaktualizowane');
    
    console.log('🎉 Wynik zapisany pomyślnie!');
    } catch (error) {
    console.error('❌ Błąd zapisu wyniku:', error);
    }
  };

  const reset = () => {
    setStep('select');
    setSquad1(null);
    setSquad2(null);
    setComparisons([]);
    setScores({ squad1: 0, squad2: 0 });
    setError('');
    loadSquads();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-[#0d1525] rounded-2xl w-full max-w-5xl max-h-[90vh] flex flex-col border border-white/10 m-4" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="text-xl font-bold text-white">⚖️ Zostań sędzią</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/60 hover:text-white">✕</button>
        </div>

        {/* Loading / Error / Select */}
        {step === 'loading' && (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center"><div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" /><p className="text-white">Ładowanie składów...</p></div>
          </div>
        )}

        {step === 'error' && (
          <div className="flex-1 flex flex-col items-center justify-center p-8">
            <div className="text-6xl mb-4">⚠️</div>
            <p className="text-red-400 mb-4">{error}</p>
            <button onClick={onClose} className="px-4 py-2 rounded-lg bg-yellow-400 text-black font-bold">Zamknij</button>
          </div>
        )}

        {step === 'select' && (
          <div className="flex-1 flex flex-col items-center justify-center p-8">
            <div className="text-center max-w-md">
              <div className="text-6xl mb-4">⚖️</div>
              <h3 className="text-xl font-bold text-white mb-2">Sędziuj mecz</h3>
              <p className="text-white/60 text-sm mb-6">System losowo wybierze dwa składy od innych użytkowników. Będziesz porównywać zawodników na tych samych pozycjach.</p>
              <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-lg p-3 mb-6"><p className="text-yellow-400 text-xs">⚠️ Nie możesz sędziować własnych składów</p></div>
              <button onClick={randomizeSquads} className="px-6 py-3 rounded-xl bg-yellow-400 text-black font-bold text-lg hover:bg-yellow-500 transition-all">🎲 Losuj składy</button>
            </div>
          </div>
        )}

        {/* Porównywanie - nowy układ */}
        {step === 'compare' && comparisons.length > 0 && (
          <div className="flex-1 overflow-y-auto p-4">
            <div className="mb-4">
              <div className="flex justify-between text-xs text-white/40 mb-1">
                <span>Porównanie {currentComparisonIndex + 1} z {comparisons.length}</span>
                <span>{Math.round((currentComparisonIndex / comparisons.length) * 100)}%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-1">
                <div className="bg-yellow-400 h-1 rounded-full transition-all duration-300" style={{ width: `${(currentComparisonIndex / comparisons.length) * 100}%` }} />
              </div>
            </div>

            <div className="flex justify-between gap-4 mb-6">
              <div className="flex-1 bg-white/5 rounded-lg p-3 text-center"><p className="text-xs text-white/40">{squad1?.name}</p><p className="text-2xl font-bold text-yellow-400">{scores.squad1}</p></div>
              <div className="flex items-center text-white/40 text-sm">VS</div>
              <div className="flex-1 bg-white/5 rounded-lg p-3 text-center"><p className="text-xs text-white/40">{squad2?.name}</p><p className="text-2xl font-bold text-yellow-400">{scores.squad2}</p></div>
            </div>

            {/* Porównanie - układ lewy vs prawy */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Zawodnik 1 - lewa strona */}
                <div 
                  onClick={() => selectWinner('squad1')}
                  className="bg-white/5 rounded-xl p-6 border-2 border-white/10 hover:border-yellow-400/50 hover:bg-white/10 transition-all cursor-pointer group"
                >
                      <div className="text-6xl mb-3 flex justify-center">
                        <CountryFlag 
                          countryCode={getCountryCode(comparisons[currentComparisonIndex].player1.country)} 
                          svg 
                          className="w-20 h-20 rounded-full object-cover" 
                        />
                      </div>
                    <p className="font-bold text-white text-xl">{comparisons[currentComparisonIndex].player1.name}</p>
                    <p className="text-sm text-white/40 mt-1">{comparisons[currentComparisonIndex].player1.country}</p>
                    <p className="text-xs text-white/30">{comparisons[currentComparisonIndex].player1.club || comparisons[currentComparisonIndex].player1.country}</p>
                    <div className="mt-3 inline-block px-3 py-1 bg-yellow-400/20 rounded-full text-xs text-yellow-400">
                      {comparisons[currentComparisonIndex].position.split(' → ')[0]}
                    </div>
                  </div>
                  <div className="mt-4 text-center opacity-0 group-hover:opacity-100 transition-all">
                    <span className="text-yellow-400 text-sm">👑 Kliknij aby wybrać</span>
                  </div>
                </div>

                {/* Zawodnik 2 - prawa strona */}
                <div 
                  onClick={() => selectWinner('squad2')}
                  className="bg-white/5 rounded-xl p-6 border-2 border-white/10 hover:border-yellow-400/50 hover:bg-white/10 transition-all cursor-pointer group"
                >
                  <div className="text-center">
                    <div className="text-6xl mb-3 flex justify-center">
                      <CountryFlag 
                        countryCode={getCountryCode(comparisons[currentComparisonIndex].player2.country)} 
                        svg 
                        className="w-16 h-16 rounded-full object-cover" 
                      />
                    </div>
                    <p className="font-bold text-white text-xl">{comparisons[currentComparisonIndex].player2.name}</p>
                    <p className="text-sm text-white/40 mt-1">{comparisons[currentComparisonIndex].player2.country}</p>
                    <p className="text-xs text-white/30">{comparisons[currentComparisonIndex].player2.club || comparisons[currentComparisonIndex].player2.country}</p>
                    <div className="mt-3 inline-block px-3 py-1 bg-yellow-400/20 rounded-full text-xs text-yellow-400">
                      {comparisons[currentComparisonIndex].position.split(' → ')[1] || comparisons[currentComparisonIndex].position}
                    </div>
                  </div>
                  <div className="mt-4 text-center opacity-0 group-hover:opacity-100 transition-all">
                    <span className="text-yellow-400 text-sm">👑 Kliknij aby wybrać</span>
                  </div>
                </div>
            </div>
        )}

        {/* Wynik końcowy */}
        {step === 'result' && (
          <div className="flex-1 flex flex-col items-center justify-center p-8">
            <div className="text-center max-w-md">
              <div className="text-6xl mb-4">🏆</div>
              <h3 className="text-2xl font-bold text-white mb-4">Wynik meczu</h3>
              <div className="flex justify-center gap-8 mb-6">
                <div className="text-center"><p className="text-xs text-white/40 mb-1">{squad1?.name}</p><p className="text-4xl font-bold text-yellow-400">{scores.squad1}</p></div>
                <div className="flex items-center text-2xl font-bold text-white/40">:</div>
                <div className="text-center"><p className="text-xs text-white/40 mb-1">{squad2?.name}</p><p className="text-4xl font-bold text-yellow-400">{scores.squad2}</p></div>
              </div>
              <div className={`text-lg font-bold mb-6 p-3 rounded-lg ${scores.squad1 > scores.squad2 ? 'bg-green-500/20 text-green-400' : scores.squad2 > scores.squad1 ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-white'}`}>
                {scores.squad1 > scores.squad2 ? `🏆 Wygrywa ${squad1?.name}!` : scores.squad2 > scores.squad1 ? `🏆 Wygrywa ${squad2?.name}!` : '🤝 Remis!'}
              </div>
              <div className="flex gap-3">
                <button onClick={reset} className="flex-1 px-4 py-2 rounded-lg bg-yellow-400 text-black font-bold hover:bg-yellow-500">🎲 Nowy mecz</button>
                <button onClick={onClose} className="flex-1 px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20">Zamknij</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}