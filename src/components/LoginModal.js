// src/components/LoginModal.js
import React, { useState } from 'react';
import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '../firebase';

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        // Logowanie
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('Zalogowano:', userCredential.user.email);
        onLoginSuccess?.(userCredential.user);
        onClose();
      } else {
        // Rejestracja
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log('Zarejestrowano:', userCredential.user.email);
        onLoginSuccess?.(userCredential.user);
        onClose();
      }
    } catch (error) {
      console.error('Błąd:', error);
      switch (error.code) {
        case 'auth/invalid-email':
          setError('Nieprawidłowy adres email');
          break;
        case 'auth/user-not-found':
          setError('Użytkownik nie istnieje');
          break;
        case 'auth/wrong-password':
          setError('Nieprawidłowe hasło');
          break;
        case 'auth/email-already-in-use':
          setError('Email już jest używany');
          break;
        case 'auth/weak-password':
          setError('Hasło powinno mieć co najmniej 6 znaków');
          break;
        default:
          setError('Błąd: ' + error.message);
      }
    }
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="bg-[#0d1525] rounded-2xl p-6 w-full max-w-md border border-white/10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">
            {isLogin ? '🔐 Logowanie' : '📝 Rejestracja'}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/60 hover:text-white"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nazwa użytkownika (opcjonalnie)"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 mb-3 text-white placeholder-white/30 focus:outline-none focus:border-yellow-400/50"
            />
          )}

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 mb-3 text-white placeholder-white/30 focus:outline-none focus:border-yellow-400/50"
            required
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Hasło (min. 6 znaków)"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 mb-4 text-white placeholder-white/30 focus:outline-none focus:border-yellow-400/50"
            required
            minLength={6}
          />

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-2 mb-4">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-lg bg-yellow-400 text-black font-bold hover:bg-yellow-500 transition-all disabled:opacity-50"
          >
            {loading ? 'Ładowanie...' : (isLogin ? 'Zaloguj się' : 'Zarejestruj się')}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
            className="text-sm text-yellow-400 hover:text-yellow-300 transition-all"
          >
            {isLogin ? 'Nie masz konta? Zarejestruj się' : 'Masz już konto? Zaloguj się'}
          </button>
        </div>
      </div>
    </div>
  );
}