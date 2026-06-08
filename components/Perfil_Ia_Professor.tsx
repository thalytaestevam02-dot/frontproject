'use client';

import React, { useState } from 'react';
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
  Users,
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
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

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
        terca: { materia: 'Inteligência Artificial', turma: 'Turma B', local: 'Prédio 2', colorLight: 'border-pink-500 bg-pink-50 text-pink-700', colorDark: 'border-amber-600 bg-amber-600/10 text-amber-400' },
        quarta: null,
        quinta: { materia: 'Inteligência Artificial', turma: 'Turma B', local: 'Prédio 2', colorLight: 'border-pink-500 bg-pink-50 text-pink-700', colorDark: 'border-amber-600 bg-amber-600/10 text-amber-400' },
        sexta: null,
      },
      noite2: {
        segunda: { materia: 'Orientação TCC', turma: 'Vários', local: 'Remoto', colorLight: 'border-blue-400 bg-blue-50 text-[#0b5ed7]', colorDark: 'border-cyan-600 bg-cyan-600/10 text-cyan-400' },
        terca: { materia: 'Lab de IA', turma: 'Turma B', local: 'Lab 4', colorLight: 'border-pink-500 bg-pink-50 text-pink-700', colorDark: 'border-orange-600 bg-orange-600/10 text-orange-400' },
        quarta: null,
        quinta: { materia: 'Lab de IA', turma: 'Turma B', local: 'Lab 4', colorLight: 'border-pink-500 bg-pink-50 text-pink-700', colorDark: 'border-orange-600 bg-orange-600/10 text-orange-400' },
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
    <div className={`${isDarkMode ? 'dark bg-[#0f1115] text-gray-300' : 'bg-gray-300 text-gray-700'} min-h-screen font-sans p-4 md:p-6 transition-colors duration-300`}>
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 lg:flex-row">
        <aside className="w-full shrink-0 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-colors duration-300 dark:border-gray-800 dark:bg-[#161b22] lg:top-6 lg:h-[calc(100vh-55px)] lg:w-64 lg:sticky lg:flex lg:flex-col">
          <div style={{ maxWidth: '300px' }}>
            <Image src="/eniac-logo.png" alt="Logo ENIAC" width={160} height={50} className="object-contain" />
          </div>

          <div className="mt-4 mb-7">
            <h1 className="text-xl font-bold tracking-tight text-[#0047b3] dark:text-white">PORTAL DO PROFESSOR</h1>
            <p className="mt-1 text-[12px] font-bold uppercase tracking-widest text-gray-400 dark:text-blue-400">Ambiente Docente</p>
          </div>

          <nav className="flex-1 space-y-1">
            <Link href="/perfil_professor" className="block w-full">
              <NavItem icon={<Bot size={18} />} label="Perfil" />
            </Link>
            <NavItem icon={<FileText size={18} />} label="Minhas Matérias" />
            <NavItem icon={<GraduationCap size={18} />} label="Avaliação Anual" />
            <NavItem icon={<Bot size={18} />} label="Assistente IA" active />
          </nav>

          <div className="mt-auto space-y-4 border-t border-gray-200 pt-6 text-[14px] dark:border-gray-800">
            <div className="flex items-center gap-1 font-bold uppercase tracking-wider text-gray-500">⚠️ Avisos Gerais</div>
            <div className="space-y-3">
              <div>
                <p className="font-semibold text-gray-700 dark:text-gray-300">Notas</p>
                <p className="text-gray-400 leading-tight dark:text-gray-500">Lançamento até o 5º dia útil.</p>
              </div>
              <div>
                <p className="font-semibold text-gray-700 dark:text-gray-300">Substituição</p>
                <p className="text-gray-400 leading-tight dark:text-gray-500">Aviso com 48h de antecedência.</p>
              </div>
            </div>

            <div className="flex flex-col gap-1 border-t border-gray-200 pt-4 dark:border-gray-800">
              <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:text-gray-500 dark:hover:bg-gray-800 dark:hover:text-white cursor-pointer">
                <Headphones size={16} /> <span className="text-xs font-medium">Suporte</span>
              </div>
              <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500 dark:text-gray-500 dark:hover:bg-red-950/30 dark:hover:text-red-400 cursor-pointer">
                <LogOut size={16} /> <span className="text-xs font-medium">Sair</span>
              </div>
            </div>
          </div>
        </aside>

        <main className="flex min-w-0 flex-1 flex-col">
          <header className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-transparent bg-[#f4f6f9]/80 px-4 py-3 backdrop-blur-md transition-colors duration-300 dark:border-gray-900 dark:bg-[#0f1115]/80">
            <h2 className="shrink-0 text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Gerador de Grade com IA</h2>
            <div className="flex items-center gap-4 py-1">
              <button onClick={() => setIsDarkMode(!isDarkMode)} className="shrink-0 rounded-full border border-gray-200 bg-white p-2 text-gray-500 transition-colors hover:bg-gray-100 dark:border-gray-800 dark:bg-[#161b22] dark:text-gray-400 dark:hover:bg-gray-800" title="Alternar Tema">
                {isDarkMode ? <Sun size={17} className="text-yellow-500" /> : <Moon size={17} />}
              </button>
              <button className="shrink-0 p-2 text-gray-400 transition-colors hover:text-gray-600 dark:text-gray-500 dark:hover:text-white"><Bell size={18} /></button>
              <button className="shrink-0 p-2 text-gray-400 transition-colors hover:text-gray-600 dark:text-gray-500 dark:hover:text-white"><Settings size={18} /></button>
              <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full border border-gray-200 dark:border-gray-700"><img src="/professor1.jpeg" alt="Avatar" className="h-full w-full object-cover" /></div>
            </div>
          </header>

          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight text-gray-800 dark:text-white">Gerador de Grade com IA</h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Utilize o poder da IA para organizar automaticamente sua semana acadêmica.</p>
          </div>

          <div className="w-full space-y-6">
            <section className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-colors duration-300 dark:border-gray-800 dark:bg-[#161b22]">
              <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50/50 p-4 dark:border-gray-800 dark:bg-[#24292f]/20">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-orange-400"><Calendar size={16} className="text-blue-600 dark:text-orange-500" /> Grade Horária Proposta</div>
                <div className="flex items-center gap-2">
                  <button className="rounded-lg bg-[#0B5ED7] px-4 py-2 text-xs font-bold text-white shadow-sm transition-colors hover:bg-blue-700">Publicar</button>
                  <button className="rounded-md p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-white dark:hover:bg-gray-800"><Download size={14} /></button>
                  <button className="rounded-md p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-white dark:hover:bg-gray-800"><Printer size={14} /></button>
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

            <div className="grid w-full grid-cols-12 items-start gap-6">
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
      <span className="text-xs font-medium">{label}</span>
    </div>
  );
}
