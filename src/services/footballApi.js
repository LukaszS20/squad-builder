// src/services/footballApi.js
import axios from 'axios';

const BASE_URL = '/api/football';

// LISTA REPREZENTACJI (z poprawnymi nazwami do wyszukania)
const WORLD_CUP_TEAMS = [
  'Argentina', 'Brazil', 'France', 'Germany', 'Spain', 'England',
  'Portugal', 'Netherlands', 'Belgium', 'Croatia', 'Italy',
  'Mexico', 'USA', 'Japan', 'South Korea', 'Australia',
  'Poland', 'Switzerland', 'Denmark', 'Sweden', 'Ukraine'
];

// Flagi
const getFlag = (country) => {
  const flags = {
    'Argentina': '🇦🇷', 'Brazil': '🇧🇷', 'France': '🇫🇷',
    'Germany': '🇩🇪', 'Spain': '🇪🇸', 'England': '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    'Portugal': '🇵🇹', 'Netherlands': '🇳🇱', 'Belgium': '🇧🇪',
    'Croatia': '🇭🇷', 'Italy': '🇮🇹', 'Mexico': '🇲🇽',
    'USA': '🇺🇸', 'Japan': '🇯🇵', 'South Korea': '🇰🇷',
    'Australia': '🇦🇺', 'Poland': '🇵🇱', 'Switzerland': '🇨🇭',
    'Denmark': '🇩🇰', 'Sweden': '🇸🇪', 'Ukraine': '🇺🇦'
  };
  return flags[country] || '🏆';
};

// Szukaj TYLKO reprezentacji (nie klubów!)
const searchNationalTeam = async (teamName) => {
  try {
    // Szukaj drużyny z limitem do reprezentacji
    const response = await axios.get(`${BASE_URL}/teams?search=${encodeURIComponent(teamName)}&limit=10`);
    const teams = response.data.teams || [];
    
    // Filtruj TYLKO reprezentacje (area.type === 'nation' lub 'National')
    const nationalTeam = teams.find(t => 
      t.name.toLowerCase() === teamName.toLowerCase() &&
      (t.area?.type === 'nation' || t.type === 'National' || t.name.includes('National'))
    );
    
    // Jeśli nie znaleziono, spróbuj bez filtru
    if (!nationalTeam) {
      return teams.find(t => t.name.toLowerCase() === teamName.toLowerCase());
    }
    
    return nationalTeam;
  } catch (error) {
    console.log(`  Błąd wyszukiwania: ${error.message}`);
    return null;
  }
};

// Pobierz skład reprezentacji
const getTeamSquad = async (teamId) => {
  try {
    const response = await axios.get(`${BASE_URL}/teams/${teamId}`);
    return response.data.squad || [];
  } catch (error) {
    console.log(`  Błąd pobierania składu: ${error.message}`);
    return [];
  }
};

// Lepsze mapowanie pozycji
const mapPosition = (position) => {
  const positionMap = {
    'Goalkeeper': ['GK'],
    'Defence': ['CB'],
    'Midfield': ['CM'],
    'Offence': ['ST']
  };
  return positionMap[position] || ['MID'];
};

const mapPrimaryPosition = (position) => {
  const positionMap = {
    'Goalkeeper': 'GK',
    'Defence': 'DEF',
    'Midfield': 'MID',
    'Offence': 'FWD'
  };
  return positionMap[position] || 'MID';
};

// GŁÓWNA FUNKCJA
export const fetchAllWorldCupPlayers = async (onProgress) => {
  const allPlayers = [];
  const total = WORLD_CUP_TEAMS.length;
  let playerId = 1;
  let successCount = 0;
  const uniquePlayerIds = new Set(); // Zapobieganie duplikatom
  
  console.log(`🚀 Football-data.org: Ładowanie ${total} reprezentacji...`);
  console.log(`⏱️ Limit: 10 zapytań/minutę = 6 sekund między zapytaniami\n`);
  
  for (let i = 0; i < total; i++) {
    const teamName = WORLD_CUP_TEAMS[i];
    
    if (onProgress) {
      onProgress(i + 1, total, teamName);
    }
    
    console.log(`[${i+1}/${total}] ${teamName}...`);
    
    try {
      const team = await searchNationalTeam(teamName);
      
      if (team && team.id) {
        const squad = await getTeamSquad(team.id);
        console.log(`  ✅ ${squad.length} zawodników`);
        successCount++;
        
        for (const player of squad) {
          // Zapobieganie duplikatom po ID zawodnika
          if (!uniquePlayerIds.has(player.id)) {
            uniquePlayerIds.add(player.id);
            
            // Pełne imię i nazwisko
            const fullName = player.name;
            const shirtNumber = player.shirtNumber || 0;
            
            allPlayers.push({
              id: playerId++,
              name: fullName,
              positions: mapPosition(player.position),
              primaryPosition: mapPrimaryPosition(player.position),
              country: teamName,
              club: team.name,
              flag: getFlag(teamName),
              image: null,
              number: shirtNumber
            });
          }
        }
      } else {
        console.log(`  ❌ Nie znaleziono reprezentacji ${teamName}`);
      }
    } catch (error) {
      console.log(`  ❌ Błąd: ${error.message}`);
    }
    
    // Opóźnienie 6 sekund
    if (i < total - 1) {
      console.log(`  ⏳ Czekam 6 sekund...`);
      await new Promise(resolve => setTimeout(resolve, 6000));
    }
  }
  
  console.log(`\n📊 PODSUMOWANIE:`);
  console.log(`  ✅ Udane: ${successCount}/${total} reprezentacji`);
  console.log(`  👥 Łącznie zawodników: ${allPlayers.length}`);
  console.log(`  📊 Bez duplikatów: ${uniquePlayerIds.size} unikalnych ID`);
  
  return allPlayers;
};

// Funkcje cache
export const savePlayersToCache = (players) => {
  localStorage.setItem('cached_players', JSON.stringify(players));
  localStorage.setItem('cached_players_date', new Date().toISOString());
  console.log(`💾 Zapisano ${players.length} zawodników w cache`);
};

export const getPlayersFromCache = () => {
  const cached = localStorage.getItem('cached_players');
  if (cached) {
    const players = JSON.parse(cached);
    console.log(`📦 Wczytano z cache: ${players.length} zawodników`);
    return players;
  }
  return null;
};

export const isCacheFresh = () => {
  const date = localStorage.getItem('cached_players_date');
  if (!date) return false;
  const cacheDate = new Date(date);
  const now = new Date();
  const daysDiff = (now - cacheDate) / (1000 * 60 * 60 * 24);
  console.log(`📅 Cache ważny jeszcze przez ${(7 - daysDiff).toFixed(1)} dni`);
  return daysDiff < 7;
};