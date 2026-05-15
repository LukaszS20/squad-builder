import React from 'react';

function countBy(players, key) {
  return players.reduce((acc, p) => {
    acc[p[key]] = (acc[p[key]] || 0) + 1;
    return acc;
  }, {});
}

export default function StatsPanel({ squad }) {
  const players = Object.values(squad);
  const total = players.length;

  if (total === 0) {
    return (
      <div className="w-full max-w-lg mt-4 rounded-2xl border border-white/8 bg-white/3 px-6 py-5 text-center">
        <p className="text-white/30 text-sm tracking-wider">Kliknij pozycję na boisku, aby dodać zawodnika</p>
      </div>
    );
  }

  const countries = countBy(players, 'country');
  const clubs = countBy(players, 'club');

  const sortedCountries = Object.entries(countries).sort((a, b) => b[1] - a[1]);
  const sortedClubs = Object.entries(clubs).sort((a, b) => b[1] - a[1]);

  return (
    <div className="w-full max-w-lg mt-4 space-y-3">
      {/* Summary row */}
      <div className="rounded-2xl border border-white/10 bg-white/4 px-5 py-3 flex items-center gap-6">
        <div className="text-center">
          <p className="text-3xl font-black text-yellow-400">{total}<span className="text-white/30">/11</span></p>
          <p className="text-[10px] uppercase tracking-widest text-white/40">Zawodnicy</p>
        </div>
        <div className="w-px h-10 bg-white/10" />
        <div className="flex-1">
          <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full transition-all duration-500"
              style={{ width: `${(total / 11) * 100}%` }}
            />
          </div>
          <p className="text-[10px] text-white/30 mt-1 tracking-wider">{11 - total} brakujących pozycji</p>
        </div>
      </div>

      {/* Country & Club stats */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard title="🌍 Kraje" entries={sortedCountries} color="blue" />
        <StatCard title="🏟️ Kluby" entries={sortedClubs} color="emerald" />
      </div>
    </div>
  );
}

function StatCard({ title, entries, color }) {
  const colorMap = {
    blue: { bar: 'bg-blue-400', badge: 'bg-blue-500/20 text-blue-300' },
    emerald: { bar: 'bg-emerald-400', badge: 'bg-emerald-500/20 text-emerald-300' },
  };
  const c = colorMap[color];
  const max = entries[0]?.[1] || 1;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/4 px-4 py-3">
      <p className="text-xs font-black tracking-widest uppercase text-white/50 mb-3">{title}</p>
      <div className="space-y-2">
        {entries.map(([name, count]) => (
          <div key={name}>
            <div className="flex items-center justify-between mb-0.5">
              <p className="text-xs font-bold text-white truncate max-w-[80%]">{name}</p>
              <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${c.badge}`}>{count}</span>
            </div>
            <div className="w-full bg-white/8 rounded-full h-1 overflow-hidden">
              <div
                className={`h-full ${c.bar} rounded-full transition-all duration-500`}
                style={{ width: `${(count / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
