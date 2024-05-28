import {NextRequest, NextResponse} from "next/server";

export async function POST(request: NextRequest) {
    const bodyRequest = await request.json();
    if( bodyRequest?.idUsuario && bodyRequest?.idUsuarioACambiar && bodyRequest?.password){
      const { idUsuario, idUsuarioACambiar, password } = bodyRequest;
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/modulo-usuario/usuario/cambiar-password`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-store',
          body: JSON.stringify({ 
            idUsuario,
            idUsuarioACambiar,
            password,
           }),
        });
        if (!response.ok) {
          throw new Error('No se pudo obtener los datos de la API externa');
        }
        const data = await response.json();
        return NextResponse.json(data);
      } catch (error) {
        console.error('Error al obtener datos de la API externa');
        throw error;
      }
    }
    else{
      throw new Error('Parametros en peticion no existen');
    }
  }