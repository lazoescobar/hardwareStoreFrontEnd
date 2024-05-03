import {NextRequest, NextResponse} from "next/server";

export async function POST (request: NextRequest, { params }: { params: { idProducto: number } }){
    const {idProducto} = params;
    const bodyRequest = await request.json();

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/modulo-inventario/movimiento-producto/registrar-nuevo-movimiento/${idProducto}`,
          {
            method: 'POST',
            cache: 'no-store',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify( bodyRequest )
          }
        );
        const data = await response.json();
        return NextResponse.json(data);
      } catch (error) {
        console.error('Error al obtener datos de la API externa');
        throw error;
      }
  
}
