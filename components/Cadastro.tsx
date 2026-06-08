'use client'

import React, { useState } from 'react';
import { GraduationCap, User, UserCheck, LogIn, Sun, Moon } from 'lucide-react';

interface CadastroProps {
  onSelectPerfil: (perfil: 'professor' | 'coordenador') => void;
}

export default function Cadastro({ onSelectPerfil }: CadastroProps) {
  const [perfilSelecionado, setPerfilSelecionado] = useState<'professor' | 'coordenador'>('professor');
  const [ra, setRa] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true); // Inicializa no modo escuro conforme seu design original

  const lidarComCadastro = (e: React.FormEvent) => {
    e.preventDefault();
    if (ra.trim() !== '') {
      onSelectPerfil(perfilSelecionado);
    } else {
      alert('Por favor, informe o seu RA.');
    }
  };

  return (
    // CONTAINER PRINCIPAL: Altera dinamicamente entre o azul escuro profundo e um tom claro tecnológico
    <div className={`min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 font-sans relative overflow-hidden selection:bg-blue-400/30 transition-colors duration-500 ${
      isDarkMode ? 'bg-[#030E21]' : 'bg-[#F0F4F8]'
    }`}>
      
      {/* ─── ANIMAÇÃO DAS ONDAS DE LUZ ─── */}
      <style>{`
        @keyframes moverOndaEsquerda {
          0% { transform: translate(-20%, -20%) rotate(0deg) scale(1); }
          50% { transform: translate(30vw, 20vh) rotate(180deg) scale(1.3); }
          100% { transform: translate(-20%, -20%) rotate(360deg) scale(1); }
        }
        @keyframes moverOndaDireita {
          0% { transform: translate(20%, 20%) rotate(0deg) scale(1.2); }
          50% { transform: translate(-30vw, -10vh) rotate(-180deg) scale(0.9); }
          100% { transform: translate(20%, 20%) rotate(-360deg) scale(1.2); }
        }
        .onda-azul-1 {
          animation: moverOndaEsquerda 22s infinite ease-in-out;
        }
        .onda-azul-2 {
          animation: moverOndaDireita 26s infinite ease-in-out;
        }
      `}</style>

      {/* Luzes Dinâmicas Adaptáveis: Ajustam a opacidade de acordo com o tema para não estourar o contraste */}
      <div className={`absolute top-0 left-0 w-[80vmin] h-[80vmin] rounded-full bg-gradient-to-br from-blue-600/25 via-cyan-500/15 to-transparent pointer-events-none onda-azul-1 transition-all duration-500 ${
        isDarkMode ? 'blur-[100px] md:blur-[140px] opacity-100' : 'blur-[80px] md:blur-[110px] opacity-40'
      }`} />
      <div className={`absolute bottom-0 right-0 w-[90vmin] h-[90vmin] rounded-full bg-gradient-to-tl from-indigo-600/20 via-blue-700/10 to-transparent pointer-events-none onda-azul-2 transition-all duration-500 ${
        isDarkMode ? 'blur-[110px] md:blur-[150px] opacity-100' : 'blur-[90px] md:blur-[120px] opacity-40'
      }`} />
      {/* ───────────────────────────────────────── */}

      {/* BOTÃO DE ALTERNÂNCIA DE TEMA (Flutuante no Topo Direito) */}
      <div className="absolute top-4 right-4 z-50">
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`p-2.5 rounded-xl border transition-all duration-300 flex items-center justify-center shadow-sm active:scale-95 ${
            isDarkMode 
              ? 'bg-[#0B1528] border-slate-800 text-yellow-500 hover:bg-[#111f38]' 
              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
          title={isDarkMode ? "Ativar Modo Claro" : "Ativar Modo Escuro"}
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>

      {/* Wrapper Responsivo */}
      <div className="w-full max-w-[440px] flex flex-col items-center relative z-10 my-auto">
        
        {/* Cabeçalho do Portal */}
        <div className="flex flex-col items-center mb-6 md:mb-8 text-center select-none">
          <div className="w-12 h-12 md:w-14 md:h-14 bg-[#0B5ED7] rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 mb-3 transition-all duration-300 hover:scale-105">
            <GraduationCap size={28} className="text-white md:hidden" />
            <GraduationCap size={32} className="text-white hidden md:block" />
          </div>
          <h1 className={`text-2xl md:text-3xl font-black tracking-wider uppercase transition-colors duration-500 ${
            isDarkMode ? 'text-white' : 'text-slate-800'
          }`}>
            ENIAC
          </h1>
          <p className={`text-[11px] md:text-xs mt-1 uppercase tracking-widest transition-colors duration-500 ${
            isDarkMode ? 'text-slate-400' : 'text-slate-500'
          }`}>
            Portal de Gestão Acadêmica
          </p>
        </div>

        {/* Card Principal: Altera cores internas, bordas e sombras dependendo do tema */}
        <div className={`w-full border rounded-2xl p-5 sm:p-7 md:p-8 transition-all duration-500 ${
          isDarkMode 
            ? 'bg-[#0B132B]/90 border-slate-800/60 shadow-2xl shadow-black/60 backdrop-blur-md' 
            : 'bg-white border-slate-200/60 shadow-xl shadow-slate-300/40'
        }`}>
          
          <div className="mb-6">
            <h2 className={`text-lg md:text-xl font-bold transition-colors duration-500 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              Acesse sua conta
            </h2>
            <p className={`text-xs mt-1 transition-colors duration-500 ${
              isDarkMode ? 'text-slate-400' : 'text-slate-500'
            }`}>
              Selecione seu perfil e informe seu RA para entrar.
            </p>
          </div>

          <form onSubmit={lidarComCadastro} className="space-y-5">
            
            {/* Seleção de Tipo de Perfil */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Tipo de Perfil
              </label>
              <div className="grid grid-cols-2 gap-3">
                {/* Botão Professor */}
                <button
                  type="button"
                  onClick={() => setPerfilSelecionado('professor')}
                  className={`flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl border-2 transition-all gap-1 active:scale-98 ${
                    perfilSelecionado === 'professor'
                      ? 'border-[#0B5ED7] bg-blue-50/10 text-[#0B5ED7]'
                      : isDarkMode
                        ? 'border-slate-800 bg-[#0F1932] text-slate-400 hover:border-slate-700'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <User size={20} className={perfilSelecionado === 'professor' ? 'text-[#0B5ED7]' : 'text-slate-500'} />
                  <span className="text-xs sm:text-sm font-semibold mt-1">Professor</span>
                </button>

                {/* Botão Coordenador */}
                <button
                  type="button"
                  onClick={() => setPerfilSelecionado('coordenador')}
                  className={`flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl border-2 transition-all gap-1 active:scale-98 ${
                    perfilSelecionado === 'coordenador'
                      ? 'border-[#0B5ED7] bg-blue-50/10 text-[#0B5ED7]'
                      : isDarkMode
                        ? 'border-slate-800 bg-[#0F1932] text-slate-400 hover:border-slate-700'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <UserCheck size={20} className={perfilSelecionado === 'coordenador' ? 'text-[#0B5ED7]' : 'text-slate-500'} />
                  <span className="text-xs sm:text-sm font-semibold mt-1">Coordenador</span>
                </button>
              </div>
            </div>

            {/* Campo Registro Acadêmico (RA) */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Registro Acadêmico (RA)
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={ra}
                  onChange={(e) => setRa(e.target.value)}
                  placeholder="Digite seu RA"
                  className={`w-full border rounded-xl py-3 md:py-3.5 pl-11 pr-4 placeholder-slate-400 outline-none text-sm transition-all ${
                    isDarkMode
                      ? 'bg-[#131E3B] border-slate-800 text-white focus:border-slate-700'
                      : 'bg-[#F4F5F7] border-slate-200 text-slate-800 focus:border-slate-300 focus:bg-slate-50/50'
                  }`}
                />
                <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              </div>
            </div>

            {/* Checkbox Lembrar-me */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 rounded border-slate-300 text-[#0B5ED7] focus:ring-[#0B5ED7] cursor-pointer transition-colors"
              />
              <label htmlFor="remember" className={`text-xs select-none cursor-pointer transition-colors duration-500 ${
                isDarkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-800'
              }`}>
                Lembrar-me neste dispositivo
              </label>
            </div>

            {/* Botão Entrar */}
            <button
              type="submit"
              className="w-full bg-[#0B5ED7] hover:bg-[#0a53be] text-white py-3 md:py-3.5 rounded-xl font-semibold text-sm tracking-wide flex items-center justify-center gap-2 shadow-md transition-all active:scale-99 mt-6"
            >
              Entrar <LogIn size={16} />
            </button>
          </form>

        </div>

        {/* Links Inferiores */}
        <div className={`flex justify-center gap-6 mt-6 md:mt-8 text-xs font-semibold uppercase tracking-wider select-none transition-colors duration-500 ${
          isDarkMode ? 'text-slate-500' : 'text-slate-400'
        }`}>
          <a href="#" className={`transition-colors flex items-center gap-1.5 ${isDarkMode ? 'hover:text-white' : 'hover:text-slate-700'}`}>
            <span>❓</span> Suporte
          </a>
          <div className={isDarkMode ? 'text-slate-800' : 'text-slate-300'}>|</div>
          <span className="flex items-center gap-1.5 cursor-default text-slate-500">
            <span>🌐</span> PT-BR
          </span>
        </div>

      </div>
    </div>
  );
}