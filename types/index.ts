// 1. Tipos de Acesso (Baseado no Figma)
export type PerfilAcesso = 'PROFESSOR' | 'COORDENADOR';

// 2. Modelo de Usuário (Para o seu colega do Banco de Dados)
export interface Usuario {
  id?: string;
  nome: string;
  email: string;
  perfil: PerfilAcesso;
}

// 3. Modelo de Login (Para o pessoal do Front-end)
export interface LoginRequest {
  email: string;
  senha: string;
  perfil: PerfilAcesso;
}

// 4. Estruturas que você já tinha (Mantenha elas aqui abaixo)
export interface Professor {
  id: string;
  nome: string;
  materia: string;
  disponibilidade: string[];
}

export interface Aula {
  professorId: string;
  sala: string;
  horario: string;
  turma: string;
} 