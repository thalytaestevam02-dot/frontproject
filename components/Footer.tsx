import Image from "next/image";

const LINKS_INSTITUCIONAIS = [
  { nome: "Sobre o Eniac", url: "https://www.eniac.edu.br/" },
  { nome: "Blog", url: "https://www.eniac.edu.br/blog" },
  { nome: "Portal de Empregos", url: "https://www.eniac.edu.br/emprego" },
  { nome: "Contato", url: "https://www.eniac.edu.br/" },
];

export default function Footer() {
  return (
    <footer 
      className="mt-auto text-black pt-4"
      style={{ 
        backgroundImage: 'linear-gradient(to right, #ffffff, #bfdbfe, #3b82f6)' 
      }}
    >
      <div className="flex flex-wrap justify-between px-16 py-2">
        
        {/* Mantido exatamente 300px usando style inline */}
        <div style={{ maxWidth: '300px' }}>
          <Image
            src="/eniac-logo.png"
            alt="Logo ENIAC"
            width={160}
            height={50}
            className="object-contain"
          />
          <p className="mt-4 leading-6">
            Centro Universitário de Excelência comprometido com a formação de
            profissionais preparados para os desafios do mercado.
          </p>
        </div>

        {/* Mantido exatamente 300px e font-size de 18px */}
        <div style={{ maxWidth: '300px' }}>
          <h3 className="mb-4 font-bold" style={{ fontSize: '18px' }}>Institucional</h3>
          <div className="flex flex-col">
            {LINKS_INSTITUCIONAIS.map(({ nome, url }) => (
              <a
                key={nome}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-2 hover:underline"
              >
                {nome}
              </a>
            ))}
          </div>
        </div>

        {/* Mantido exatamente 300px e font-size de 18px */}
        <div className="flex flex-col gap-4" style={{ maxWidth: '300px' }}>
          <h3 className="font-bold" style={{ fontSize: '18px' }}>Contato</h3>
          <p>📍 Rua Força Pública, 89 - Centro, Guarulhos - SP</p>
          <p>✉️ informacoes@eniac.edu.br</p>
        </div>

      </div>

      {/* Mantido exatamente 60% de largura */}
      <div className="mx-auto mt-2 py-1 text-center text-base" style={{ width: '60%' }}>
        &copy; 2026 Centro Universitário Eniac. Todos os direitos reservados.
      </div>
    </footer>
  );
}