"use client";

import {
  BellIcon,
  Cog6ToothIcon,
  MagnifyingGlassIcon,
  ArrowDownTrayIcon,
  PrinterIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function GestoriaIAPage() {
  /* constante do modo escuro e diurno */
  const [darkMode, setDarkMode] = useState(false);

  /* constante do relógio */
  const [horaAtual, setHoraAtual] = useState("");
  useEffect(() => {
    const atualizarHora = () => {
      const hora = new Date().toLocaleTimeString("pt-BR");
      setHoraAtual(hora);
    };

    atualizarHora();
    const intervalo = setInterval(atualizarHora, 1000);
    return () => clearInterval(intervalo);
  }, []);

  const router = useRouter();

  return (
    <main
      className={`flex min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900" : "bg-gray-300"
      }`}
    >
      {/* Sidebar */}
      <aside
        className={`w-64 h-[95vh] sticky top-4 ml-4 rounded-2xl flex flex-col justify-between transition-colors duration-300 ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
        }`}
      >
        {/* Parte superior */}
        <div>
          {/* Logo */}
          <div className="h-16 flex items-center justify-center">
            <img
              src={darkMode ? "/eniac-logo-branca.png" : "/eniac-logo.png"}
              alt="Logo ENIAC"
              className="max-h-12 w-40 object-contain"
            />
          </div>

          {/* Navegação */}
          <nav className="no-underline flex flex-col p-4 gap-2">
            <button
              onClick={() => router.push("/gestoria")}
              className="sidebar-button"
            >
              Dashboard
            </button>

            <button className="sidebar-button bg-blue-600 text-white">
              Gestoria IA
            </button>

            <button
              className="sidebar-button"
              onClick={() => {
                window.scrollTo({
                  top: document.body.scrollHeight,
                  behavior: "smooth",
                });
              }}
            >
              Fim da página
            </button>
          </nav>
        </div>

        {/* Parte inferior */}
        <div className="p-4 flex flex-col gap-2">
          <button className="sidebar-button">Configurações</button>
          <button
            onClick={() => router.push("/cadastro")}
            className="sidebar-button text-red-500"
          >
            Sair
          </button>
        </div>
      </aside>

      {/* Conteúdo */}
      <section className="flex-1 p-4">
        {/* Topbar */}
        <header
          className={`h-20 rounded-2xl shadow-sm px-6 flex items-center justify-between mb-6 transition-colors duration-300 ${
            darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
          }`}
        >
          {/* Lado esquerdo */}
          <div className="flex items-center gap-6">
            <div>
              <h1
                className={`text-2xl font-bold ${
                  darkMode ? "text-white" : "text-gray-800"
                }`}
              >
                Navegação Gestoria
              </h1>
            </div>

            {/* Barra de pesquisa */}
            <div className="relative">
              <input
                type="text"
                placeholder="Pesquisar registros..."
                className={`w-72 pl-10 pr-4 py-2 rounded-xl border outline-none focus:border-blue-500 ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-gray-50 border-gray-300 text-gray-800"
                }`}
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <MagnifyingGlassIcon className="w-5 h-5" />
              </span>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-1 py-1 bg-gray-500 text-xl cursor-pointer rounded-full"
            >
              {darkMode ? (
                <SunIcon className="w-5 h-5" />
              ) : (
                <MoonIcon className="w-5 h-5" />
              )}
            </button>
            <button className="text-xl cursor-pointer">
              <BellIcon className="w-5 h-5" />
            </button>
            <button className="text-xl cursor-pointer">
              <Cog6ToothIcon className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Topo */}
        <div className="flex items-center justify-between mb-4">
          <div className="ml-6">
            <h1
              className={`text-4xl font-bold ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
            >
              Gestoria IA
            </h1>
            <p
              className={`mt-1 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Central inteligente de gerenciamento acadêmico
            </p>
          </div>

          {/* Data atual */}
          <div
            className={`px-4 py-2 rounded-xl shadow transition-colors duration-300 ${
              darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
            }`}
          >
            📅 {new Date().toLocaleDateString("pt-BR")}
          </div>
        </div>

        {/* Cards Estatísticos */}
        <div className="grid grid-cols-4 gap-4">
          {/* Card 1 */}
          <div
            className={`rounded-2xl shadow-md p-6 transition-colors duration-300 ${
              darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-medium">Fluxo de Alunos</h2>
              <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">
                AO VIVO
              </span>
            </div>
            <h1 className="text-5xl font-bold mb-2">85%</h1>
            <p className="text-sm mb-4">Alunos previstos para entrada hoje</p>
            {/* Barra */}
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-blue-500 h-3 rounded-full w-[85%]"></div>
            </div>
          </div>

          {/* Card 2 */}
          <div
            className={`rounded-2xl shadow-md p-6 transition-colors duration-300 ${
              darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
            }`}
          >
            <h2 className="font-medium mb-4">Processamento IA</h2>
            <h1 className="text-4xl font-bold text-green-600 mb-2">Otimizado</h1>
            <p className="text-sm">Latência: 1.2s</p>
          </div>

          {/* Card 3 */}
          <div
            className={`rounded-2xl shadow-md p-6 transition-colors duration-300 ${
              darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
            }`}
          >
            <h2 className="font-medium mb-4">Alertas Ativos</h2>
            <h1 className="text-5xl font-bold text-orange-500">03</h1>
          </div>

          {/* Card 4 */}
          <div
            className={`rounded-2xl shadow-md p-6 transition-colors duration-300 ${
              darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
            }`}
          >
            <h2 className="font-medium mb-4">Solicitações IA</h2>
            <h1 className="text-5xl font-bold text-purple-600">124</h1>
            <p className="text-sm mt-2">Ações efetuadas hoje</p>
          </div>
        </div>

        {/* Feed IA (Largura Total) */}
        <div className="mt-4">
          <div
            className={`rounded-2xl shadow-md p-6 transition-colors duration-300 ${
              darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
            }`}
          >
            {/* Cabeçalho */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Feed de Atividades IA</h2>
              <button className="text-blue-600 text-sm font-semibold hover:underline cursor-pointer">
                Histórico Completo
              </button>
            </div>

            {/* Atividade 1 */}
            <div className="border-l-4 border-blue-500 bg-gray-300 rounded-xl p-4 mb-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-gray-800">
                  Prof. Lucio Luzetti informou ausência na aula de hoje
                </h3>
                <span className="text-sm text-gray-800">AGORA</span>
              </div>
              <p className="text-gray-500 mt-2">
                IA notificou automaticamente a turma e sugeriu aula assíncrona.
              </p>
              <div className="flex gap-3 mt-4">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition cursor-pointer">
                  Detalhes
                </button>
                <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-red-500 transition cursor-pointer">
                  Desfazer
                </button>
              </div>
            </div>

            {/* Atividade 2 */}
            <div className="bg-gray-300 rounded-xl p-4 mb-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-gray-800">
                  Prof. Marcos Cárfora reagendou aula do dia 26/08 para 28/08
                </h3>
                <span className="text-sm text-gray-800">14m</span>
              </div>
              <p className="text-gray-500 mt-2">
                Calendário alterado automaticamente
              </p>
            </div>

            {/* Atividade 3 */}
            <div className="bg-gray-300 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-gray-800">
                  Prof. Lucio Luzetti declarou futura falta na aula do dia 16/10
                </h3>
                <span className="text-sm text-gray-800">24h</span>
              </div>
              <p className="text-gray-500 mt-2">
                Calendário alterado automaticamente
              </p>
            </div>
          </div>
        </div>

        {/* Painel IA de Alterações */}
        <div
          className={`rounded-2xl shadow-md p-6 mt-4 transition-colors duration-300 ${
            darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
          }`}
        >
          {/* Cabeçalho */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">
                Controle Inteligente de Grade
              </h2>
              <p
                className={`mt-1 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Alterações automáticas sugeridas pela IA
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button className="px-1 py-1 hover:bg-gray-500 transition cursor-pointer text-xl rounded-full">
                <PrinterIcon className="w-5 h-5" />
              </button>
              <button className="px-1 py-1 hover:bg-gray-500 transition cursor-pointer text-xl rounded-full">
                <ArrowDownTrayIcon className="w-5 h-5" />
              </button>
              <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
                IA SINCRONIZADA
              </span>
            </div>
          </div>

          {/* Caixa principal */}
          <div className="bg-gray-300 rounded-2xl p-6">
            {/* Motivo */}
            <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
              <p className="text-sm text-gray-500 mb-2">MOTIVO</p>
              <h3 className="text-xl font-bold text-gray-800">
                Ausência: Prof. Nelson Luzetti
              </h3>
              <p className="text-gray-500 mt-2">
                IA detectou conflito e sugeriu realocação automática.
              </p>
            </div>

            {/* Horários */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {/* Original */}
              <div className="bg-white rounded-xl p-5 shadow-sm border-l-4 border-red-400">
                <p className="text-sm text-gray-500 mb-2">HORÁRIO ORIGINAL</p>
                <h3 className="text-2xl font-bold text-gray-800">
                  19:30 - 21:10
                </h3>
                <p className="text-gray-500 mt-2">Sala 22-B</p>
              </div>

              {/* IA */}
              <div className="bg-blue-50 rounded-xl p-5 shadow-sm border-l-4 border-blue-500">
                <p className="text-sm text-blue-500 mb-2">PROPOSTA IA</p>
                <h3 className="text-2xl font-bold text-blue-700">
                  20:00 - 21:30
                </h3>
                <p className="text-blue-500 mt-2">Aula remota via Teams</p>
              </div>
            </div>

            {/* Botões */}
            <div className="flex gap-4">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 transition text-white py-4 rounded-xl font-semibold cursor-pointer">
                ✅ Validar Alteração
              </button>
              <button className="flex-1 bg-white hover:bg-gray-200 transition text-gray-700 py-4 rounded-xl font-semibold border cursor-pointer">
                Ajustar Manualmente
              </button>
            </div>
          </div>

          {/* Barra Inferior IA */}
          <div className="mt-8 flex flex-col gap-4">
            {/* Campo chat IA */}
            <div className="bg-gray-300 rounded-3xl shadow-md p-3 flex items-center gap-3">
              <input
                type="text"
                placeholder="Pergunte algo à Secretaria IA..."
                className="flex-1 bg-transparent outline-none px-3 text-gray-900"
              />
              <button className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white px-5 py-2 rounded-2xl font-semibold cursor-pointer">
                Enviar
              </button>
            </div>

            {/* Cards inferiores */}
            <div className="grid grid-cols-4 gap-4">
              {/* Rede */}
              <div
                className={`rounded-3xl shadow-md p-4 transition-colors duration-300 ${
                  darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-800"
                }`}
              >
                <p className="text-sm">Solicitações IA hoje</p>
                <h3 className="text-xl font-bold text-purple-600 mt-1">124</h3>
              </div>

              {/* Energia */}
              <div
                className={`rounded-3xl shadow-md p-4 transition-colors duration-300 ${
                  darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-800"
                }`}
              >
                <p className="text-sm">Processamento IA</p>
                <h3 className="text-xl font-bold text-green-600 mt-1">
                  Otimizado
                </h3>
              </div>

              {/* Relatórios */}
              <div
                className={`rounded-3xl shadow-md p-4 transition-colors duration-300 ${
                  darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-800"
                }`}
              >
                <p className="text-sm">RELATÓRIOS</p>
                <h3 className="text-xl font-bold text-orange-500 mt-1">
                  02 Pendentes
                </h3>
              </div>

              {/* Relógio */}
              <div
                className={`rounded-3xl shadow-md p-4 transition-colors duration-300 ${
                  darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-800"
                }`}
              >
                <p className="text-sm">SINCRONIZAÇÃO</p>
                <h3 className="text-xl font-bold mt-1">{horaAtual}</h3>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}