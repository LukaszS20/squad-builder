// src/services/squadService.js
import { db, auth } from '../firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc,
  query,
  orderBy,
  limit,
  serverTimestamp,
  where,
  getDoc
} from 'firebase/firestore';

const SQUADS_COLLECTION = 'squads';
const MATCHES_COLLECTION = 'matches';

// Zapisz nowy skład (z ID użytkownika)
export const saveSquad = async (squadData) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('Musisz być zalogowany aby zapisać skład');
    }
    
    const squad = {
      ...squadData,
      userId: user.uid,
      userEmail: user.email,
      userName: user.displayName || user.email,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      likes: 0,
      views: 0
    };
    
    const docRef = await addDoc(collection(db, SQUADS_COLLECTION), squad);
    console.log('Zapisano! ID:', docRef.id);
    
    return { id: docRef.id, ...squad };
  } catch (error) {
    console.error('Błąd zapisu:', error);
    throw error;
  }
};

// Pobierz wszystkie składy
export const getAllSquads = async () => {
  try {
    const q = query(
      collection(db, SQUADS_COLLECTION),
      orderBy('createdAt', 'desc'),
      limit(50)
    );
    const querySnapshot = await getDocs(q);
    const squads = [];
    querySnapshot.forEach((doc) => {
      squads.push({ id: doc.id, ...doc.data() });
    });
    console.log(`Pobrano ${squads.length} składów`);
    return squads;
  } catch (error) {
    console.error('Błąd pobierania:', error);
    return [];
  }
};

// Pobierz składy tylko zalogowanego użytkownika
export const getMySquads = async () => {
  try {
    const user = auth.currentUser;
    if (!user) return [];
    
    const q = query(
      collection(db, SQUADS_COLLECTION),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const squads = [];
    querySnapshot.forEach((doc) => {
      squads.push({ id: doc.id, ...doc.data() });
    });
    return squads;
  } catch (error) {
    console.error('Błąd pobierania:', error);
    return [];
  }
};

// Usuń skład (tylko jeśli to Twój)
export const deleteSquad = async (squadId, squadUserId) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('Musisz być zalogowany');
    }
    
    // Sprawdź czy to skład tego użytkownika
    if (squadUserId !== user.uid) {
      throw new Error('Możesz usuwać tylko swoje składy');
    }
    
    const squadRef = doc(db, SQUADS_COLLECTION, squadId);
    await deleteDoc(squadRef);
    console.log('Usunięto skład:', squadId);
    return true;
  } catch (error) {
    console.error('Błąd usuwania:', error);
    throw error;
  }
};

// Dodaj like do składu
export const likeSquad = async (id, currentLikes) => {
  try {
    const squadRef = doc(db, SQUADS_COLLECTION, id);
    await updateDoc(squadRef, {
      likes: (currentLikes || 0) + 1
    });
    return true;
  } catch (error) {
    console.error('Błąd like:', error);
    return false;
  }
};

// ZAPISZ WYNIK MECZU
export const saveMatchResult = async (matchData) => {
  try {
    const user = auth.currentUser;
    const match = {
      ...matchData,
      createdAt: serverTimestamp(),
      refereeId: user?.uid || 'anonymous',
      refereeName: user?.email || 'Anonim'
    };
    const docRef = await addDoc(collection(db, MATCHES_COLLECTION), match);
    return { id: docRef.id, ...match };
  } catch (error) {
    console.error('Błąd zapisu wyniku:', error);
    throw error;
  }
};

// POBIERZ HISTORIĘ MECZÓW
export const getMatchHistory = async (limitCount = 50) => {
  try {
    const q = query(
      collection(db, MATCHES_COLLECTION),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );
    const querySnapshot = await getDocs(q);
    const matches = [];
    querySnapshot.forEach((doc) => {
      matches.push({ id: doc.id, ...doc.data() });
    });
    return matches;
  } catch (error) {
    console.error('Błąd pobierania historii:', error);
    return [];
  }
};

// POBRZE RANKING SKŁADÓW
export const getSquadRanking = async () => {
  try {
    const q = query(
      collection(db, SQUADS_COLLECTION),
      orderBy('stats.wins', 'desc'),
      limit(100)
    );
    const querySnapshot = await getDocs(q);
    const squads = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      squads.push({ 
        id: doc.id, 
        ...data,
        winRate: data.stats?.matches > 0 
          ? Math.round((data.stats.wins / data.stats.matches) * 100) 
          : 0
      });
    });
    // Sortuj po liczbie wygranych
    return squads.sort((a, b) => (b.stats?.wins || 0) - (a.stats?.wins || 0));
  } catch (error) {
    console.error('Błąd pobierania rankingu:', error);
    return [];
  }
};

// W squadService.js, w updateSquadStats dodaj:
export const updateSquadStats = async (squadId, isWin, isDraw) => {
  try {
    console.log('📊 updateSquadStats wywołane:', { squadId, isWin, isDraw });
    
    const squadRef = doc(db, SQUADS_COLLECTION, squadId);
    const squadSnap = await getDoc(squadRef);
    
    console.log('Czy skład istnieje?', squadSnap.exists());
    
    if (squadSnap.exists()) {
      const currentStats = squadSnap.data().stats || { wins: 0, draws: 0, losses: 0, matches: 0 };
      console.log('Aktualne statystyki:', currentStats);
      
      const newStats = {
        wins: currentStats.wins + (isWin ? 1 : 0),
        draws: currentStats.draws + (isDraw ? 1 : 0),
        losses: currentStats.losses + (!isWin && !isDraw ? 1 : 0),
        matches: currentStats.matches + 1
      };
      
      console.log('Nowe statystyki:', newStats);
      await updateDoc(squadRef, { stats: newStats });
      console.log('✅ Statystyki zaktualizowane');
      return newStats;
    } else {
      console.error('❌ Nie znaleziono składu o ID:', squadId);
    }
  } catch (error) {
    console.error('❌ Błąd aktualizacji statystyk:', error);
    throw error;
  }
};

// Zapisz kategorię do Firebase
export const saveUserCategory = async (category) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('Musisz być zalogowany aby zapisać kategorię');
    }
    
    const categoryData = {
      name: category.name,
      filter: category.filter ? category.filter.toString() : null, // zapisujemy funkcję jako string
      players: category.players || [],
      conditions: category.conditions || [],
      userId: user.uid,
      userEmail: user.email,
      userName: user.displayName || user.email,
      createdAt: serverTimestamp(),
      isBase: false
    };
    
    const docRef = await addDoc(collection(db, 'categories'), categoryData);
    console.log('Kategoria zapisana w Firebase, ID:', docRef.id);
    return { id: docRef.id, ...categoryData };
  } catch (error) {
    console.error('Błąd zapisu kategorii:', error);
    throw error;
  }
};

// Pobierz kategorie zalogowanego użytkownika
export const getUserCategories = async () => {
  try {
    const user = auth.currentUser;
    if (!user) return [];
    
    const q = query(
      collection(db, 'categories'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    const categories = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      // Przywróć funkcję filtra z stringa
      let filter = null;
      if (data.filter && typeof data.filter === 'string') {
        try {
          // eslint-disable-next-line no-new-func
          filter = new Function('return ' + data.filter)();
        } catch (e) {
          console.error('Błąd parsowania filtra:', e);
        }
      }
      categories.push({
        id: doc.id,
        ...data,
        filter: filter,
        createdAt: data.createdAt?.toDate?.() || new Date(data.createdAt)
      });
    });
    return categories;
  } catch (error) {
    console.error('Błąd pobierania kategorii:', error);
    return [];
  }
};

// Pobierz wszystkie publiczne kategorie (opcjonalnie - dla admina)
export const getAllCategories = async () => {
  try {
    const q = query(
      collection(db, 'categories'),
      orderBy('createdAt', 'desc'),
      limit(100)
    );
    const snapshot = await getDocs(q);
    const categories = [];
    snapshot.forEach((doc) => {
      categories.push({ id: doc.id, ...doc.data() });
    });
    return categories;
  } catch (error) {
    console.error('Błąd pobierania wszystkich kategorii:', error);
    return [];
  }
};

// Usuń kategorię (tylko własną)
export const deleteUserCategory = async (categoryId, userId) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('Musisz być zalogowany');
    if (userId !== user.uid) throw new Error('Możesz usuwać tylko swoje kategorie');
    
    await deleteDoc(doc(db, 'categories', categoryId));
    console.log('Kategoria usunięta:', categoryId);
    return true;
  } catch (error) {
    console.error('Błąd usuwania kategorii:', error);
    throw error;
  }
};