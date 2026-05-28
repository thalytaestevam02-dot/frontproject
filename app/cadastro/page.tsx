'use client';

import { useRouter } from 'next/navigation';
import Cadastro from '@/components/Cadastro';

export default function CadastroPage() {
  const router = useRouter();

  const handleRedirecionamento = (perfil: 'professor' | 'coordenador') => {
    // Corrigido: Agora vai para a página do professor primeiro!
    router.push('/perfil_professor');
  };

  return <Cadastro onSelectPerfil={handleRedirecionamento} />;
}