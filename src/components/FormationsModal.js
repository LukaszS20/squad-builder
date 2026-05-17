// src/components/FormationsModal.js
import React from 'react';
import { FORMATIONS } from '../data/formations';

export default function FormationsModal({ isOpen, onClose, currentFormation, onSelectFormation }) {
  if (!isOpen) return null;

  // Grupowanie formacji według typu (opcjonalne)
  const getFormationType = (formation) => {
    if (formation.startsWith('4')) return '⚡ Formacje z 4 obrońcami';
    if (formation.startsWith('3')) return '🛡️ Formacje z 3 obrońcami';
    if (formation.startsWith('5')) return '🔒 Formacje z 5 obrońcami';
    return '🎯 Pozostałe formacje';
  };

  // Grupowanie formacji
  const groupedFormations = {};
  Object.keys(FORMATIONS).forEach(f => {
    const type = getFormationType(f);
    if (!groupedFormations[type]) groupedFormations[type] = [];
    groupedFormations[type].push(f);
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-[#0d1525] rounded-2xl w-full max-w-md max-h-[80vh] flex flex-col border border-white/10 m-4" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="text-xl font-bold text-white">📐 Wybierz formację</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/60 hover:text-white transition-all"
          >
            ✕
          </button>
        </div>

        {/* Lista formacji */}
        <div className="flex-1 overflow-y-auto p-4">
          {Object.entries(groupedFormations).map(([type, formations]) => (
            <div key={type} className="mb-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white/40 mb-2">{type}</h3>
              <div className="grid grid-cols-2 gap-2">
                {formations.map((f) => (
                  <button
                    key={f}
                    onClick={() => {
                      onSelectFormation(f);
                      onClose();
                    }}
                    className={`px-4 py-3 rounded-xl text-sm font-bold tracking-wider uppercase transition-all duration-200 ${
                      currentFormation === f
                        ? 'bg-yellow-400 text-black shadow-[0_0_20px_rgba(250,204,21,0.4)]'
                        : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {f}
                    {currentFormation === f && <span className="ml-2 text-xs">✓</span>}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Stopka */}
        <div className="p-4 border-t border-white/10">
          <p className="text-center text-[10px] text-white/30">
            Wybierz formację, która najlepiej pasuje do Twojego stylu gry
          </p>
        </div>
      </div>
    </div>
  );
}