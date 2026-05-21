// src/components/GameBoard/GameBoard.js
import React, { useState, useRef } from 'react';
import { DrawPitch } from './DrawPitch';
import { DrawPlayers } from './DrawPlayers';
import { DrawBall } from './DrawBall';
import { ArrowIndicator } from './ArrowIndicator';
import { ScoreHeader } from './ScoreHeader';
import { useGameSetup } from './hooks/useGameSetup';
import { useGamePhysics } from './hooks/useGamePhysics';
import { usePlayerMovement } from './hooks/usePlayerMovement';

export default function GameBoard({ squad1, squad2, onBack }) {
  const boardWidth = 1000;
  const boardHeight = 600;
  
  const { players1, setPlayers1, players2, setPlayers2, ball } = 
    useGameSetup(squad1, squad2, boardWidth, boardHeight);
  
  const [turn, setTurn] = useState(1);
  const [gameStatus, setGameStatus] = useState('playing');
  const [movingPlayerId, setMovingPlayerId] = useState(null);
  
  const players1Ref = useRef(players1);
  const players2Ref = useRef(players2);
  
  // Synchronizacja refów
  React.useEffect(() => {
    players1Ref.current = players1;
  }, [players1]);
  React.useEffect(() => {
    players2Ref.current = players2;
  }, [players2]);
  
  const { selectedPlayer, selectingDirection, selectedAngle, currentAngle, chargingPower, power, showArrow, message, canMove, handlePlayerClick } = 
    usePlayerMovement(turn, gameStatus, setGameStatus, setMovingPlayerId, setPlayers1, setPlayers2, squad1, squad2);
  
  useGamePhysics(
    gameStatus, movingPlayerId, setMovingPlayerId, setGameStatus, setTurn,
    players1Ref, players2Ref, setPlayers1, setPlayers2,
    boardWidth, boardHeight, turn
  );
  
  const displayAngle = selectingDirection ? currentAngle : selectedAngle;
  const isPlayerSelected = (player) => selectedPlayer?.id === player.id;

  return (
    <div className="min-h-screen bg-[#0a0f1a] p-4 flex flex-col items-center">
      <ScoreHeader 
        squad1={squad1}
        squad2={squad2}
        score={{ team1: 0, team2: 0 }}
        turn={turn}
        message={message}
        chargingPower={chargingPower}
        power={power}
      />

      <div className="relative mx-auto bg-gradient-to-b from-green-700 to-green-800 rounded-xl overflow-hidden shadow-2xl" style={{ width: boardWidth, height: boardHeight }}>
        <DrawPitch boardWidth={boardWidth} boardHeight={boardHeight} />
        
        <DrawPlayers 
          players={players1} 
          color="blue" 
          turn={turn} 
          canMove={canMove} 
          selectedPlayer={selectedPlayer}
          onPlayerClick={handlePlayerClick}
          isSelected={isPlayerSelected}
        />
        
        <DrawPlayers 
          players={players2} 
          color="red" 
          turn={turn} 
          canMove={canMove} 
          selectedPlayer={selectedPlayer}
          onPlayerClick={handlePlayerClick}
          isSelected={isPlayerSelected}
        />
        
        <DrawBall ball={ball} />
        
        {showArrow && selectedPlayer && (
          <ArrowIndicator player={selectedPlayer} angle={displayAngle} />
        )}
      </div>

      <div className="text-center mt-6">
        <button onClick={onBack} className="px-6 py-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-all">
          ← Powrót
        </button>
      </div>

        <div className="text-center mt-4 text-white/40 text-xs">
          <p>🎮 1️⃣ Kliknij na zawodnika</p>
          <p>🎮 2️⃣ Naciśnij K, gdy strzałka wskazuje pożądany kierunek</p>
          <p>🎮 3️⃣ Ponownie naciśnij K, gdy siła jest odpowiednia</p>
        </div>
    </div>
  );
}