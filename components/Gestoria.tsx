"use client";

import { useRouter } from "next/navigation";
export default function GestoriaPage() {
    const router = useRouter();
  
    return (
    <main className="flex min-h-screen bg-gray-300">
      {/* Sidebar */}
        <aside className="w-64 h-[95vh] sticky top-4 ml-4 bg-white shadow-x1 rounded-2xl flex flex-col justify-between">
  <div>
    {/* Logo */}
    <div className="p-6 flex justify-center">
      <img
        src="/eniac-logo.png"
        alt="Logo ENIAC"
        className="w-40"
      />
    </div>

    {/* Navegação da Navbar */}
    <nav className="no-underline flex flex-col p-4 gap-2">
      <button className="sidebar-button bg-blue-600 text-white">
         Dashboard
      </button>

      <button 
        onClick={() => router.push("/gestoriaIA")}
        className="sidebar-button">
         GestoriaIA
      </button>

      <button className="sidebar-button"
        onClick={() => {
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth"
          });
        }}
      >
        Atividades Recentes
      </button>

    </nav>

  </div>
 
  {/* Parte inferior da Navbar */}
  <div className="p-4 flex flex-col gap-2">

    <button className="sidebar-button">
       Configurações
    </button>

    <button 
    onClick={() => router.push("/cadastro")}
    className="sidebar-button text-red-500">
     Sair
    </button>

  </div>

</aside>


{/* Conteúdo do topo */}
<section className="flex-1 p-4">

  {/* Topo da página */}
  <div className="flex items-center justify-between mb-4">

    <div>
      <h1 className="text-3xl font-bold text-gray-800">
        Dashboard Gestoria
      </h1>

      <p className="text-gray-500">
        Visão geral acadêmica
      </p>
    </div>

    {/* Data atual */}
    <div className="bg-white px-4 py-2 rounded-xl shadow">
  📅 {new Date().toLocaleDateString("pt-BR")}
    </div>

  </div>

  {/* Cards do topo */}
<div className="grid grid-cols-3 gap-4 mb-4">

  <div className="bg-white p-6 rounded-2xl shadow">
    <p className="text-gray-500 text-sm">
      Total de Alunos
    </p>

    <h2 className="text-4xl font-bold text-blue-700 mt-2">
      12.480
    </h2>
  </div>

  <div className="bg-white p-6 rounded-2xl shadow">
    <p className="text-gray-500 text-sm">
      Professores
    </p>

    <h2 className="text-4xl font-bold text-green-600 mt-2">
      328
    </h2>
  </div>

  <div className="bg-white p-6 rounded-2xl shadow">
    <p className="text-gray-500 text-sm">
      Matérias
    </p>

    <h2 className="text-4xl font-bold text-purple-600 mt-2">
      452
    </h2>
  </div>
    
</div>

{/* Área principal */}
<div className="grid grid-cols-3 gap-4 mb-4">

  {/* Quadro de horários do dia*/}
  <div className="col-span-2 bg-white rounded-2xl shadow p-6">

    <div className="flex items-center justify-between mb-6">

      <h2 className="text-xl font-bold text-gray-800">
        Quadro de Horários do Dia
      </h2>

      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
        Operando Normal
      </span>

    </div>

    {/* Horários */}
    <div className="flex flex-col gap-5">

      {/* Aula */}
      <div className="border-l-4 border-blue-500 pl-4">

        <p className="text-sm text-gray-400">
          08:00
        </p>

        <h3 className="font-bold text-gray-800">
          Programação Android
        </h3>

        <p className="text-gray-500 text-sm">
          Prof. Lucio Luzetti • Sala 23-B
        </p>

      </div>

      {/* Aula */}
      <div className="border-l-4 border-green-500 pl-4">

        <p className="text-sm text-gray-400">
          10:15
        </p>

        <h3 className="font-bold text-gray-800">
          Tecnologia Web
        </h3>

        <p className="text-gray-500 text-sm">
          Profª Nelson Luzetti • Sala 22-B
        </p>

      </div>

      {/* Aula */}
      <div className="border-l-4 border-orange-500 pl-4">

        <p className="text-sm text-gray-400">
          12:15
        </p>

        <h3 className="font-bold text-gray-800">
          Metodologias Ágeis
        </h3>

        <p className="text-gray-500 text-sm">
          Prof. Denilson Caraca • Sala 21-B
        </p>

      </div>

    </div>

  </div>

  {/* Painel lateral */}
  <div className="flex flex-col gap-4">

    {/* Avaliações docentes */}
    <div className="bg-white rounded-2xl shadow p-6">

      <h2 className="text-xl font-bold text-gray-800 mb-5">
        Avaliações Docentes
      </h2>

      <div className="flex flex-col gap-4">

        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Qualidade Didática</span>
            <span>4.8/5</span>
          </div>

          <div className="w-full h-3 bg-gray-200 rounded-full">
            <div className="w-[96%] h-3 bg-blue-500 rounded-full"></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Domínio de Conteúdo</span>
            <span>4.9/5</span>
          </div>

          <div className="w-full h-3 bg-gray-200 rounded-full">
            <div className="w-[98%] h-3 bg-green-500 rounded-full"></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Engajamento</span>
            <span>4.2/5</span>
          </div>

          <div className="w-full h-3 bg-gray-200 rounded-full">
            <div className="w-[84%] h-3 bg-orange-400 rounded-full"></div>
          </div>
        </div>

      </div>

    </div>

    {/* Destaque */}
    <div className="bg-blue-600 text-white rounded-2xl shadow p-6">

      <p className="text-sm opacity-80 mb-2">
        Destaque do Mês
      </p>

      <h2 className="text-2xl font-bold mb-3">
        Excelência Acadêmica
      </h2>

      <p className="text-sm opacity-90 mb-5">
        A faculdade atingiu o maior índice de aprovação dos últimos anos.
      </p>

      <button className="bg-white text-blue-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition cursor-pointer">
        Baixar Relatório
      </button>

    </div>

  </div>

  

</div>

    {/* Atividades Recentes */}
<div className="bg-white rounded-2xl shadow p-6">

  {/* Cabeçalho */}
  <div className="flex items-center justify-between mb-6">

    <div>
      <h2 className="text-2xl font-bold text-gray-800">
        Atividades Recentes
      </h2>

      <p className="text-gray-500 text-sm">
        Monitoramento administrativo
      </p>
    </div>

    <button className="border border-gray-300 px-4 py-2 rounded-lg text-sm hover:bg-gray-100 transition cursor-pointer">
      Histórico Completo
    </button>

  </div>

  {/* Tabela */}
  <div className="overflow-x-auto">

    <table className="w-full">

      <thead>

        <tr className="text-left text-gray-400 text-sm border-b">

          <th className="pb-4">Solicitação</th>

          <th className="pb-4">Departamento</th>

          <th className="pb-4">Data</th>

          <th className="pb-4">Status</th>

        </tr>

      </thead>

      <tbody className="text-gray-700">

        <tr className="border-b hover:bg-gray-50 transition">

          <td className="py-5 font-medium">
            Aprovação de Nova Verba Lab TI
          </td>

          <td>
            Tecnologia da Informação
          </td>

          <td>
            Hoje, 09:12
          </td>

          <td>
            <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold">
              Pendente
            </span>
          </td>

        </tr>

        <tr className="border-b hover:bg-gray-50 transition">

          <td className="py-5 font-medium">
            Calendário Semestral 2026.2
          </td>

          <td>
            Secretaria Acadêmica
          </td>

          <td>
            Ontem, 16:45
          </td>

          <td>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
              Aprovado
            </span>
          </td>

        </tr>

        <tr className="hover:bg-gray-50 transition">

          <td className="py-5 font-medium">
            Renovação de Convênio Intercâmbio
          </td>

          <td>
            Relações Internacionais
          </td>

          <td>
            22 Mai, 11:20
          </td>

          <td>
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
              Finalizado
            </span>
          </td>

        </tr>

      </tbody>

    </table>

  </div>

</div>

</section>

    </main>
  );
}