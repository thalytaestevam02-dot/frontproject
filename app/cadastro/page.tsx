'use client';

import { useRouter } from 'next/navigation';
import Cadastro from '@/components/Cadastro';

export default function CadastroPage() {
  const router = useRouter();

  const handleRedirecionamento = async ({ perfil }: { ra: string; perfil: 'professor' | 'coordenador' }) => {
    router.push(perfil === 'coordenador' ? '/gestoria' : '/perfil_professor');
  };

  return <Cadastro onSelectPerfil={handleRedirecionamento} />;
}