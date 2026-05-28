'use client'

import React, { useState } from 'react';
import Image from "next/image";
import { 
  User, BookOpen, Bell, Plus, Headphones, LogOut, Bot, Sun, Moon, 
  LayoutDashboard, FileText, GraduationCap, Search, Calendar, MapPin, Clock, Users, AlertTriangle
} from 'lucide-react';

// ================= TIPAGEM DAS PROPS PARA O TYPESCRIPT =================
interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

interface SubjectCardProps {
  title: string;
  quantity: number;
  status: 'Urgent' | 'Soon' | 'Regular';
  date: string;
}

interface MetricBarProps {
  label: string;
  value: number;
}

interface ClassScheduleProps {
  subject: string;
  time: string;
  room: string;
  type: 'Presencial' | 'Online';
}

interface MySubjectProps {
  name: string;
  studentsCount: number;
  progress: number;
  code: string;
}

interface ProfessorDashboardProps {
  onCliqueGerar?: () => void;
}

// ================= COMPONENTE PRINCIPAL =================
const ProfessorDashboard = ({ onCliqueGerar }: ProfessorDashboardProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className={`${isDarkMode ? 'dark bg-[#0f1115] text-gray-300' : 'bg-gray-300 text-gray-700'} min-h-screen font-sans p-6 transition-colors duration-300`}>
      <div className="max-w-350 mx-auto flex gap-6">
        
        {/* BARRA LATERAL (SIDEBAR) */}
        <aside className="w-64 flex flex-col bg-white dark:bg-[#161b22] rounded-xl shadow-sm dark:shadow-none border border-gray-200 dark:border-gray-800 p-5 shrink-0 transition-colors duration-300 h-[calc(100vh-48px)] sticky top-6">
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
            <NavItem icon={<User size={18}/>} label="Perfil" active />
            <NavItem icon={<FileText size={18}/>} label="Minhas Matérias" active />
            <NavItem icon={<GraduationCap size={18}/>} label="Avaliação Anual" active/>
            <button
              type="button"
              onClick={onCliqueGerar}
              className="block w-full text-left"
            >
              <NavItem icon={<Bot size={18}/>} label="Assistente IA" active />
            </button>
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

        {/* CONTEÚDO PRINCIPAL (MAIN) */}
        <main className="flex-1 flex flex-col min-w-0">
          <header className="flex justify-between items-center mb-6 py-3 px-4 sticky top-0 z-50 bg-[#f4f6f9]/80 dark:bg-[#0f1115]/80 backdrop-blur-md rounded-xl border border-transparent dark:border-gray-900 gap-4 transition-colors duration-300">
            <h2 className="text-lg font-semibold text-gray-500 dark:text-gray-400 tracking-wide shrink-0">
              Perfil do Professor
            </h2>
            
            {/* Container da Direita com flex-nowrap impede quebras */}
            <div className="flex items-center gap-4 flex-nowrap justify-end overflow-x-auto scrollbar-none py-1">
              
              {/* Barra de Pesquisa */}
              <div className="relative w-64 shrink-0">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Buscar no portal..." 
                  className="w-full pl-9 pr-4 py-2 bg-[#e9ecef] dark:bg-[#1c2128] border border-transparent dark:border-gray-800 rounded-lg text-xs focus:outline-none focus:bg-white dark:focus:bg-[#161b22] focus:border-gray-300 dark:focus:border-gray-700 text-gray-700 dark:text-gray-300 transition-all placeholder-gray-400"
                />
              </div>

              {/* Alternador de Tema */}
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 bg-white dark:bg-[#161b22] border border-gray-200 dark:border-gray-800 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors shrink-0"
                title="Alternar Tema"
              >
                {isDarkMode ? <Sun size={17} className="text-yellow-500" /> : <Moon size={17} />}
              </button>

              {/* Notificações */}
              <button className="p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-white transition-colors relative shrink-0">
                <Bell size={18}/>
                <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
              </button>
              
              {/* Avatar */}
              <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-200 dark:border-gray-700 shrink-0">
                <img src="/professor1.jpeg" alt="Avatar" className="w-full h-full object-cover" />
              </div>
            </div>
          </header>

          {/* GRID DE CONTEÚDO */}
          <div className="grid grid-cols-12 gap-6">
            
            {/* COLUNA DA ESQUERDA */}
            <div className="col-span-8 space-y-6">
              
              {/* CARD DE PERFIL */}
              <section className="bg-white dark:bg-[#161b22] border border-gray-200/80 dark:border-gray-800 rounded-xl p-6 flex gap-6 shadow-sm dark:shadow-none transition-colors duration-300">
                <div className="w-24 h-24 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden shrink-0">
                  <img src="/professor1.jpeg" alt="Professor" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 dark:text-white">Prof. Dr. Ricardo Silva</h3>
                      <p className="text-[#0052cc] dark:text-blue-400 font-bold text-xs flex items-center gap-1 mt-0.5 mb-3">
                         🔷 Coordenador de Design Digital & UX
                      </p>
                    </div>
                    <div className="w-8 h-8 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-300 dark:text-gray-600 text-sm">🛡️</div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
                    Doutor em Interação Humano-Computador com mais de 15 anos de experiência em consultoria para grandes corporações. Lidera o núcleo de Design de Interface do Portal ENIAC.
                  </p>
                  <div className="flex gap-2">
                    <span className="text-[11px] font-semibold bg-amber-50 dark:bg-[#2d333b] text-amber-700 dark:text-amber-400 px-3 py-1 rounded-full border border-amber-100 dark:border-gray-700">🎓 Líder Acadêmico</span>
                    <span className="text-[11px] font-semibold bg-blue-50 dark:bg-[#2d333b] text-blue-700 dark:text-gray-300 px-3 py-1 rounded-full border border-blue-100 dark:border-gray-700">👥 342 Alunos</span>
                  </div>
                </div>
              </section>

              {/* LISTAGEM DE DISCIPLINAS E ALUNOS */}
              <section className="bg-white dark:bg-[#161b22] border border-gray-200/80 dark:border-gray-800 rounded-xl p-6 shadow-sm dark:shadow-none transition-colors duration-300">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded">📚</span>
                    <h4 className="font-bold text-xs uppercase tracking-wider text-gray-700 dark:text-white">Minhas Matérias & Contingente</h4>
                  </div>
                  <span className="text-[11px] font-bold text-gray-400 uppercase">Total: 4 Turmas</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <MySubject name="Design de Interface II" code="DD-042" studentsCount={124} progress={75} />
                  <MySubject name="Sistemas de Design" code="DD-089" studentsCount={88} progress={60} />
                  <MySubject name="UX Research & Métricas" code="DD-012" studentsCount={95} progress={85} />
                  <MySubject name="Trabalho de Conclusão (TCC)" code="TCC-A1" studentsCount={35} progress={40} />
                </div>
              </section>

              {/* EXERCÍCIOS PENDENTES */}
              <section className="bg-white dark:bg-[#161b22] border border-gray-200/80 dark:border-gray-800 rounded-xl p-6 shadow-sm dark:shadow-none transition-colors duration-300">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded">📋</span>
                    <h4 className="font-bold text-xs uppercase tracking-wider text-gray-700 dark:text-white">Pendências de Exercícios</h4>
                  </div>
                  <button className="text-[#0052cc] dark:text-blue-400 text-[11px] hover:underline font-bold uppercase tracking-wider">Ver Relatório Completo</button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <SubjectCard title="Design de Interface II" quantity={15} status="Urgent" date="25/10" />
                  <SubjectCard title="Sistemas de Design" quantity={8} status="Soon" date="28/10" />
                  <SubjectCard title="UX Research" quantity={4} status="Regular" date="01/11" />
                  
                  <div className="border border-gray-200 dark:border-gray-800 rounded-xl flex flex-col items-center justify-center p-6 bg-gray-50/50 dark:bg-[#1c2128]/20 hover:bg-gray-100 dark:hover:bg-gray-800/50 cursor-pointer transition-all group">
                    <Plus className="text-gray-400 group-hover:text-[#0052cc] dark:group-hover:text-blue-500 transition-colors" size={24}/>
                    <span className="text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-wider">Ver Mais Matérias</span>
                  </div>
                </div>
              </section>

              {/* CRONOGRAMA DE HOJE */}
              <section className="bg-white dark:bg-[#161b22] border border-gray-200/80 dark:border-gray-800 rounded-xl p-6 shadow-sm dark:shadow-none transition-colors duration-300">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded">📅</span>
                    <h4 className="font-bold text-xs uppercase tracking-wider text-gray-700 dark:text-white">Próximas Aulas de Hoje</h4>
                  </div>
                  <span className="text-xs font-semibold text-gray-400">Quinta-feira</span>
                </div>

                <div className="space-y-3">
                  <ClassSchedule subject="Design de Interface II (Turma T02)" time="19:00 - 20:30" room="Lab 04 - Prédio Central" type="Presencial" />
                  <ClassSchedule subject="Sistemas de Design (Turma T01)" time="20:45 - 22:15" room="Link do Teams no Portal" type="Online" />
                </div>
              </section>
            </div>

            {/* COLUNA DA DIREITA (AVALIAÇÃO E NOVOS AVISOS DE DESEMPENHO) */}
            <div className="col-span-4">
              <section className="bg-white dark:bg-[#161b22] border border-[#0052cc]/20 dark:border-orange-500/30 rounded-xl p-6 shadow-sm dark:shadow-none transition-colors duration-300 flex flex-col h-full sticky top-22 justify-between">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider mb-6 text-gray-500 dark:text-white">Avaliação Anual</h4>
                  
                  <div className="flex justify-center mb-6">
                    <div className="relative w-28 h-28 flex items-center justify-center border-[6px] border-gray-100 dark:border-orange-500/20 rounded-full">
                      <div className="absolute inset-0 border-[6px] border-[#0052cc] dark:border-orange-500 rounded-full border-t-transparent -rotate-45"></div>
                      <div className="text-center">
                        <span className="text-3xl font-black text-gray-800 dark:text-white">4.8</span>
                        <p className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">Nota Média</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <MetricBar label="Pontualidade" value={95} />
                    <MetricBar label="Clareza Didática" value={88} />
                    <MetricBar label="Engajamento" value={92} />
                  </div>

                  {/* ALERTA/AVISO DE DESEMPENHO ADICIONADO */}
                  <div className="mb-6 p-3 bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/50 rounded-xl flex gap-2.5">
                    <AlertTriangle size={18} className="text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-[11px] font-bold text-amber-800 dark:text-amber-400 uppercase tracking-tight">Prazo de Autoavaliação</h5>
                      <p className="text-[10px] text-amber-700/90 dark:text-amber-500/90 leading-tight mt-0.5">
                        A CPA encerra em 3 dias. Responda ao questionário docente para validar seus indicadores do MEC.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block mb-2">Destaque de Feedback</span>
                    <div className="bg-gray-50 dark:bg-[#2d333b]/50 p-3 rounded-lg border border-gray-100 dark:border-gray-700 italic text-xs text-gray-500 dark:text-gray-400 leading-relaxed relative">
                      <span className="absolute top-1 left-2 text-xl font-serif text-blue-200 dark:text-gray-700 leading-none">“</span>
                      <p className="pl-4">O Prof. Ricardo consegue simplificar conceitos complexos de design system de forma magistral.</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

// ================= COMPONENTE DE MATÉRIAS E QUANTIDADE DE ALUNOS =================
const MySubject = ({ name, studentsCount, progress, code }: MySubjectProps) => (
  <div className="p-4 bg-gray-50/50 dark:bg-[#1c2128]/40 border border-gray-100 dark:border-gray-800 rounded-xl hover:border-gray-200 dark:hover:border-gray-700 transition-all">
    <div className="flex justify-between items-start mb-2">
      <div>
        <span className="text-[9px] font-bold font-mono text-gray-400 bg-gray-200/50 dark:bg-gray-800 px-1.5 py-0.5 rounded">
          {code}
        </span>
        <h5 className="text-xs font-bold text-gray-800 dark:text-white mt-1.5 leading-tight">{name}</h5>
      </div>
      <div className="flex items-center gap-1.5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 px-2 py-1 rounded-lg shrink-0">
        <Users size={13} />
        <span className="text-xs font-black">{studentsCount}</span>
      </div>
    </div>
    
    <div className="mt-4">
      <div className="flex justify-between text-[9px] text-gray-400 font-medium mb-1">
        <span>Aulas ministradas</span>
        <span>{progress}%</span>
      </div>
      <div className="h-1 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
        <div className="h-full bg-indigo-500 dark:bg-indigo-400 rounded-full" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  </div>
);

// ================= COMPONENTE DE AGENDA DE AULAS =================
const ClassSchedule = ({ subject, time, room, type }: ClassScheduleProps) => (
  <div className="flex items-center justify-between p-3 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-[#1c2128]/40 hover:border-gray-200 dark:hover:border-gray-700 transition-all">
    <div className="flex items-center gap-3">
      <div className={`p-2 rounded-lg text-xs font-bold ${type === 'Presencial' ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600' : 'bg-purple-50 dark:bg-purple-950/40 text-purple-600'}`}>
        {type}
      </div>
      <div>
        <h5 className="text-xs font-bold text-gray-800 dark:text-white">{subject}</h5>
        <div className="flex items-center gap-3 text-[10px] text-gray-400 mt-0.5">
          <span className="flex items-center gap-1"><Clock size={12} /> {time}</span>
          <span className="flex items-center gap-1"><MapPin size={12} /> {room}</span>
        </div>
      </div>
    </div>
    <button className="text-xs font-bold text-gray-400 hover:text-gray-600 dark:hover:text-white px-3 py-1 bg-white dark:bg-[#2d333b] border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm transition-all">
      {type === 'Presencial' ? 'Fazer Chamada' : 'Entrar na Sala'}
    </button>
  </div>
);

// ================= SUBCOMPONENTES AUXILIARES OTIMIZADOS =================
const NavItem = ({ icon, label, active = false }: NavItemProps) => (
  <div className={`flex items-center gap-3 px-4 py-2.5 rounded-lg cursor-pointer transition-all w-full ${
    active 
      ? 'bg-blue-50 dark:bg-blue-500/10 text-[#0052cc] dark:text-blue-400 font-semibold' 
      : 'hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400'
  }`}>
    {icon}
    <span className="text-xs font-medium">{label}</span>
  </div>
);

const SubjectCard = ({ title, quantity, status, date }: SubjectCardProps) => {
  const statusConfig = {
    Urgent: { bg: 'bg-red-50 text-red-600', label: 'Urgente' },
    Soon: { bg: 'bg-amber-50 text-amber-600', label: 'Em Breve' },
    Regular: { bg: 'bg-gray-50 text-gray-600', label: 'Regular' }
  };

  return (
    <div className="bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-800 rounded-xl p-4 hover:border-gray-300 dark:hover:border-gray-600 transition-all cursor-pointer flex flex-col justify-between group">
      <div>
        <div className="flex justify-between items-center mb-3">
          <h5 className="font-bold text-xs text-gray-800 dark:text-white leading-tight">{title}</h5>
          <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded tracking-wide ${statusConfig[status].bg}`}>
            {statusConfig[status].label}
          </span>
        </div>
        <div className="my-2">
          <span className="text-2xl font-black text-gray-800 dark:text-white">
            {quantity < 10 ? `0${quantity}` : quantity}
          </span>
          <span className="text-[10px] text-gray-400 ml-1.5 font-medium">exercícios pendentes</span>
        </div>
      </div>
      <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-50 dark:border-gray-800 text-[10px] text-gray-400">
        <span className="flex items-center gap-1">📅 Prazo: {date}</span>
        <span className="text-[#0052cc] dark:text-blue-400 group-hover:translate-x-1 transition-transform">➔</span>
      </div>
    </div>
  );
};

const MetricBar = ({ label, value }: MetricBarProps) => (
  <div>
    <div className="flex justify-between mb-1">
      <span className="text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-tight">{label}</span>
      <span className="text-[10px] text-gray-700 dark:text-white font-black">{value}%</span>
    </div>
    <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
      <div className="h-full bg-[#0052cc] dark:bg-orange-400 rounded-full" style={{ width: `${value}%` }}></div>
    </div>
  </div>
);

export default ProfessorDashboard;