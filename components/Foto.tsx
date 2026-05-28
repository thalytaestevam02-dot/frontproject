import { LineChart, CalendarDays, ShieldCheck, LogIn } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HeroFoto() {
  const caracteristicas = [
    {
      titulo: "Análise em Tempo Real",
      descricao: "Dados consolidados de turmas, frequências e notas acessíveis com um clique.",
      icone: <LineChart className="w-6 h-6 text-white" />,
    },
    {
      titulo: "Cronograma Inteligente",
      descricao: "Gestão de horários automatizada e notificações de prazos para toda a faculdade.",
      icone: <CalendarDays className="w-6 h-6 text-white" />,
    },
    {
      titulo: "Segurança de Dados",
      descricao: "Infraestrutura de nível institucional garantindo a integridade dos registros acadêmicos.",
      icone: <ShieldCheck className="w-6 h-6 text-white" />,
    },
  ];

  return (
    <section className="relative min-h-[90vh] bg-slate-950 text-white flex flex-col justify-between overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/unnamed.png"
          alt="Campus universitário moderno"
          fill
          className="object-cover opacity-100" 
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/40 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950/60 z-10" />
      </div>
      <div className="container mx-auto px-4 py-20 md:py-32 relative z-20 flex-grow flex items-center">
        <div className="max-w-3xl">
          <div className="inline-block px-4 py-1 bg-white/10 border border-white/20 rounded-full text-xs font-bold uppercase tracking-wider text-slate-200 mb-6 backdrop-blur-sm">
            Sistema de Gestão Acadêmica
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-8 text-white drop-shadow-md">
            Gestão Acadêmica de <span className="text-[#38BDF8]">Excelência</span>
          </h1>
          
          <p className="text-slate-200 text-lg md:text-xl max-w-2xl leading-relaxed mb-12 drop-shadow-md">
            Um ecossistema unificado para gestores e professores. 
            Simplifique processos, acompanhe o desempenho e eleve 
            o padrão educacional da sua instituição.
          </p>
      <Link 
        href="/cadastro" 
          className="relative z-30 inline-flex items-center gap-2.5 bg-[#0284C7] hover:bg-[#0ea5e9] text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg shadow-blue-500/30"
          >
  <LogIn className="w-5 h-5" />
  Acessar o Portal
</Link>
        </div>
      </div>

      {/* Cards Completamente Transparentes (Efeito Vidro / Glassmorphism) */}
      <div className="relative z-20 pb-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caracteristicas.map((item, index) => (
              <div 
                key={index} 
                // Mistura perfeita de transparência branca com desfoque de fundo (Tailwind puro)
                className="bg-white/10 border border-white/20 backdrop-blur-md p-8 rounded-[32px] shadow-2xl space-y-5 transition-transform hover:scale-[1.02]"
              >
                {/* Ícone com fundo de vidro levemente mais denso */}
                <div className="bg-white/10 border border-white/20 p-4 rounded-2xl inline-block">
                  {item.icone}
                </div>
                <h3 className="text-2xl font-bold text-white drop-shadow-sm">
                  {item.titulo}
                </h3>
                <p className="text-slate-200 leading-relaxed text-base drop-shadow-sm">
                  {item.descricao}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
    </section>
  );
}