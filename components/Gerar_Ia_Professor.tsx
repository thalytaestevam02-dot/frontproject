'use client'

import React, { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { 
  User, BookOpen, Bell, Plus, Headphones, LogOut, Bot, Sun, Moon, 
  LayoutDashboard, FileText, GraduationCap, Search, Calendar, MapPin, Clock, Users, AlertTriangle,
  Settings, Download, Printer, Loader2, Sparkles
} from 'lucide-react';

interface Aula {
  materia: string;
  turma: string;
  local: string;
  colorLight: string;
  colorDark: string;
}

interface GradeSemanal {
  carga: string;
  turmas: string;
  conflitos: string;
  horarios: {
    manha: {
      segunda: Aula | null;
      terca: Aula | null;
      quarta: Aula | null;
      quinta: Aula | null;
      sexta: Aula | null;
    };
    noite1: {
      segunda: Aula | null;
      terca: Aula | null;
      quarta: Aula | null;
      quinta: Aula | null;
      sexta: Aula | null;
    };
    noite2: {
      segunda: Aula | null;
      terca: Aula | null;
      quarta: Aula | null;
      quinta: Aula | null;
      sexta: Aula | null;
    };
  };
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

interface StatusCardProps {
  label: string;
  value: string;
  sub?: string;
  colorLight?: string;
  colorDark?: string;
}

export default function GeradorGradeIA() {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const [gradeGerada, setGradeGerada] = useState<GradeSemanal>({
    carga: "24h",
    turmas: "02",
    conflitos: "Zero",
    horarios: {
      manha: {
        segunda: { materia: "Computação", turma: "Turma A", local: "Prédio 1", colorLight: "border-blue-500 bg-blue-50 text-[#0b5ed7]", colorDark: "border-blue-500 bg-blue-500/10 text-blue-400" },
        terca: null,
        quarta: { materia: "Computação", turma: "Turma A", local: "Prédio 1", colorLight: "border-blue-500 bg-blue-50 text-[#0b5ed7]", colorDark: "border-blue-500 bg-blue-500/10 text-blue-400" },
        quinta: null,
        sexta: { materia: "Reforço Lab", turma: "Turma A", local: "Lab 2", colorLight: "border-sky-500 bg-sky-50 text-sky-700", colorDark: "border-sky-500 bg-sky-500/10 text-sky-400" },
      },
      noite1: {
        segunda: null,
        terca: { materia: "Inteligência Artificial", turma: "Turma B", local: "Prédio 2", colorLight: "border-pink-500 bg-pink-50 text-pink-700", colorDark: "border-amber-600 bg-amber-600/10 text-amber-400" },
        quarta: null,
        quinta: { materia: "Inteligência Artificial", turma: "Turma B", local: "Prédio 2", colorLight: "border-pink-500 bg-pink-50 text-pink-700", colorDark: "border-amber-600 bg-amber-600/10 text-amber-400" },
        sexta: null,
      },
      noite2: {
        segunda: { materia: "Orientação TCC", turma: "Vários", local: "Remoto", colorLight: "border-blue-400 bg-blue-50 text-[#0b5ed7]", colorDark: "border-cyan-600 bg-cyan-600/10 text-cyan-400" },
        terca: { materia: "Lab de IA", turma: "Turma B", local: "Lab 4", colorLight: "border-pink-500 bg-pink-50 text-pink-700", colorDark: "border-orange-600 bg-orange-600/10 text-orange-400" },
        quarta: null,
        quinta: { materia: "Lab de IA", turma: "Turma B", local: "Lab 4", colorLight: "border-pink-500 bg-pink-50 text-pink-700", colorDark: "border-orange-600 bg-orange-600/10 text-orange-400" },
        sexta: null,
      }
    }
  });

  const processarComandoIA = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setPrompt(""); 
    } catch (error) {
      console.error("Erro ao processar comando da IA:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`${isDarkMode ? 'dark bg-[#0f1115] text-gray-300' : 'bg-gray-300 text-gray-700'} min-h-screen font-sans p-4 md:p-6 transition-colors duration-300`}>
      
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 lg:flex-row">
        
        {/* BARRA LATERAL (SIDEBAR) */}
         <aside className="w-full lg:w-64 flex flex-col bg-white dark:bg-[#161b22] rounded-xl shadow-sm dark:shadow-none border border-gray-200 dark:border-gray-800 p-5 shrink-0 transition-colors duration-300 lg:h-[calc(100vh-48px)] lg:sticky lg:top-6">
          <div style={{ maxWidth: '300px' }}>
            <Image
              src="/eniac-logo.png"
              alt="Logo ENIAC"
              width={160}
              height={50}
              className="object-contain"
            />
          </div>

          <div className="mt-4 mb-7">
            <h1 className="text-xl font-bold tracking-tight text-[#0047b3] dark:text-white">PORTAL DO PROFESSOR</h1>
            <p className="text-[10px] text-gray-400 dark:text-blue-400 font-bold uppercase tracking-widest mt-1">Ambiente Docente</p>
          </div>
          
          <nav className="flex-1 space-y-1">
            <Link href="/perfil_professor" className="block w-full">
              <NavItem icon={<Bot size={18}/>} label="Perfil"/>
            </Link>
            <NavItem icon={<FileText size={18}/>} label="Minhas Matérias" />
            <NavItem icon={<GraduationCap size={18}/>} label="Avaliação Anual" />
            <NavItem icon={<Bot size={18}/>} label="Assistente IA" active />
          </nav>

          <div className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-800 space-y-4 text-[11px]">
            <div className="text-gray-500 font-bold uppercase tracking-wider flex items-center gap-1">
              <span>⚠️</span> Avisos Gerais
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-gray-700 dark:text-gray-300 font-semibold">Notas</p>
                <p className="text-gray-400 dark:text-gray-500 leading-tight">Lançamento até o 5º dia útil.</p>
              </div>
              <div>
                <p className="text-gray-700 dark:text-gray-300 font-semibold">Substituição</p>
                <p className="text-gray-400 dark:text-gray-500 leading-tight">Aviso com 48h de antecedência.</p>
              </div>
            </div>
  
            <div className="pt-4 border-t border-gray-200 dark:border-gray-800 flex flex-col gap-1">
              <div className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg cursor-pointer text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-white transition-colors">
                <Headphones size={16} /> <span className="text-xs font-medium">Suporte</span>
              </div>
              <div className="flex items-center gap-3 px-3 py-2 hover:bg-red-50 dark:hover:bg-red-950/30 text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 rounded-lg cursor-pointer transition-colors">
                <LogOut size={16} /> <span className="text-xs font-medium">Sair</span>
              </div>
            </div>
          </div>
        </aside>

        {/* CONTEÚDO CENTRAL PRINCIPAL */}
        <main className="flex-1 flex flex-col min-w-0">
          
          {/* HEADER SUPERIOR TRAVADO NO TOPO (STICKY) */}
          <header className="flex flex-wrap justify-between items-center mb-6 py-3 px-4 sticky top-0 z-50 bg-[#f4f6f9]/80 dark:bg-[#0f1115]/80 backdrop-blur-md rounded-xl border border-transparent dark:border-gray-900 gap-3 transition-colors duration-300">
            <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 tracking-wide shrink-0 uppercase">
              Gerador de Grade com IA
            </h2>
            
            <div className="flex items-center gap-4 flex-nowrap justify-end py-1">
              {/* Alternador de Tema */}
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 bg-white dark:bg-[#161b22] border border-gray-200 dark:border-gray-800 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors shrink-0"
                title="Alternar Tema"
              >
                {isDarkMode ? <Sun size={17} className="text-yellow-500" /> : <Moon size={17} />}
              </button>

              <button className="p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-white transition-colors shrink-0">
                <Bell size={18}/>
              </button>
              
              <button className="p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-white transition-colors shrink-0">
                <Settings size={18}/>
              </button>
              
              <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-200 dark:border-gray-700 shrink-0">
                <img src="/professor1.jpeg" alt="Avatar" className="w-full h-full object-cover" />
              </div>
            </div>
          </header>

          {/* Título da página */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white tracking-tight">Gerador de Grade com IA</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Utilize o poder da IA para organizar automaticamente sua semana acadêmica. Descreva suas aulas, locais e turmas abaixo para obter uma grade sem conflitos.
            </p>
          </div>

          <div className="space-y-6 w-full">
            
            {/* TABELA CONTAINER */}
            <div className="bg-white dark:bg-[#161b22] border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-sm dark:shadow-none w-full transition-colors duration-300">
              <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-[#24292f]/20">
                <div className="flex items-center gap-2 text-gray-700 dark:text-orange-400 font-bold text-xs uppercase tracking-wider">
                  <Calendar size={16} className="text-blue-600 dark:text-orange-500" /> Grade Horária Proposta
                </div>
                <div className="flex items-center gap-2">
                  <button className="bg-[#0B5ED7] hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 rounded-lg flex items-center gap-1.5 transition-colors shadow-sm">
                    Publicar
                  </button>
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-white rounded-md transition-colors"><Download size={14}/></button>
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-white rounded-md transition-colors"><Printer size={14}/></button>
                </div>
              </div>

              {/* TABELA DE HORÁRIOS */}
              <div className="overflow-x-auto w-full">
                <table className="w-full text-left border-collapse min-w-230 lg:min-w-0">
                  <thead>
                    <tr className="text-[10px] uppercase text-gray-500 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#0f1115]/40 font-bold tracking-wider">
                      <th className="p-4 w-[15%]">Turno / Horário</th>
                      <th className="p-4 w-[17%]">Segunda</th>
                      <th className="p-4 w-[17%]">Terça</th>
                      <th className="p-4 w-[17%]">Quarta</th>
                      <th className="p-4 w-[17%]">Quinta</th>
                      <th className="p-4 w-[17%]">Sexta</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs">
                    {/* LINHA MANHÃ */}
                    <tr className="border-b border-gray-200 dark:border-gray-800/60 hover:bg-gray-50/50 dark:hover:bg-gray-800/5 transition-colors">
                      <td className="p-4 bg-gray-50/30 dark:bg-[#0f1115]/20 border-r border-gray-200 dark:border-gray-800/40">
                        <span className="block font-bold text-gray-800 dark:text-white text-sm">Manhã</span>
                        <span className="text-[10px] text-gray-400 font-medium">07:00 - 09:00</span>
                      </td>
                      <td className="p-2"><AulaCardContainer aula={gradeGerada.horarios.manha.segunda} isDarkMode={isDarkMode} /></td>
                      <td className="p-2"><AulaCardContainer aula={gradeGerada.horarios.manha.terca} isDarkMode={isDarkMode} /></td>
                      <td className="p-2"><AulaCardContainer aula={gradeGerada.horarios.manha.quarta} isDarkMode={isDarkMode} /></td>
                      <td className="p-2"><AulaCardContainer aula={gradeGerada.horarios.manha.quinta} isDarkMode={isDarkMode} /></td>
                      <td className="p-2"><AulaCardContainer aula={gradeGerada.horarios.manha.sexta} isDarkMode={isDarkMode} /></td>
                    </tr>
                    
                    {/* SEPARADOR DE REUNIÕES PEDAGÓGICAS */}
                    <tr className="bg-amber-50/40 dark:bg-[#a37c45]/5 text-amber-800 dark:text-[#a37c45] border-b border-gray-200 dark:border-gray-800/60">
                      <td colSpan={6} className="p-2.5 text-center text-[9px] font-bold uppercase tracking-widest bg-amber-50 dark:bg-[#1c1a16]/20">
                        👥 Reuniões Pedagógicas &amp; Planejamento
                      </td>
                    </tr>

                    {/* LINHA NOITE 1 */}
                    <tr className="border-b border-gray-200 dark:border-gray-800/60 hover:bg-gray-50/50 dark:hover:bg-gray-800/5 transition-colors">
                      <td className="p-4 bg-gray-50/30 dark:bg-[#0f1115]/20 border-r border-gray-200 dark:border-gray-800/40">
                        <span className="block font-bold text-gray-800 dark:text-white text-sm">Noite 1</span>
                        <span className="text-[10px] text-gray-400 font-medium">18:00 - 20:00</span>
                      </td>
                      <td className="p-2"><AulaCardContainer aula={gradeGerada.horarios.noite1.segunda} isDarkMode={isDarkMode} /></td>
                      <td className="p-2"><AulaCardContainer aula={gradeGerada.horarios.noite1.terca} isDarkMode={isDarkMode} /></td>
                      <td className="p-2"><AulaCardContainer aula={gradeGerada.horarios.noite1.quarta} isDarkMode={isDarkMode} /></td>
                      <td className="p-2"><AulaCardContainer aula={gradeGerada.horarios.noite1.quinta} isDarkMode={isDarkMode} /></td>
                      <td className="p-2"><AulaCardContainer aula={gradeGerada.horarios.noite1.sexta} isDarkMode={isDarkMode} /></td>
                    </tr>

                    {/* LINHA NOITE 2 */}
                    <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-800/5 transition-colors">
                      <td className="p-4 bg-gray-50/30 dark:bg-[#0f1115]/20 border-r border-gray-200 dark:border-gray-800/40">
                        <span className="block font-bold text-gray-800 dark:text-white text-sm">Noite 2</span>
                        <span className="text-[10px] text-gray-400 font-medium">20:00 - 22:00</span>
                      </td>
                      <td className="p-2"><AulaCardContainer aula={gradeGerada.horarios.noite2.segunda} isDarkMode={isDarkMode} /></td>
                      <td className="p-2"><AulaCardContainer aula={gradeGerada.horarios.noite2.terca} isDarkMode={isDarkMode} /></td>
                      <td className="p-2"><AulaCardContainer aula={gradeGerada.horarios.noite2.quarta} isDarkMode={isDarkMode} /></td>
                      <td className="p-2"><AulaCardContainer aula={gradeGerada.horarios.noite2.quinta} isDarkMode={isDarkMode} /></td>
                      <td className="p-2"><AulaCardContainer aula={gradeGerada.horarios.noite2.sexta} isDarkMode={isDarkMode} /></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* SEÇÃO INFERIOR: INPUT E CARDS DE STATUS ALINHADOS IGUAL À FOTO */}
            <div className="grid grid-cols-12 gap-6 w-full items-start">
              
              {/* CAIXA DE PROMPT DA IA (COLUNA MAIOR DA ESQUERDA) */}
              <div className="col-span-12 lg:col-span-8 bg-white dark:bg-[#161b22] border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-sm dark:shadow-none transition-colors duration-300">
                <div className="flex items-center gap-2 text-gray-700 dark:text-white font-bold text-xs uppercase tracking-wider mb-3">
                  🤖 Detalhes de Entrada
                </div>
                <form onSubmit={processarComandoIA} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Prompt de Aulas</label>
                    <div className="relative">
                      <textarea 
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        disabled={isLoading}
                        rows={4}
                        placeholder='Ex: "Ensino computação para Turma A no Prédio 1, e IA para Turma B no Lab 4. Preciso de manhãs livres nas quartas."'
                        className="w-full bg-gray-50 dark:bg-[#1c2128] border border-gray-200 dark:border-gray-800 rounded-lg p-4 text-xs text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-blue-500/50 disabled:opacity-50 transition-colors resize-none font-medium leading-relaxed"
                      />
                      {isLoading && (
                        <div className="absolute inset-0 bg-white/80 dark:bg-[#1c2128]/80 rounded-lg flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                          <Loader2 size={16} className="animate-spin text-blue-500" />
                          <span>Sua Secretária IA está montando os horários...</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button 
                      type="submit" 
                      disabled={isLoading || !prompt.trim()}
                      className="bg-[#0B5ED7] hover:bg-blue-700 disabled:bg-gray-100 dark:disabled:bg-gray-800 text-white disabled:text-gray-400 px-5 py-2.5 rounded-lg font-bold text-xs flex items-center gap-2 transition-colors uppercase tracking-wider shadow-sm"
                    >
                      <Sparkles size={14} /> Gerar Grade com IA
                    </button>
                  </div>
                </form>
              </div>

              {/* COLUNA DOS CARDS DE STATUS (ALINHADOS À DIREITA EXATAMENTE COMO NA FOTO) */}
              <div className="col-span-12 lg:col-span-4 flex flex-col gap-3 w-full">
                <StatusCard label="Carga Semestral" value={gradeGerada.carga} sub="/ aula" isDarkMode={isDarkMode} />
                <StatusCard label="Turmas Ativas" value={gradeGerada.turmas} isDarkMode={isDarkMode} />
                <StatusCard label="Conflitos" value={gradeGerada.conflitos} colorLight="text-green-600" colorDark="text-green-500" isDarkMode={isDarkMode} />
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// Subcomponente auxiliar de renderização condicional do Card de Aula
function AulaCardContainer({ aula, isDarkMode }: { aula: Aula | null; isDarkMode: boolean }) {
  if (!aula) {
    return <span className="p-2.5 text-gray-400 dark:text-gray-700 italic block font-medium">Disponível</span>;
  }
  return <AulaCard {...aula} isDarkMode={isDarkMode} />;
}

// Subcomponentes auxiliares de design customizados
function NavItem({ icon, label, active = false }: NavItemProps) {
  return (
    <div className={`flex items-center gap-3 px-4 py-2.5 rounded-lg cursor-pointer transition-all ${
      active 
        ? 'bg-blue-50 dark:bg-blue-500/10 text-[#0052cc] dark:text-blue-400 border border-transparent dark:border-blue-500/20 font-semibold' 
        : 'hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400'
    }`}>
      {icon} <span className="text-xs font-medium">{label}</span>
    </div>
  );
}

function AulaCard({ materia, turma, local, colorLight, colorDark, isDarkMode }: Aula & { isDarkMode: boolean }) {
  return (
    <div className={`border-l-4 ${isDarkMode ? colorDark : colorLight} p-2.5 rounded-r-lg shadow-sm transition-transform hover:scale-[1.01] text-inherit`}>
      <h4 className="font-bold text-xs tracking-wide leading-tight text-inherit">{materia}</h4>
      <p className="text-[10px] mt-0.5 font-medium whitespace-nowrap text-inherit opacity-90">{turma} • {local}</p>
    </div>
  );
}

function StatusCard({ label, value, sub, colorLight = "text-gray-800", colorDark = "text-white", isDarkMode = false }: StatusCardProps & { isDarkMode?: boolean }) {
  return (
    <div className="bg-white dark:bg-[#161b22] border border-gray-200 dark:border-gray-800 p-4 rounded-xl flex flex-col shadow-sm dark:shadow-none w-full transition-colors duration-300">
      <p className="text-[9px] uppercase font-bold text-gray-400 mb-1 tracking-wider">{label}</p>
      <div className="flex items-baseline gap-1">
        <span className={`text-xl font-bold tracking-tight ${isDarkMode ? colorDark : colorLight}`}>{value}</span>
        {sub && <span className="text-[10px] text-blue-600 dark:text-blue-400 font-bold">{sub}</span>}
      </div>
    </div>
  );
}