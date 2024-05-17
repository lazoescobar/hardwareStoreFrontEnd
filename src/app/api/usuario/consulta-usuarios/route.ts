import {NextRequest, NextResponse} from "next/server";

export async function POST (request: NextRequest){
    const bodyRequest = await request.json();
    const { nombre, todos} = bodyRequest;
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/modulo-usuario/usuario/consulta-usuarios`,
          {
            method: 'POST',
            cache: 'no-store',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
              nombre,
              todos,
            }),
          }
        );
        const data = await response.json();
        return NextResponse.json(data);
      } catch (error) {
        console.error('Error al obtener datos de la API externa');
        throw error;
      }
}