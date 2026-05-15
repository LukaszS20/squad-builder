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
  where
} from 'firebase/firestore';

const SQUADS_COLLECTION = 'squads';

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