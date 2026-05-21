// src/components/GameBoard/hooks/usePlayerMovement.js
import { useState, useEffect, useRef, useCallback } from 'react';

export const usePlayerMovement = (
  turn, gameStatus, setGameStatus, setMovingPlayerId,
  setPlayers1, setPlayers2, squad1, squad2
) => {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [selectingDirection, setSelectingDirection] = useState(false);
  const [selectedAngle, setSelectedAngle] = useState(0);
  const [currentAngle, setCurrentAngle] = useState(0);
  const [chargingPower, setChargingPower] = useState(false);
  const [power, setPower] = useState(0);
  const [showArrow, setShowArrow] = useState(false);
  const [message, setMessage] = useState('');
  
  const angleIntervalRef = useRef(null);
  const powerIntervalRef = useRef(null);

  // Obrót strzałki
  useEffect(() => {
    if (selectingDirection) {
      angleIntervalRef.current = setInterval(() => {
        setCurrentAngle(prev => (prev + 3) % 360);
      }, 16);
    }
    return () => clearInterval(angleIntervalRef.current);
  }, [selectingDirection]);

  // Ładowanie siły
  useEffect(() => {
    if (chargingPower) {
      let increasing = true;
      let currentPower = 0;
      powerIntervalRef.current = setInterval(() => {
        if (increasing) {
          currentPower += 3;
          if (currentPower >= 100) {
            increasing = false;
          }
        } else {
          currentPower -= 3;
          if (currentPower <= 0) {
            increasing = true;
          }
        }
        setPower(currentPower);
      }, 20);
    }
    return () => clearInterval(powerIntervalRef.current);
  }, [chargingPower]);

  const handlePlayerClick = useCallback((player, team) => {
    if (team !== turn) {
      setMessage(`⏳ Teraz kolej ${turn === 1 ? squad1?.name : squad2?.name}!`);
      setTimeout(() => setMessage(''), 1500);
      return;
    }
    if (gameStatus !== 'playing') return;
    
    setSelectedPlayer(player);
    setSelectingDirection(true);
    setShowArrow(true);
    setCurrentAngle(0);
    setMessage(`🎯 Wybierz kierunek (kliknij K)`);
  }, [turn, gameStatus, squad1, squad2]);

    const executeMove = useCallback((player, angle, powerValue) => {
    const rad = (angle - 90) * Math.PI / 180;
    // BARDZO MAŁA PRĘDKOŚĆ
    const speed = 1.5 + (powerValue / 100) * 3;
    const vx = Math.cos(rad) * speed;
    const vy = Math.sin(rad) * speed;
    
    console.log(`Prędkość: ${speed.toFixed(2)}`);
    
    if (player.team === 1) {
        setPlayers1(prev => prev.map(p => 
        p.id === player.id ? { ...p, vx, vy } : p
        ));
    } else {
        setPlayers2(prev => prev.map(p => 
        p.id === player.id ? { ...p, vx, vy } : p
        ));
    }
    
    setMovingPlayerId(player.id);
    setSelectedPlayer(null);
    setGameStatus('moving');
    setPower(0);
    setMessage(`⚽ Ruch!`);
    setTimeout(() => setMessage(''), 1000);
    }, [setPlayers1, setPlayers2, setMovingPlayerId, setGameStatus]);

  // Obsługa klawiszy
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'KeyK') {
        e.preventDefault();
        
        if (selectingDirection && selectedPlayer) {
          setSelectingDirection(false);
          setSelectedAngle(currentAngle);
          setChargingPower(true);
          setMessage(`💪 Ładuj siłę (kliknij K ponownie)`);
        } 
        else if (chargingPower && selectedPlayer) {
          setChargingPower(false);
          executeMove(selectedPlayer, selectedAngle, power);
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectingDirection, chargingPower, selectedPlayer, power, currentAngle, selectedAngle, executeMove]);

  const canMove = gameStatus === 'playing' && !selectingDirection && !chargingPower;

  return {
    selectedPlayer,
    selectingDirection,
    selectedAngle,
    currentAngle,
    chargingPower,
    power,
    showArrow,
    message,
    canMove,
    handlePlayerClick
  };
};