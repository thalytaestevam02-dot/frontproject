import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, perfil } = body;
    const raDigitado = String(email ?? '').trim().split('@')[0];
    const perfilNormalizado = String(perfil ?? '').trim().toUpperCase();

    if (!raDigitado || !perfilNormalizado) {
      return NextResponse.json(
        { mensagem: 'Por favor, preencha todos os campos.' },
        { status: 400 }
      );
    }

    const ehCoordenador = perfilNormalizado === 'COORDENADOR';
    const padraoEsperado = ehCoordenador ? /^\d{4}$/ : /^\d{5}$/;

    if (!padraoEsperado.test(raDigitado)) {
      return NextResponse.json(
        {
          mensagem: ehCoordenador
            ? 'O RA do coordenador deve ter 4 dígitos.'
            : 'O RA do professor deve ter 5 dígitos.',
        },
        { status: 400 }
      );
    }

    let usuario = await prisma.usuario.findFirst({
      where: raDigitado === '1234'
        ? { ra: raDigitado }
        : { ra: raDigitado, perfil: perfilNormalizado },
    });

    if (!usuario) {
      usuario = await prisma.usuario.create({
        data: {
          ra: raDigitado,
          perfil: perfilNormalizado,
          nome: perfilNormalizado === 'COORDENADOR' ? 'Coordenador' : 'Professor',
        },
      });
    }

    return NextResponse.json({
      mensagem: 'Sucesso',
      usuario,
    }, { status: 200 });
  } catch (error) {
    console.error('Erro no Prisma:', error);
    return NextResponse.json(
      { mensagem: 'Erro interno de conexão com o banco de dados.' },
      { status: 500 }
    );
  }
}