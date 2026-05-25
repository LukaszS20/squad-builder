// src/components/WelcomeSlider.js
import React, { useState, } from 'react';

export default function WelcomeSlider({ onClose }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "⚽ Witaj w World Cup Squad Builder!",
      icon: "🌍",
      content: "Cieszę się, że odwiedzasz tę stronę! To oznacza, że musisz być prawdziwym fanem piłki nożnej. Dla takich osób jak Ty nie mogłeś wyobrazić sobie lepszego miejsca. W tym wirtualnym świecie będziesz mógł stworzyć swój wymarzony skład zawodników z Mistrzostw Świata 2026."
    },
    {
      title: "📋 Tworzenie składów",
      icon: "🛠️",
      content: "Wybierz formację (4-3-3, 4-4-2, 3-5-2 i wiele innych), a następnie kliknij na dowolną pozycję na boisku. Zobaczysz listę dostępnych zawodników - możesz ich filtrować po pozycji, kraju, klubie, wieku, wzroście, wartości rynkowej i preferowanej nodze. Stwórz swoją wymarzoną jedenastkę!"
    },
    {
      title: "⚖️ Zostań sędzią!",
      icon: "👨‍⚖️",
      content: "Wybierz kategorię (np. młodzi zawodnicy, lewonożni, Premier League), a system wylosuje dwa losowe składy innych użytkowników. Porównaj zawodnika z zawodnika na tych samych pozycjach i wybierz, który według Ciebie jest lepszy. Na końcu zobaczysz wynik meczu! Każdy pojedynek wpływa na ranking składów."
    },
    {
      title: "🏆 Kategorie i ranking",
      icon: "📊",
      content: "Twórz własne kategorie z warunkami (np. wiek ≤ 23, wartość > 50M €, noga lewa). Filtruj ranking składów według wybranej kategorii. Sprawdzaj historię rozegranych meczów. Możesz też zapisywać swoje składy w chmurze i wczytywać je później - wszystko zapisuje się w Firebase!"
    },
    {
      title: "📁 Zapisywanie i logowanie",
      icon: "🔐",
      content: "Zaloguj się przez email, aby zapisywać swoje składy i kategorie. Wszystkie składy innych użytkowników są dostępne do wglądu - możesz je wczytywać i modyfikować. Twoje własne kategorie są zapisywane w Firebase i dostępne na każdym urządzeniu po zalogowaniu."
    },
    {
      title: "🎮 Gotowy do gry?",
      icon: "🚀",
      content: "Teraz znasz już wszystkie funkcje tej aplikacji! Czas zbudować swój wymarzony skład, sędziować mecze i wspiąć się na szczyt rankingu. Powodzenia i do zobaczenia na mundialu!",
      isLast: true
    }
  ];

  const nextSlide = () => {
    if (currentSlide + 1 < slides.length) {
      setCurrentSlide(currentSlide + 1);
    } else {
      // Zakończ i zapisz że użytkownik widział slider
      localStorage.setItem('wc_welcome_seen', 'true');
      onClose();
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const skip = () => {
    localStorage.setItem('wc_welcome_seen', 'true');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md">
      <div className="bg-gradient-to-br from-[#0d1525] to-[#0a0f1a] rounded-2xl w-full max-w-2xl border border-yellow-400/30 shadow-2xl shadow-yellow-400/10 m-4">
        
        {/* Header z ikoną i paskiem postępu */}
        <div className="p-6 pb-2">
          <div className="flex justify-between items-center mb-2">
            <div className="text-5xl">{slides[currentSlide].icon}</div>
            <button 
              onClick={skip}
              className="text-white/40 hover:text-white/80 text-sm transition-all"
            >
              Pomiń →
            </button>
          </div>
          
          {/* Pasek postępu */}
          <div className="flex gap-1 mt-4">
            {slides.map((_, idx) => (
              <div 
                key={idx}
                className={`h-1 flex-1 rounded-full transition-all ${
                  idx === currentSlide ? 'bg-yellow-400' : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Treść slajdu */}
        <div className="p-6 pt-2">
          <h2 className="text-2xl font-bold text-white mb-4">
            {slides[currentSlide].title}
          </h2>
          <p className="text-white/70 leading-relaxed text-base">
            {slides[currentSlide].content}
          </p>
        </div>

        {/* Przyciski nawigacji */}
        <div className="p-6 pt-0 flex justify-between items-center">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className={`px-4 py-2 rounded-lg transition-all ${
              currentSlide > 0 
                ? 'bg-white/10 text-white hover:bg-white/20' 
                : 'bg-white/5 text-white/30 cursor-not-allowed'
            }`}
          >
            ← Wstecz
          </button>
          
          <div className="text-white/40 text-sm">
            {currentSlide + 1} / {slides.length}
          </div>
          
          <button
            onClick={nextSlide}
            className="px-5 py-2 rounded-lg bg-yellow-400 text-black font-bold hover:bg-yellow-500 transition-all"
          >
            {currentSlide + 1 === slides.length ? '🎮 Rozpocznij!' : 'Dalej →'}
          </button>
        </div>
      </div>
    </div>
  );
}