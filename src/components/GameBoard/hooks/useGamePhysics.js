// src/components/GameBoard/hooks/useGamePhysics.js
import { useEffect, useRef } from 'react';

export const useGamePhysics = (
  gameStatus, movingPlayerId, setMovingPlayerId, setGameStatus, setTurn,
  players1Ref, players2Ref, setPlayers1, setPlayers2,
  boardWidth, boardHeight, turn
) => {
  const requestRef = useRef(null);

  useEffect(() => {
    if (gameStatus !== 'moving' || !movingPlayerId) return;

    let isStopped = false; // Lokalna flaga, bezpieczniejsza niż ref

    const animate = () => {
      if (isStopped) return;

      // Sprawdzamy, w której drużynie jest zawodnik
      const isTeam1 = players1Ref.current.some(p => p.id === movingPlayerId);
      const isTeam2 = players2Ref.current.some(p => p.id === movingPlayerId);

      if (!isTeam1 && !isTeam2) {
        setMovingPlayerId(null);
        setGameStatus('playing');
        return;
      }

      const setPlayers = isTeam1 ? setPlayers1 : setPlayers2;

      // Wykonujemy matematykę BEZPOŚREDNIO wewnątrz settera (prev).
      // Dzięki temu eliminujemy opóźnienia między refem a stanem – zero "skoków"!
      setPlayers(prev => {
        const newPlayers = [...prev];
        const playerIndex = newPlayers.findIndex(p => p.id === movingPlayerId);
        
        if (playerIndex === -1) return prev;

        const player = newPlayers[playerIndex];

        // WARUNEK ZATRZYMANIA
        if (Math.abs(player.vx) < 0.05 && Math.abs(player.vy) < 0.05) {
          if (!isStopped) {
            isStopped = true;
            
            // Timeout pozwala wykonać te akcje po zakończeniu renderowania Reacta,
            // zapobiegając błędom asynchroniczności
            setTimeout(() => {
              console.log('🛑 ZATRZYMANIE PŁYNNE - koniec animacji');
              setMovingPlayerId(null);
              setGameStatus('playing');
              setTurn(turn === 1 ? 2 : 1);
            }, 0);
          }
          
          // Ustawiamy prędkość na 0, ale ZOSTAWIAMY dokładne X i Y (bez skoku!)
          newPlayers[playerIndex] = { ...player, vx: 0, vy: 0 };
          return newPlayers;
        }

        // 1. Obliczamy pozycję na podstawie PRECYZYJNEGO bieżącego stanu
        let newX = player.x + player.vx;
        let newY = player.y + player.vy;

        // 2. Aplikujemy tarcie (zwalnianie)
        let newVx = player.vx * 0.96;
        let newVy = player.vy * 0.96;

        // 3. Odbicia od krawędzi boiska z utratą energii (0.3)
        if (newX < player.r) {
          newX = player.r;
          newVx = -newVx * 0.3;
        } else if (newX > boardWidth - player.r) {
          newX = boardWidth - player.r;
          newVx = -newVx * 0.3;
        }

        if (newY < player.r) {
          newY = player.r;
          newVy = -newVy * 0.3;
        } else if (newY > boardHeight - player.r) {
          newY = boardHeight - player.r;
          newVy = -newVy * 0.3;
        }

        // 4. Zapisujemy nową klatkę animacji
        newPlayers[playerIndex] = { ...player, x: newX, y: newY, vx: newVx, vy: newVy };
        return newPlayers;
      });

      // Jeśli się nie zatrzymał, prosimy przeglądarkę o kolejną, płynną klatkę
      if (!isStopped) {
        requestRef.current = requestAnimationFrame(animate);
      }
    };

    // Odpalamy pierwszą klatkę animacji
    requestRef.current = requestAnimationFrame(animate);

    // Czyszczenie po zakończeniu ruchu
    return () => {
      isStopped = true;
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [
    gameStatus, movingPlayerId, boardWidth, boardHeight, turn,
    players1Ref, players2Ref, setMovingPlayerId, setGameStatus,
    setTurn, setPlayers1, setPlayers2
  ]);
};