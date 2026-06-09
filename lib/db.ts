type UsuarioFake = {
  id: number;
  ra: string;
  perfil: string;
  nome: string;
};

const usuariosFake: UsuarioFake[] = [
  { id: 1, ra: '0204', perfil: 'COORDENADOR', nome: 'Coordenador' },
  { id: 2, ra: '202600', perfil: 'PROFESSOR', nome: 'Professor Exemplo' },
];

export const pool = {
  query: async (sql: string, params: unknown[] = []) => {
    const normalizedSql = sql.toUpperCase();

    if (normalizedSql.includes('FROM USUARIOS WHERE RA = ?')) {
      const ra = String(params[0] ?? '');

      if (normalizedSql.includes('AND PERFIL = ?')) {
        const perfil = String(params[1] ?? '').toUpperCase();
        const rows = usuariosFake.filter((usuario) => usuario.ra === ra && usuario.perfil === perfil);
        return [rows];
      }

      const rows = usuariosFake.filter((usuario) => usuario.ra === ra);
      return [rows];
    }

    return [[]];
  },
};
