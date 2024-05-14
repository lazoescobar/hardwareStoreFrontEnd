import { type NextRequest, NextResponse} from "next/server";
 
export async function POST(request: NextRequest) {
  const bodyRequest = await request.json();
  if( bodyRequest?.idUsuario && bodyRequest?.nombre && bodyRequest?.cantidad && bodyRequest?.tipoProducto){
    const { idUsuario, nombre, cantidad, tipoProducto } = bodyRequest;
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/modulo-inventario/producto/nuevo-producto`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
        body: JSON.stringify({ 
          idUsuario,
          nombre,
          cantidad,
          tipoProducto
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