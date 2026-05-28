'use client';

import { useRouter } from 'next/navigation';
import PerfilProfessor from "@/components/Perfil_Professor"; // Seu elemento visual da pasta components

export default function PaginaDoProfessor() {
  const router = useRouter();

  // Esta função será disparada quando o professor clicar no botão de criar/gerar grade
  const irParaOGerador = () => {
    router.push('/gerar_ia_professor');
  };

  return <PerfilProfessor onCliqueGerar={irParaOGerador} />;
}