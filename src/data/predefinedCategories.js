// src/data/predefinedCategories.js
export const PREDEFINED_CATEGORIES = [
  {
    name: "🌟 Najlepsza 11 World Cup 2026",
    filter: (p) => true // wszyscy
  },
  {
    name: "⭐ Najlepsza 11 młodych (≤25 lat)",
    filter: (p) => p.age <= 25
  },
  {
    name: "👴 Najlepsza 11 starych (≥30 lat)",
    filter: (p) => p.age >= 30
  },
  {
    name: "💰 Do 750M € (wartość składu)",
    filter: (p) => true // wymaga sumowania wartości
  },
  {
    name: "🦶 Najlepsza 11 prawonożnych",
    filter: (p) => p.foot === 'Right'
  },
  {
    name: "🦶 Najlepsza 11 lewonożnych",
    filter: (p) => p.foot === 'Left'
  },
{
    name: "📏 Najlepsza 11 niskich (≤180 cm)",
    filter: (p) => {
      // Bramkarze mogą być wyżsi, reszta ≤180
      if (p.primaryPosition === 'GK') return p.height <= 185;
      return p.height <= 180;
    }
  },
  {
    name: "📏 Najlepsza 11 wysokich (≥185 cm)",
    filter: (p) => p.height >= 185
  },
  {
    name: "🏴󠁧󠁢󠁥󠁮󠁧󠁿 Najlepsza 11 Premier League",
    filter: (p) => p.club && ['Liverpool', 'Manchester City', 'Arsenal', 'Chelsea', 'Manchester United', 'Tottenham'].includes(p.club)
  }
];