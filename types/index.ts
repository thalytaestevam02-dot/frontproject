
export type PerfilAcesso = 'PROFESSOR' | 'COORDENADOR';


export interface Usuario {
  id?: string;
  nome: string;
  email: string;
  perfil: PerfilAcesso;
}

export interface LoginRequest {
  email: string;
  senha: string;
  perfil: PerfilAcesso;
}

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