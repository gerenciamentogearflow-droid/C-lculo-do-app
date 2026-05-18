import React, { useState, useEffect } from 'react';
import { DollarSign, Wrench, Clock, TrendingUp, Lock } from 'lucide-react';
import { AppProvider } from './context';
import { Custos } from './components/views/Custos';
import { Producao } from './components/views/Producao';
import { Capacidade } from './components/views/Capacidade';
import { Resultado } from './components/views/Resultado';

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'shineray' && password === 'shineray@2025') {
      onLogin();
    } else {
      setError('Usuário ou senha inválidos.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-sm border border-slate-100">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-100 mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight text-center">Oficina Shineray</h1>
          <p className="text-slate-500 text-sm mt-1">Acesso Restrito</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          {error && <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg text-center font-medium">{error}</div>}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Usuário</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all font-medium"
              placeholder="Digite o usuário"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all font-medium"
              placeholder="Digite a senha"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-bold rounded-xl px-4 py-3 hover:bg-indigo-700 transition-colors mt-2 shadow-lg shadow-indigo-200"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

function MainApp() {
  const [activeTab, setActiveTab] = useState<'custos' | 'producao' | 'capacidade' | 'resultado'>('resultado');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('shineray_auth_token') === 'true';
  });

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('shineray_auth_token', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('shineray_auth_token');
  };

  if (!isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen flex flex-col overflow-hidden bg-slate-50">
      <header className="bg-white border-b border-slate-200 px-4 sm:px-8 py-4 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-100">
            <Wrench className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Oficina Shineray <span className="text-indigo-600 font-medium text-sm">Cálculo de Mão de Obra</span></h1>
        </div>
        <button 
          onClick={handleLogout}
          className="text-xs font-bold text-slate-400 hover:text-slate-600 uppercase tracking-wider"
        >
          Sair
        </button>
      </header>
      
      <div className="flex-1 overflow-y-auto w-full max-w-5xl mx-auto px-4 md:px-8">
        {activeTab === 'custos' && <Custos />}
        {activeTab === 'producao' && <Producao />}
        {activeTab === 'capacidade' && <Capacidade />}
        {activeTab === 'resultado' && <Resultado />}
      </div>

      <nav className="bg-white border-t border-slate-200 h-20 px-4 sm:px-12 flex justify-around items-center shrink-0 w-full max-w-5xl mx-auto rounded-t-3xl sm:rounded-none">
        <button 
          onClick={() => setActiveTab('custos')}
          className="flex flex-col items-center gap-1 group"
        >
          <div className={`p-2 rounded-xl transition-colors ${activeTab === 'custos' ? 'bg-indigo-50 text-indigo-600 shadow-inner' : 'group-hover:bg-slate-100 text-slate-400'}`}>
            <DollarSign size={24} strokeWidth={2} />
          </div>
          <span className={`text-[10px] uppercase tracking-tighter font-bold ${activeTab === 'custos' ? 'text-indigo-600' : 'text-slate-400'}`}>Custos</span>
        </button>
        <button 
          onClick={() => setActiveTab('producao')}
          className="flex flex-col items-center gap-1 group"
        >
          <div className={`p-2 rounded-xl transition-colors ${activeTab === 'producao' ? 'bg-indigo-50 text-indigo-600 shadow-inner' : 'group-hover:bg-slate-100 text-slate-400'}`}>
            <Wrench size={24} strokeWidth={2} />
          </div>
          <span className={`text-[10px] uppercase tracking-tighter font-bold ${activeTab === 'producao' ? 'text-indigo-600' : 'text-slate-400'}`}>Produção</span>
        </button>
        <button 
          onClick={() => setActiveTab('capacidade')}
          className="flex flex-col items-center gap-1 group"
        >
          <div className={`p-2 rounded-xl transition-colors ${activeTab === 'capacidade' ? 'bg-indigo-50 text-indigo-600 shadow-inner' : 'group-hover:bg-slate-100 text-slate-400'}`}>
            <Clock size={24} strokeWidth={2} />
          </div>
          <span className={`text-[10px] uppercase tracking-tighter font-bold ${activeTab === 'capacidade' ? 'text-indigo-600' : 'text-slate-400'}`}>Capacidade</span>
        </button>
        <button 
          onClick={() => setActiveTab('resultado')}
          className="flex flex-col items-center gap-1 group"
        >
          <div className={`p-2 rounded-xl transition-colors ${activeTab === 'resultado' ? 'bg-indigo-50 text-indigo-600 shadow-inner' : 'group-hover:bg-slate-100 text-slate-400'}`}>
            <TrendingUp size={24} strokeWidth={2} />
          </div>
          <span className={`text-[10px] uppercase tracking-tighter font-bold ${activeTab === 'resultado' ? 'text-indigo-600' : 'text-slate-400'}`}>Resultado</span>
        </button>
      </nav>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
