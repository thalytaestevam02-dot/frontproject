import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { ra, perfil } = body;

    const raDigitado = typeof ra === 'string' ? ra.trim() : String(ra ?? '').trim();
    const perfilUpper = typeof perfil === 'string' ? perfil.toUpperCase() : '';

    if (!raDigitado || !perfilUpper) {
      return NextResponse.json(
        { mensagem: 'Por favor, preencha todos os campos.' },
        { status: 400 }
      );
    }

    const [rows]: any = await pool.query(
      'SELECT * FROM usuarios WHERE ra = ? AND perfil = ?',
      [raDigitado, perfilUpper]
    );

    if (!rows || rows.length === 0) {
      return NextResponse.json(
        { mensagem: 'Usuário não cadastrado ou perfil incorreto.' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      mensagem: 'Sucesso',
      usuario: rows[0],
    }, { status: 200 });

  } catch (error) {
    console.error('Erro no banco de dados:', error);
    return NextResponse.json(
      { mensagem: 'Erro interno de conexão com o banco de dados.' },
      { status: 500 }
    );
  }
}