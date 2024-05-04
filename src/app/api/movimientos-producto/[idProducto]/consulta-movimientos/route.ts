import {NextRequest, NextResponse} from "next/server";

export async function GET (request: NextRequest, { params }: { params: { idProducto: number } }){
    const {idProducto} = params;
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/modulo-inventario/movimiento-producto/consulta-movimientos/${idProducto}`,
          {
            method: 'GET',
            cache: 'no-store',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        const data = await response.json();
        return NextResponse.json(data);
      } catch (error) {
        console.error('Error al obtener datos de la API externa');
        throw error;
      }
}