// src/components/GameBoard/hooks/useGameSetup.js
import { useState, useEffect } from 'react';
import { FORMATIONS } from '../../../data/formations';

const rotateFormation = (slots) => {
  return slots.map(slot => ({
    ...slot,
    row: slot.col,
    col: slot.row
  }));
};

const drawTeam = (squad, teamNumber, isLeftSide, boardWidth, boardHeight) => {
  if (!squad || !squad.squad) return [];
  
  const formationData = FORMATIONS[squad.formation];
  if (!formationData) return [];
  
  const rotatedSlots = rotateFormation(formationData.slots);
  const playersList = [];
  
  rotatedSlots.forEach((slot) => {
    const player = squad.squad[slot.id];
    if (!player) return;
    
    const marginY = 40;
    const yPos = marginY + (slot.row / 100) * (boardHeight - marginY * 2);
    const maxX = boardWidth / 2 - 50;
    const xOffset = (slot.col / 100) * maxX;
    const xPos = isLeftSide ? 35 + xOffset : boardWidth - 35 - xOffset;
    
    playersList.push({
      id: `${player.id}_${teamNumber}`,
      originalId: player.id,
      name: player.name,
      x: xPos,
      y: yPos,
      team: teamNumber,
      r: 18,
      position: slot.label,
      vx: 0, vy: 0
    });
  });
  
  return playersList;
};

export const useGameSetup = (squad1, squad2, boardWidth, boardHeight) => {
  const [players1, setPlayers1] = useState([]);
  const [players2, setPlayers2] = useState([]);
  const [ball, setBall] = useState({ x: boardWidth / 2, y: boardHeight / 2, r: 10 });
  const [score, setScore] = useState({ team1: 0, team2: 0 });

  useEffect(() => {
    const players1List = drawTeam(squad1, 1, true, boardWidth, boardHeight);
    const players2List = drawTeam(squad2, 2, false, boardWidth, boardHeight);
    
    setPlayers1(players1List);
    setPlayers2(players2List);
  }, [squad1, squad2, boardWidth, boardHeight]);

  return { players1, setPlayers1, players2, setPlayers2, ball, setBall, score, setScore };
};