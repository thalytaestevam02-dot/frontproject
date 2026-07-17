'use client';

import React, { useState, useRef } from 'react';
import { useThemeStorage } from "../lib/useThemeStorage";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Bell,
  Bot,
  LayoutDashboard,
  LogOut,
  Moon,
  Search,
  Settings,
  Sun,
  CalendarDays,
  Menu,
  X,
} from 'lucide-react';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
  textColor?: string;
}

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  iconColor: string;
  smColSpan?: boolean;
}

interface ScheduleItemProps {
  time: string;
  title: string;
  location: string;
  border: string;
}

// ================= COMPONENTE PRINCIPAL =================
export default function GestoriaPage() {
  const { isDarkMode, toggleTheme } = useThemeStorage();
  const router = useRouter();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={`${isDarkMode ? 'dark bg-[#0f1115] text-gray-300' : 'bg-gray-100 text-gray-700'} h-screen overflow-hidden font-sans p-3 md:p-6 transition-colors duration-300 relative`}>
      <div className="mx-auto flex h-full max-w-[1400px] gap-6 min-h-0 relative">

        {/* OVERLAY PARA MOBILE QUANDO A SIDEBAR ESTIVER ABERTA */}
        {sidebarOpen && (
          <div 
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm transition-opacity duration-300"
          />
        )}

        {/* BARRA LATERAL (SIDEBAR) */}
        <aside className={`
          fixed md:relative inset-y-0 left-0 z-50 w-64 flex flex-col 
          bg-white dark:bg-[#161b22] rounded-r-2xl md:rounded-2xl 
          border border-gray-200 dark:border-gray-800 p-5 shrink-0 h-[95vh] md:h-full mt-[2.5vh] md:mt-0
          transform transition-transform duration-300 ease-in-out shadow-xl md:shadow-none
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}>
          <div className="flex justify-between items-center mb-4 md:justify-center relative">
            <Image
              src="/eniac-logo.png"
              alt="Logo ENIAC"
              width={140}
              height={45}
              className={isDarkMode ? "brightness-0 invert" : ""}
            />
            <button 
              onClick={() => setSidebarOpen(false)} 
              className="p-1 md:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white absolute -right-2 -top-2 bg-gray-100 dark:bg-[#1c2128] rounded-full"
            >
              <X size={20} />
            </button>
          </div>

          <div className="mb-7 text-center border-b border-gray-100 dark:border-gray-800 pb-4">
            <h1 className="text-xl font-bold tracking-tight text-[#0047b3] dark:text-[#0c6cfb]">PORTAL DO GESTOR</h1>
            <p className="mt-1 text-[11px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest">Ambiente Docente</p>
          </div>

          <nav className="flex-1 space-y-1.5 scrollbar-thin pr-1 overflow-y-auto">
             <NavItem
              icon={<LayoutDashboard size={18} />}
              label="Dashboard"
              onClick={() => router.push("/gestoria")} />

            <NavItem
              icon={<Bot size={18} />}
              label="Gestoria IA" active
              onClick={() => router.push("/gestoria_ia")} />
            
            <NavItem
              icon={<CalendarDays size={18} />}
              label="Feed Atividades"
              onClick={() => router.push("/feed_att")}
            />
          </nav>

          <div className="mt-auto pt-6 border-t border-gray-100 dark:border-gray-800 space-y-4 text-[11px]">
            <div className="flex items-center gap-1.5 text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-500 px-2">
              <span>⚠️</span> Avisos
            </div>
            <div className="space-y-3 bg-gray-50 dark:bg-[#1c2128] p-4 rounded-xl border border-gray-100 dark:border-gray-800">
              <div>
                <p className="text-gray-700 dark:text-gray-200 font-semibold">Notas</p>
                <p className="text-gray-500 dark:text-gray-400 leading-tight">Lançamento até 5º dia útil.</p>
              </div>
              <div>
                <p className="font-semibold text-gray-700 dark:text-gray-200">Substituição</p>
                <p className="text-gray-500 dark:text-gray-400 leading-tight">Aviso com 48h.</p>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex flex-col gap-1">
              <div className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl cursor-pointer text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                <Settings size={18} /> <span className="text-sm font-medium">Configurações</span>
              </div>
              <div
                onClick={() => router.push("/cadastro")}
                className="flex items-center gap-3 px-3 py-2.5 hover:bg-red-50 dark:hover:bg-red-950/50 text-red-600 dark:text-red-400 rounded-xl cursor-pointer transition-colors"
              >
                <LogOut size={18} /> <span className="text-sm font-medium">Sair</span>
              </div>
            </div>
          </div>
        </aside>

        {/* CONTEÚDO PRINCIPAL (MAIN) */}
        <main className="flex min-h-0 flex-1 flex-col overflow-hidden w-full">

          {/* HEADER RESPONSIVO COM ÍCONES NO TOPO */}
          <header className="mb-4 md:mb-6 p-3 md:py-3 md:px-5 bg-white/95 dark:bg-[#161b22]/95 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-800 transition-colors duration-300 shrink-0 shadow-sm">
            <div className="flex flex-col gap-3">
              
              {/* Linha Superior: Título/Menu e Ícones (Tema e Notificação) na mesma linha no mobile */}
           <div className="flex items-center justify-between w-full gap-4">
  {/* Left: Mobile Menu & Title */}
  <div className="flex items-center gap-3 shrink-0">
    <button 
      onClick={() => setSidebarOpen(true)} 
      className="p-2 md:hidden bg-gray-100 dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-200 transition-colors"
    >
      <Menu size={20} />
    </button>
    <h2 className="text-xl md:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
      Gestoria
    </h2>
  </div>

  {/* Center: Search Bar */}
  <div className="relative flex-1 max-w-md mx-2">
    <Search className="absolute left-3.5 top-3 h-4 w-4 text-gray-400 dark:text-gray-500 pointer-events-none" />
    <input
      type="text"
      placeholder="Pesquisar registros, alunos..."
      className="w-full pl-10 pr-4 py-2.5 bg-gray-100 dark:bg-[#1c2128] border border-gray-200 dark:border-gray-800 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-gray-100 transition-all placeholder-gray-400 dark:placeholder-gray-500 outline-none"
    />
  </div>

  {/* Right: Theme and Notifications */}
  <div className="flex items-center gap-2.5 shrink-0">
    <button
      onClick={toggleTheme}
      className="p-3 bg-gray-100 dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
      title="Alternar Tema"
    >
      {isDarkMode ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-gray-600" />}
    </button>

    <button className="p-3 bg-gray-100 dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors relative">
      <Bell size={18} />
      <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-[#161b22]"></span>
    </button>
  </div>
</div>
              
            </div>
          </header>

          {/* ÁREA DE CONTEÚDO TOTAL */}
          <div ref={scrollContainerRef} className="flex-1 overflow-y-auto pr-1 md:pr-3 pb-6 space-y-6 scrollbar-thin dark:scrollbar-thumb-gray-800 scrollbar-thumb-gray-200">
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white dark:bg-[#161b22] p-5 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Bem-vindo de volta, Gestor 👋</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">Aqui está o resumo das suas atividades de hoje.</p>
                </div>
                <div className="flex items-center gap-2 bg-gray-100 dark:bg-[#1c2128] text-gray-800 dark:text-gray-200 px-4 py-2.5 rounded-xl font-medium border border-gray-200 dark:border-gray-700 w-fit text-sm">
                    📅 {new Date().toLocaleDateString("pt-BR", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
            </div>

            <section className="bg-white dark:bg-[#161b22] border border-gray-100 dark:border-gray-800 rounded-2xl p-5 md:p-6 shadow-sm transition-colors duration-300">
              <div className="flex justify-between items-center mb-6 border-b border-gray-100 dark:border-gray-800 pb-4">
                <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                  Horários do Dia
                </h2>
                <span className="bg-green-100 text-green-800 dark:bg-green-950/60 dark:text-green-400 px-3.5 py-1.5 rounded-full text-xs font-semibold">
                  ✅ Operação Normal
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <ScheduleItem time="10:00" title="Reunião Gestoria" location="Ecossistema" border="border-blue-500" />
                  <ScheduleItem time="12:15" title="Palestra Inovação" location="Auditório Principal" border="border-green-500" />
                  <ScheduleItem time="18:00" title="Workshop Marketing" location="Sala 3B" border="border-orange-500" />
              </div>
            </section>

            <section className="bg-white dark:bg-[#161b22] border border-gray-100 dark:border-gray-800 rounded-2xl p-5 md:p-6 shadow-sm transition-colors duration-300">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
                <div>
                  <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                    Agenda de Eventos
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Próximos eventos acadêmicos e administrativos</p>
                </div>
                <button className="px-4 py-2.5 rounded-xl text-sm font-medium bg-gray-100 dark:bg-[#1c2128] text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700 transition">
                  Histórico Completo
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full table-auto md:table-fixed min-w-[600px] text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-100 dark:border-gray-800 text-xs md:text-sm font-semibold text-gray-400 dark:text-gray-500">
                      <th className="pb-4 px-2">Evento</th>
                      <th className="pb-4 px-2">Local</th>
                      <th className="pb-4 px-2">Data</th>
                      <th className="pb-4 px-2">Horário</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs md:text-sm text-gray-700 dark:text-gray-300">
                    <tr className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-[#1c2128]/30 transition-colors">
                      <td className="py-4 px-2 font-semibold">Corpus Christi</td>
                      <td className="py-4 px-2">Feriado</td>
                      <td className="py-4 px-2">04/06</td>
                      <td className="py-4 px-2"><span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-xs font-semibold">00:00 - 23:59</span></td>
                    </tr>
                    <tr className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-[#1c2128]/30 transition-colors">
                      <td className="py-4 px-2 font-semibold">Feirão do emprego Eniac</td>
                      <td className="py-4 px-2">Eniac</td>
                      <td className="py-4 px-2">11/06 até 12/06</td>
                      <td className="py-4 px-2"><span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-xs font-semibold">07:00 - 22:00</span></td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-[#1c2128]/30 transition-colors">
                      <td className="py-4 px-2 font-semibold">Festa Junina do Eniac</td>
                      <td className="py-4 px-2">Eniac</td>
                      <td className="py-4 px-2">24/06</td>
                      <td className="py-4 px-2"><span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-xs font-semibold">12:00 - 20:00</span></td>
                    </tr>
                  </tbody>
                </table>
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
      className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 transition-all text-left ${active
          ? 'bg-blue-600 font-semibold text-white shadow-sm'
          : `text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 ${textColor || ''}`
        }`}
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}

function StatCard({ title, value, change, iconColor, smColSpan }: StatCardProps) {
  return (
    <div className={`bg-white dark:bg-[#161b22] border border-gray-100 dark:border-gray-800 rounded-2xl p-5 md:p-6 shadow-sm flex flex-col justify-between ${smColSpan ? 'sm:col-span-2 xl:col-span-1' : ''}`}>
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
        <h2 className={`text-3xl md:text-4xl font-extrabold mt-2 ${iconColor}`}>{value}</h2>
      </div>
      <p className="text-xs text-gray-400 dark:text-gray-500 mt-4 pt-3 border-t border-gray-50 dark:border-gray-800/60">{change}</p>
    </div>
  );
}

function ScheduleItem({ time, title, location, border }: ScheduleItemProps) {
  return (
    <div className={`border-l-4 ${border} pl-4 py-2 bg-gray-50 dark:bg-[#1c2128]/50 rounded-r-xl`}>
      <p className="text-xs font-medium text-gray-400 dark:text-gray-500">{time}</p>
      <h3 className="font-bold text-gray-900 dark:text-white mt-0.5">{title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">{location}</p>
    </div>
  );
}