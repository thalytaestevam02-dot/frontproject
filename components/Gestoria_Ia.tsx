'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useThemeStorage } from "../lib/useThemeStorage";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard, Bot, ArrowDown, LogOut, Sun, Moon,
  Search, Bell, Settings, Printer, Download, Sparkles, Loader2
} from 'lucide-react';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
  textColor?: string;
}

// ================= COMPONENTE PRINCIPAL =================
export default function GestoriaIAPage() {
  const { isDarkMode, toggleTheme } = useThemeStorage();
  const [horaAtual, setHoraAtual] = useState("");
  const router = useRouter();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Estados específicos para a IA
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Efeito do Relógio Digital
  useEffect(() => {
    const atualizarHora = () => {
      setHoraAtual(new Date().toLocaleTimeString("pt-BR"));
    };
    atualizarHora();
    const intervalo = setInterval(atualizarHora, 1000);
    return () => clearInterval(intervalo);
  }, []);

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  // Função simulada de processamento de comando da IA
  const processarComandoIA = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setPrompt('');
    } catch (error) {
      console.error('Erro ao processar comando da IA:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`${isDarkMode ? 'dark bg-[#0f1115] text-gray-300' : 'bg-gray-300 text-gray-700'} h-screen overflow-hidden font-sans p-6 transition-colors duration-300`}>
      <div className="mx-auto flex h-full max-w-[1400px] gap-6 min-h-0">

        {/* BARRA LATERAL (SIDEBAR) */}
        <aside className="w-64 flex flex-col bg-white dark:bg-[#161b22] rounded-xl border border-gray-200 dark:border-gray-800 p-5 shrink-0 h-full">
          <div className="flex justify-center mb-4">
            <Image
              src="/eniac-logo.png"
              alt="Logo ENIAC"
              width={160}
              height={50}
              className={isDarkMode ? "brightness-0 invert" : ""}
            />
          </div>

          <div className="mb-7 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-[#0047b3] dark:text-[#0c6cfb]">PORTAL DO GESTOR</h1>
            <p className="mt-1 text-[11px] text-gray-500 dark:text-white font-bold uppercase tracking-widest">Ambiente Docente</p>
          </div>

          <nav className="flex-1 space-y-1">
            <NavItem
              icon={<LayoutDashboard size={18} />}
              label="Dashboard"
              onClick={() => router.push("/gestoria")}
            />
            <NavItem icon={<Bot size={18} />}
              label="Gestoria IA" active />

            <NavItem
              icon={<LayoutDashboard size={18} />}
              label="Feed de Atividades"
              onClick={() => router.push("/feed_att")}
            />
          </nav>

          <div className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-800 space-y-4 text-[11px]">
            <div className="flex items-center gap-1 text-sm font-bold uppercase tracking-wider text-gray-500">
              <span>⚠️</span> Avisos Gerais
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-gray-700 dark:text-gray-300 font-semibold">Notas</p>
                <p className="text-gray-400 dark:text-gray-500 leading-tight">Lançamento até o 5º dia útil.</p>
              </div>
              <div>
                <p className="text-base font-semibold text-gray-700 dark:text-gray-300">Substituição</p>
                <p className="text-sm text-gray-400 leading-tight dark:text-gray-500">Aviso com 48h de antecedência.</p>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-800 flex flex-col gap-1">
              <div className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg cursor-pointer text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-white transition-colors">
                <Settings size={16} /> <span className="text-sm font-medium">Configurações</span>
              </div>
              <div
                onClick={() => router.push("/cadastro")}
                className="flex items-center gap-3 px-3 py-2 hover:bg-red-50 dark:hover:bg-red-950/30 text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 rounded-lg cursor-pointer transition-colors"
              >
                <LogOut size={16} /> <span className="text-sm font-medium">Sair</span>
              </div>
            </div>
          </div>
        </aside>

        {/* CONTEÚDO PRINCIPAL (MAIN) */}
        <main className="flex min-h-0 flex-1 flex-col overflow-hidden">

          {/* HEADER FIXO NO TOPO */}
          <header className="flex justify-between items-center mb-6 py-3 px-4 bg-white/80 dark:bg-[#161b22]/80 backdrop-blur-md rounded-xl border border-gray-200 dark:border-gray-800 gap-4 transition-colors duration-300 shrink-0">
            <h2 className="text-xl font-semibold tracking-wide text-gray-800 dark:text-white shrink-0">
              Navegação Gestoria
            </h2>

            <div className="flex items-center gap-4 flex-nowrap justify-end py-1">
              {/* Barra de Pesquisa */}
              <div className="relative w-64 shrink-0">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Pesquisar registros..."
                  className="w-full pl-9 pr-4 py-2 bg-[#e9ecef] dark:bg-[#1c2128] border border-transparent dark:border-gray-800 rounded-lg text-sm focus:outline-none focus:bg-white dark:focus:bg-[#161b22] focus:border-gray-300 dark:focus:border-gray-700 text-gray-700 dark:text-gray-300 transition-all placeholder-gray-400"
                />
              </div>

              {/* Alternador de Tema */}
              <button
                onClick={toggleTheme}
                className="p-2 bg-white dark:bg-[#161b22] border border-gray-200 dark:border-gray-800 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors shrink-0"
                title="Alternar Tema"
              >
                {isDarkMode ? <Sun size={17} className="text-yellow-500" /> : <Moon size={17} />}
              </button>

              {/* Notificações */}
              <button className="p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-white transition-colors relative shrink-0">
                <Bell size={18} />
                <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </header>

          {/* ÁREA DE CONTEÚDO TOTAL (Rolagem vertical única) */}
          <div ref={scrollContainerRef} className="flex-1 overflow-y-auto pr-2 pb-6 space-y-6 scrollbar-thin dark:scrollbar-thumb-gray-800 scrollbar-thumb-gray-200">

            {/* Título de Boas-vindas e Data */}
            <div className="flex justify-between items-center mb-2">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Gestoria IA</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                  Central inteligente de gerenciamento acadêmico
                </p>
              </div>
              <div className="bg-white dark:bg-[#161b22] border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-white px-4 py-2 rounded-xl font-medium shadow-sm flex items-center gap-2">
                📅 {new Date().toLocaleDateString("pt-BR")}
              </div>
            </div>

            {/* CARDS ESTATÍSTICOS */}
            <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Card 1 */}
              <div className="bg-white dark:bg-[#161b22] border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Fluxo de Alunos</p>
                  <span className="bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400 text-xs px-3 py-1 rounded-full font-semibold">
                    AO VIVO
                  </span>
                </div>
                <h2 className="text-4xl font-extrabold text-gray-800 dark:text-white mb-2">85%</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">Alunos previstos para entrada hoje</p>
                <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2.5">
                  <div className="bg-blue-500 h-2.5 rounded-full w-[85%]"></div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white dark:bg-[#161b22] border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Processamento IA</p>
                <h2 className="text-3xl font-extrabold text-green-600 mt-2">Otimizado</h2>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">Latência: 1.2s</p>
              </div>

              {/* Card 3 */}
              <div className="bg-white dark:bg-[#161b22] border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Alertas Ativos</p>
                <h2 className="text-4xl font-extrabold text-orange-500 mt-2">03</h2>
                <span className="opacity-0 text-xs">Espaçador</span>
              </div>

              {/* Card 4 */}
              <div className="bg-white dark:bg-[#161b22] border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Solicitações IA</p>
                <h2 className="text-4xl font-extrabold text-purple-600 mt-2">124</h2>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">Ações efetuadas hoje</p>
              </div>
            </section>

            {/* FEED IA */}
            <section className="bg-white dark:bg-[#161b22] border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm transition-colors duration-300">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">Feed de Atividades IA</h2>
                <button className="text-blue-600 text-sm font-semibold hover:underline">
                  Histórico Completo
                </button>
              </div>

              <div className="space-y-4">
                {/* Atividade 1 */}
                <div className="border-l-4 border-blue-500 bg-gray-100 dark:bg-gray-800/50 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-gray-800 dark:text-white text-sm">
                      Prof. Lucio Luzetti informou ausência na aula de hoje
                    </h3>
                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">AGORA</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    IA notificou automaticamente a turma e sugeriu aula assíncrona.
                  </p>
                  <div className="flex gap-2 mt-3">
                    <button className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-blue-700 transition">
                      Detalhes
                    </button>
                    <button className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-red-500 hover:text-white dark:hover:bg-red-600 transition">
                      Desfazer
                    </button>
                  </div>
                </div>

                {/* Atividade 2 */}
                <div className="bg-gray-100 dark:bg-gray-800/50 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-gray-800 dark:text-white text-sm">
                      Prof. Marcos Cárfora reagendou aula do dia 26/08 para 28/08
                    </h3>
                    <span className="text-xs text-gray-400">14m</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Calendário alterado automaticamente
                  </p>
                </div>

                {/* Atividade 3 */}
                <div className="bg-gray-100 dark:bg-gray-800/50 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-gray-800 dark:text-white text-sm">
                      Prof. Lucio Luzetti declarou futura falta na aula do dia 16/10
                    </h3>
                    <span className="text-xs text-gray-400">24h</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Calendário alterado automaticamente
                  </p>
                </div>
              </div>
            </section>

            {/* CONTROLE INTELIGENTE DE GRADE */}
            <section className="bg-white dark:bg-[#161b22] border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm transition-colors duration-300">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white">Controle Inteligente de Grade</h2>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Alterações automáticas sugeridas pela IA</p>
                </div>

                <div className="flex items-center gap-2">
                  <button className="p-2 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition">
                    <Printer size={16} />
                  </button>
                  <button className="p-2 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition">
                    <Download size={16} />
                  </button>
                  <span className="bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-400 px-3 py-1 rounded-full text-xs font-semibold">
                    IA SINCRONIZADA
                  </span>
                </div>
              </div>

              <div className="bg-gray-100 dark:bg-gray-800/40 rounded-2xl p-5">
                <div className="bg-white dark:bg-[#161b22] border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm mb-4">
                  <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">MOTIVO</p>
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white">Ausência: Prof. Nelson Luzetti</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">IA detectou conflito e sugeriu realocação automática.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                  <div className="bg-white dark:bg-[#161b22] border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm border-l-4 border-red-500">
                    <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">HORÁRIO ORIGINAL</p>
                    <h4 className="text-xl font-bold text-gray-800 dark:text-white">19:30 - 21:10</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Sala 22-B</p>
                  </div>

                  <div className="bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-xl p-4 shadow-sm border-l-4 border-blue-500">
                    <p className="text-[10px] font-bold text-blue-500 dark:text-blue-400 uppercase tracking-wider mb-1">PROPOSTA IA</p>
                    <h4 className="text-xl font-bold text-blue-700 dark:text-blue-400">20:00 - 21:30</h4>
                    <p className="text-xs text-blue-600 dark:text-blue-500 mt-1">Aula remota via Teams</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold text-sm transition">
                    ✅ Validar Alteração
                  </button>
                  <button className="flex-1 bg-white dark:bg-[#161b22] border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 py-3 rounded-xl font-semibold text-sm transition">
                    Ajustar Manualmente
                  </button>
                </div>
              </div>

              {/* SEÇÃO DA SECRETARIA IA ATUALIZADA COM O NOVO LAYOUT DO PROMPT */}
              <div className="mt-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-colors duration-300 dark:border-gray-800 dark:bg-[#161b22]">
                <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-white">🤖 Assistente da Secretaria IA</div>
                <form onSubmit={processarComandoIA} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Prompt / Comando para a Secretaria</label>
                    <div className="relative">
                      <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        disabled={isLoading}
                        rows={4}
                        placeholder='Ex: "Verifique conflitos para as turmas do Prédio 1 e reorganize as ausências pendentes para a próxima semana."'
                        className="w-full resize-none rounded-lg border border-gray-200 bg-gray-50 p-4 text-xs leading-relaxed text-gray-800 placeholder-gray-400 transition-colors focus:border-blue-500/50 focus:outline-none disabled:opacity-50 dark:border-gray-800 dark:bg-[#1c2128] dark:text-white dark:placeholder-gray-600"
                      />
                      {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center gap-2 rounded-lg bg-white/80 text-xs text-gray-500 dark:bg-[#1c2128]/80 dark:text-gray-400">
                          <Loader2 size={16} className="animate-spin text-blue-500" />
                          <span>Sua Secretaria IA está processando as diretrizes...</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isLoading || !prompt.trim()}
                      className="flex items-center gap-2 rounded-lg bg-[#0B5ED7] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-colors hover:bg-blue-700 disabled:bg-gray-100 disabled:text-gray-400 dark:disabled:bg-gray-800"
                    >
                      <Sparkles size={14} /> Processar com IA
                    </button>
                  </div>
                </form>
              </div>

              {/* Status Inferiores */}
              <div className="mt-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-800/30 border border-gray-200 dark:border-gray-800 rounded-xl p-4">
                    <p className="text-xs text-gray-400">Solicitações IA hoje</p>
                    <h3 className="text-xl font-bold text-purple-600 mt-1">124</h3>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800/30 border border-gray-200 dark:border-gray-800 rounded-xl p-4">
                    <p className="text-xs text-gray-400">Processamento IA</p>
                    <h3 className="text-xl font-bold text-green-600 mt-1">Otimizado</h3>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800/30 border border-gray-200 dark:border-gray-800 rounded-xl p-4">
                    <p className="text-xs text-gray-400">Relatórios</p>
                    <h3 className="text-xl font-bold text-orange-500 mt-1">02 Pendentes</h3>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800/30 border border-gray-200 dark:border-gray-800 rounded-xl p-4">
                    <p className="text-xs text-gray-400">Sincronização</p>
                    <h3 className="text-xl font-bold text-gray-700 dark:text-white mt-1">{horaAtual || "--:--:--"}</h3>
                  </div>
                </div>
              </div>
            </section>

          </div>
        </main>
      </div>
    </div>
  );
}

// ================= SUBCOMPONENTES =================
function NavItem({ icon, label, active = false, onClick, textColor }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-lg px-4 py-2.5 transition-all text-left ${active
        ? 'bg-blue-600 font-semibold text-white shadow-sm'
        : `text-gray-500 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800 ${textColor || ''}`
        }`}
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}