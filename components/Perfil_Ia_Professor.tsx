'use client';

import React, {useState} from 'react';
import { useRouter } from 'next/navigation';
import { useThemeStorage } from "../lib/useThemeStorage";
import Image from 'next/image';
import Link from 'next/link';
import {
  Bell,
  Bot,
  Calendar,
  Clock,
  Download,
  FileText,
  GraduationCap,
  Headphones,
  Loader2,
  LogOut,
  MapPin,
  Moon,
  Plus,
  Printer,
  Search,
  Settings,
  Sparkles,
  Sun,
  User,
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

interface StatusCardProps {
  label: string;
  value: string;
  sub?: string;
  colorLight?: string;
  colorDark?: string;
  isDarkMode?: boolean;
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

export default function GeradorGradeIA() {
  const router = useRouter();
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { isDarkMode, toggleTheme } = useThemeStorage();

  const [gradeGerada, setGradeGerada] = useState<GradeSemanal>({
    carga: '24h',
    turmas: '02',
    conflitos: 'Zero',
    horarios: {
      manha: {
        segunda: { materia: 'Computação', turma: 'Turma A', local: 'Prédio 1', colorLight: 'border-blue-500 bg-blue-50 text-[#0b5ed7]', colorDark: 'border-blue-500 bg-blue-500/10 text-blue-400' },
        terca: null,
        quarta: { materia: 'Computação', turma: 'Turma A', local: 'Prédio 1', colorLight: 'border-blue-500 bg-blue-50 text-[#0b5ed7]', colorDark: 'border-blue-500 bg-blue-500/10 text-blue-400' },
        quinta: null,
        sexta: { materia: 'Reforço Lab', turma: 'Turma A', local: 'Lab 2', colorLight: 'border-sky-500 bg-sky-50 text-sky-700', colorDark: 'border-sky-500 bg-sky-500/10 text-sky-400' },
      },
      noite1: {
        segunda: null,
        terca: { materia: 'Inteligência Artificial', turma: 'Turma B', local: 'Prédio 2', colorLight: 'border-pink-500 bg-pink-50 text-pink-700', colorDark: 'border-pink-500 bg-pink-600/10 text-pink-700' },
        quarta: null,
        quinta: { materia: 'Inteligência Artificial', turma: 'Turma B', local: 'Prédio 2', colorLight: 'border-pink-500 bg-pink-50 text-pink-700', colorDark: 'border-pink-500 bg-pink-600/10 text-pink-700' },
        sexta: null,
      },
      noite2: {
        segunda: { materia: 'Orientação TCC', turma: 'Vários', local: 'Remoto', colorLight: 'border-blue-400 bg-blue-50 text-[#0b5ed7]', colorDark: 'border-cyan-600 bg-cyan-600/10 text-cyan-400' },
        terca: { materia: 'Lab de IA', turma: 'Turma B', local: 'Lab 4', colorLight: 'border-pink-500 bg-pink-50 text-pink-700', colorDark: 'border-pink-500 bg-pink-600/10 text-pink-700' },
        quarta: null,
        quinta: { materia: 'Lab de IA', turma: 'Turma B', local: 'Lab 4', colorLight: 'border-pink-500 bg-pink-50 text-pink-700', colorDark: 'border-pink-500 bg-pink-600/10 text-pink-700' },
        sexta: null,
      },
    },
  });

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
        <aside className="w-64 flex flex-col bg-white dark:bg-[#161b22] rounded-xl shadow-sm dark:shadow-none border border-gray-200 dark:border-gray-800 p-5 shrink-0 transition-colors duration-300 h-full lg:sticky lg:top-6">
          <div className="flex justify-center w-full mb-5">
            <Image
              src="/eniac-logo.png"
              alt="Logo ENIAC"
              width={160}
              height={50}
              className={isDarkMode ? "brightness-0 invert" : ""}
            />
          </div>

          <div className="mb-7 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-[#0047b3] dark:text-[#0c6cfb]">PORTAL DO PROFESSOR</h1>
            <p className="mt-1 text-[11px] text-gray-500 dark:text-white font-bold uppercase tracking-widest">Ambiente Docente</p>
          </div>

          <nav className="flex-1 space-y-1">
            <Link href="/perfil_professor" className="block w-full">
              <NavItem icon={<User size={18} />} label="Perfil" />
            </Link>
            <NavItem icon={<FileText size={18} />} label="Minhas Matérias" />
            <NavItem icon={<GraduationCap size={18} />} label="Avaliação Anual" />
            <NavItem icon={<Bot size={18} />} label="Assistente IA" active />
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
              className="flex items-center gap-3 px-3 py-2 hover:bg-red-50 dark:hover:bg-red-950/30 text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 rounded-lg cursor-pointer transition-colors">
                <LogOut size={16} /> <span className="text-sm font-medium">Sair</span>
              </div>
            </div>
          </div>
        </aside>

        {/* ÁREA PRINCIPAL CONTAINER */}
        <main className="flex min-h-0 flex-1 flex-col overflow-hidden">

          {/* HEADER FIXO NO TOPO */}
          <header className="flex justify-between items-center mb-6 py-3 px-4 bg-white/80 dark:bg-[#161b22]/80 backdrop-blur-md rounded-xl border border-gray-200 dark:border-gray-800 gap-4 transition-colors duration-300 shrink-0">
            <h2 className="text-xl font-semibold tracking-wide text-gray-800 dark:text-white shrink-0">
              Assistente IA
            </h2>

            <div className="flex items-center gap-4 flex-nowrap justify-end py-1">
              {/* Barra de Pesquisa */}
              <div className="relative w-64 shrink-0">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar no portal..."
                  className="w-full pl-9 pr-4 py-2 bg-[#e9ecef] dark:bg-[#1c2128] border border-transparent dark:border-gray-800 rounded-lg text-sm focus:outline-none focus:bg-white dark:focus:bg-[#161b22] focus:border-gray-300 dark:focus:border-gray-700 text-gray-700 dark:text-gray-300 transition-all placeholder-gray-400"
                />
              </div>

              {/* Alternador de Tema */}
              <button
                onClick={toggleTheme}
                className="p-2 bg-white dark:bg-[#161b22] border border-gray-200 dark:border-gray-800 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-800 dark:hover:bg-gray-500 transition-colors shrink-0"
                title="Alternar Tema"
              >
                {isDarkMode ? <Sun size={17} className="text-yellow-500" /> : <Moon size={17} />}
              </button>

              {/* Notificações */}
              <button className="p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-white transition-colors relative shrink-0">
                <Bell size={18} />
                <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
              </button>

              {/* Avatar */}
              <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-200 dark:border-gray-700 shrink-0">
                <img src="/professor1.jpeg" alt="Avatar" className="w-full h-full object-cover" />
              </div>
            </div>
          </header>

          {/* CONTEÚDO EM COLUNA ÚNICA (ROLA TOTALMENTE NA VERTICAL) */}
          <div className="flex-1 overflow-y-auto pr-2 pb-6 space-y-6 scrollbar-thin dark:scrollbar-thumb-gray-800 scrollbar-thumb-gray-200">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-800 dark:text-white">Gerador de Grade com IA</h1>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Utilize o poder da IA para organizar automaticamente sua semana acadêmica.</p>
            </div>

            {/* TABELA DE GRADE HORÁRIA (OCUPA 100% DA LARGURA) */}
            <section className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-colors duration-300 dark:border-gray-800 dark:bg-[#161b22]">
              <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50/50 p-4 dark:border-gray-800 dark:bg-[#24292f]/20">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-200">
                  <Calendar size={16} className="text-blue-600 dark:text-blue-500" /> Grade Horária Proposta
                </div>
                <div className="flex items-center gap-2">
                  <button className="rounded-lg bg-[#0B5ED7] px-4 py-2 text-xs font-bold text-white shadow-sm transition-colors hover:bg-blue-700">Publicar</button>
                  <button className="rounded-md p-2 text-gray-400 transition-colors hover:bg-gray-600 hover:text-white dark:hover:bg-gray-800 dark:hover:text-gray-100"><Download size={14} /></button>
                  <button className="rounded-md p-2 text-gray-400 transition-colors hover:bg-gray-600 hover:text-white dark:hover:bg-gray-800 dark:hover:text-gray-100"><Printer size={14} /></button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50 text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:border-gray-800 dark:bg-[#0f1115]/40 dark:text-gray-400">
                      <th className="w-[15%] p-4">Turno / Horário</th>
                      <th className="w-[17%] p-4">Segunda</th>
                      <th className="w-[17%] p-4">Terça</th>
                      <th className="w-[17%] p-4">Quarta</th>
                      <th className="w-[17%] p-4">Quinta</th>
                      <th className="w-[17%] p-4">Sexta</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs">
                    <tr className="border-b border-gray-200 transition-colors hover:bg-gray-50/50 dark:border-gray-800/60 dark:hover:bg-gray-800/5">
                      <td className="border-r border-gray-200 bg-gray-50/30 p-4 dark:border-gray-800/40 dark:bg-[#0f1115]/20"><span className="block text-sm font-bold text-gray-800 dark:text-white">Manhã</span><span className="text-[10px] font-medium text-gray-400">07:00 - 09:00</span></td>
                      <td className="p-2"><AulaCardContainer aula={gradeGerada.horarios.manha.segunda} isDarkMode={isDarkMode} /></td>
                      <td className="p-2"><AulaCardContainer aula={gradeGerada.horarios.manha.terca} isDarkMode={isDarkMode} /></td>
                      <td className="p-2"><AulaCardContainer aula={gradeGerada.horarios.manha.quarta} isDarkMode={isDarkMode} /></td>
                      <td className="p-2"><AulaCardContainer aula={gradeGerada.horarios.manha.quinta} isDarkMode={isDarkMode} /></td>
                      <td className="p-2"><AulaCardContainer aula={gradeGerada.horarios.manha.sexta} isDarkMode={isDarkMode} /></td>
                    </tr>
                    <tr className="border-b border-gray-200 bg-amber-50/40 text-amber-800 dark:border-gray-800/60 dark:bg-[#a37c45]/5 dark:text-[#a37c45]">
                      <td colSpan={6} className="bg-amber-50 p-2.5 text-center text-[9px] font-bold uppercase tracking-widest dark:bg-[#1c1a16]/20">👥 Reuniões Pedagógicas &amp; Planejamento</td>
                    </tr>
                    <tr className="border-b border-gray-200 transition-colors hover:bg-gray-50/50 dark:border-gray-800/60 dark:hover:bg-gray-800/5">
                      <td className="border-r border-gray-200 bg-gray-50/30 p-4 dark:border-gray-800/40 dark:bg-[#0f1115]/20"><span className="block text-sm font-bold text-gray-800 dark:text-white">Noite 1</span><span className="text-[10px] font-medium text-gray-400">18:00 - 20:00</span></td>
                      <td className="p-2"><AulaCardContainer aula={gradeGerada.horarios.noite1.segunda} isDarkMode={isDarkMode} /></td>
                      <td className="p-2"><AulaCardContainer aula={gradeGerada.horarios.noite1.terca} isDarkMode={isDarkMode} /></td>
                      <td className="p-2"><AulaCardContainer aula={gradeGerada.horarios.noite1.quarta} isDarkMode={isDarkMode} /></td>
                      <td className="p-2"><AulaCardContainer aula={gradeGerada.horarios.noite1.quinta} isDarkMode={isDarkMode} /></td>
                      <td className="p-2"><AulaCardContainer aula={gradeGerada.horarios.noite1.sexta} isDarkMode={isDarkMode} /></td>
                    </tr>
                    <tr className="transition-colors hover:bg-gray-50/50 dark:hover:bg-gray-800/5">
                      <td className="border-r border-gray-200 bg-gray-50/30 p-4 dark:border-gray-800/40 dark:bg-[#0f1115]/20"><span className="block text-sm font-bold text-gray-800 dark:text-white">Noite 2</span><span className="text-[10px] font-medium text-gray-400">20:00 - 22:00</span></td>
                      <td className="p-2"><AulaCardContainer aula={gradeGerada.horarios.noite2.segunda} isDarkMode={isDarkMode} /></td>
                      <td className="p-2"><AulaCardContainer aula={gradeGerada.horarios.noite2.terca} isDarkMode={isDarkMode} /></td>
                      <td className="p-2"><AulaCardContainer aula={gradeGerada.horarios.noite2.quarta} isDarkMode={isDarkMode} /></td>
                      <td className="p-2"><AulaCardContainer aula={gradeGerada.horarios.noite2.quinta} isDarkMode={isDarkMode} /></td>
                      <td className="p-2"><AulaCardContainer aula={gradeGerada.horarios.noite2.sexta} isDarkMode={isDarkMode} /></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* BLOCO INFERIOR: INPUT IA + STATUS CARDS */}
            <div className="grid w-full grid-cols-12 items-start gap-6">

              {/* SEÇÃO DO PROMPT DA IA (70% DA LARGURA INFERIOR) */}
              <section className="col-span-12 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-colors duration-300 dark:border-gray-800 dark:bg-[#161b22] lg:col-span-8">
                <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-white">🤖 Detalhes de Entrada</div>
                <form onSubmit={processarComandoIA} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Prompt de Aulas</label>
                    <div className="relative">
                      <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} disabled={isLoading} rows={4} placeholder='Ex: "Ensino computação para Turma A no Prédio 1, e IA para Turma B no Lab 4. Preciso de manhãs livres nas quartas."' className="w-full resize-none rounded-lg border border-gray-200 bg-gray-50 p-4 text-xs leading-relaxed text-gray-800 placeholder-gray-400 transition-colors focus:border-blue-500/50 focus:outline-none disabled:opacity-50 dark:border-gray-800 dark:bg-[#1c2128] dark:text-white dark:placeholder-gray-600" />
                      {isLoading && <div className="absolute inset-0 flex items-center justify-center gap-2 rounded-lg bg-white/80 text-xs text-gray-500 dark:bg-[#1c2128]/80 dark:text-gray-400"><Loader2 size={16} className="animate-spin text-blue-500" /><span>Sua Secretária IA está montando os horários...</span></div>}
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button type="submit" disabled={isLoading || !prompt.trim()} className="flex items-center gap-2 rounded-lg bg-[#0B5ED7] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-colors hover:bg-blue-700 disabled:bg-gray-100 disabled:text-gray-400 dark:disabled:bg-gray-800"> <Sparkles size={14} /> Gerar Grade com IA </button>
                  </div>
                </form>
              </section>

              {/* CARDS DE STATUS (30% DA LARGURA INFERIOR, COMO NO INÍCIO) */}
              <div className="col-span-12 flex flex-col gap-3 lg:col-span-4">
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

function AulaCardContainer({ aula, isDarkMode }: { aula: Aula | null; isDarkMode: boolean }) {
  if (!aula) return <span className="block p-2.5 text-gray-400 italic dark:text-gray-700">Disponível</span>;
  return <AulaCard {...aula} isDarkMode={isDarkMode} />;
}

function AulaCard({ materia, turma, local, colorLight, colorDark, isDarkMode }: Aula & { isDarkMode: boolean }) {
  return (
    <div className={`rounded-r-lg border-l-4 p-2.5 shadow-sm transition-transform hover:scale-[1.01] ${isDarkMode ? colorDark : colorLight}`}>
      <h4 className="text-xs font-bold uppercase tracking-wide text-inherit">{materia}</h4>
      <p className="mt-0.5 whitespace-nowrap text-[10px] font-medium text-inherit opacity-90">{turma} • {local}</p>
    </div>
  );
}

function StatusCard({ label, value, sub, colorLight = 'text-gray-800', colorDark = 'text-white', isDarkMode = false }: StatusCardProps) {
  return (
    <div className="w-full rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-colors duration-300 dark:border-gray-800 dark:bg-[#161b22]">
      <p className="mb-1 text-[9px] font-bold uppercase tracking-wider text-gray-400">{label}</p>
      <div className="flex items-baseline gap-1">
        <span className={`text-xl font-bold tracking-tight ${isDarkMode ? colorDark : colorLight}`}>{value}</span>
        {sub && <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400">{sub}</span>}
      </div>
    </div>
  );
}

function NavItem({ icon, label, active = false }: NavItemProps) {
  return (
    <div className={`flex w-full items-center gap-3 rounded-lg px-4 py-2.5 transition-all ${active ? 'bg-blue-50 font-semibold text-[#0052cc] dark:bg-blue-500/10 dark:text-blue-400' : 'text-gray-500 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800'}`}>
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}