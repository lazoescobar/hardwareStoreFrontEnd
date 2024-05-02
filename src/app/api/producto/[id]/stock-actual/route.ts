import {NextRequest, NextResponse} from "next/server";

export async function GET (request: NextRequest, { params }: { params: { id: number } }){
    const {id} = params;
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/modulo-inventario/producto/stock-actual/${id}`,
          {
            cache: 'no-store',
          }
        );
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
