import {NextRequest, NextResponse} from "next/server";

export async function POST(request: NextRequest) {
    const bodyRequest = await request.json();
    if( bodyRequest?.idUsuarioDesactiva && bodyRequest?.idUsuario ){
      const { idUsuarioDesactiva, idUsuario } = bodyRequest;
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/modulo-usuario/usuario/desactivar`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-store',
          body: JSON.stringify({ 
            idUsuarioDesactiva,
            idUsuario
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