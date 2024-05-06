import { InterfaceConsultaProductos } from './types/InterfacesProducto';

async function consultaProductos (nombre: string | null, todos: boolean): Promise<InterfaceConsultaProductos> {
    
    try {
        const response = await fetch(`/api/producto/consulta-productos`, {
            method: 'POST',
            cache: 'no-store',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
              nombre,
              todos,
             })
          });

        const data: InterfaceConsultaProductos = await response.json();
        return data;
      } catch (error) {
        console.error('Error al llamar a la API:', error);
        throw error;
      }
}

export default consultaProductos;