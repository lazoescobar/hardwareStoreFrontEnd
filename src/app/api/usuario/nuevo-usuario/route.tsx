import { type NextRequest, NextResponse} from "next/server";
 
export async function POST(request: NextRequest) {
  const bodyRequest = await request.json();
  if( bodyRequest?.idUsuario && bodyRequest?.tipoUsuario && bodyRequest?.tipoDocumento && bodyRequest?.numeroDocumento &&
    bodyRequest?.nombres && bodyRequest?.apellidoPaterno && bodyRequest?.apellidoMaterno && bodyRequest?.nombreUsuario && bodyRequest?.password ){
    const { idUsuario, tipoUsuario, tipoDocumento, numeroDocumento, nombres, apellidoPaterno, apellidoMaterno, nombreUsuario, password } = bodyRequest;
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/modulo-usuario/usuario/registrar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
        body: JSON.stringify({ 
          idUsuario,
          tipoUsuario,
          tipoDocumento,
          numeroDocumento,
          nombres,
          apellidoPaterno,
          apellidoMaterno,
          nombreUsuario,
          password
         }),
      });
      const { status } = response;
      const data = await response.json();
      return NextResponse.json({ data }, { status: status });
    } catch (error) {
      console.error('Error al obtener datos de la API externa');
      throw error;
    }
  }
  else{
    throw new Error('Parametros en peticion no existen');
  }
}