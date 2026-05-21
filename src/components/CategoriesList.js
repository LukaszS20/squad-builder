// src/components/CategoriesList.js
import React from 'react';
import { PREDEFINED_CATEGORIES } from '../data/predefinedCategories';

export default function CategoriesList({ 
  userCategories,    // kategorie użytkownika
  mode,              // 'all', 'predefined', 'my'
  onSelectCategory, 
  onClose, 
  onCreateNew,
  currentUser 
}) {
  
  // Pokaż odpowiednie kategorie w zależności od trybu
  const getDisplayData = () => {
    if (mode === 'predefined') {
      return {
        title: "🏆 Kategorie podstawowe",
        list: PREDEFINED_CATEGORIES,
        showCreate: false
      };
    } else if (mode === 'my') {
      return {
        title: "📁 Moje kategorie",
        list: userCategories,
        showCreate: true
      };
    } else {
      // tryb 'all' - pokazuje wszystkie
      return {
        title: "🏆 Wszystkie kategorie",
        list: [...PREDEFINED_CATEGORIES, ...userCategories],
        showCreate: currentUser ? true : false
      };
    }
  };
  
  const { title, list, showCreate } = getDisplayData();
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="bg-[#0d1525] rounded-2xl w-full max-w-2xl max-h-[80vh] flex flex-col border border-white/10 m-4">
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 text-white/60">✕</button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          {/* Przycisk tworzenia (tylko dla zalogowanych w trybie 'my') */}
          {showCreate && currentUser && (
            <button
              onClick={onCreateNew}
              className="w-full mb-4 py-2 bg-green-500/20 text-green-400 rounded-lg border border-green-500/30 hover:bg-green-500/30 transition-all flex items-center justify-center gap-2"
            >
              <span>➕</span> Stwórz nową kategorię
            </button>
          )}
          
          {!showCreate && !currentUser && mode === 'my' && (
            <div className="text-center py-8 text-yellow-400 text-sm">
              🔑 Zaloguj się, aby tworzyć własne kategorie
            </div>
          )}
          
          {/* Lista kategorii */}
          <div className="space-y-2">
            {list && list.length > 0 ? (
              list.map((cat, idx) => (
                <div 
                  key={cat.id || idx} 
                  onClick={() => onSelectCategory(cat)}
                  className="bg-white/5 rounded-lg p-3 border border-white/10 hover:bg-white/10 cursor-pointer transition-all"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-bold text-white">{cat.name}</p>
                      <p className="text-xs text-white/40">
                        {cat.isBase ? 'Kategoria podstawowa' : `Utworzona: ${new Date(cat.createdAt).toLocaleDateString()}`}
                      </p>
                    </div>
                    <button className="text-xs px-3 py-1 bg-yellow-400/20 text-yellow-400 rounded">▶ Wybierz</button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-white/40 py-8">
                {mode === 'my' ? 'Nie masz jeszcze żadnych kategorii. Stwórz pierwszą!' : 'Brak kategorii'}
              </p>
            )}
          </div>
        </div>
        
        <div className="p-4 border-t border-white/10">
          <button onClick={onClose} className="w-full py-2 bg-white/10 rounded-lg text-white">Zamknij</button>
        </div>
      </div>
    </div>
  );
}