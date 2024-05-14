import { InterfaceConsultaProductosPorNombre } from './types/InterfacesProducto';

async function consultaProductosPorNombre (nombre: string): Promise<InterfaceConsultaProductosPorNombre> {
    
    try {
        const response = await fetch(`/api/producto/consulta-productos-por-nombre`, {
            method: 'POST',
            cache: 'no-store',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
              nombre,
             })
          });

        const data: InterfaceConsultaProductosPorNombre = await response.json();
        return data;
      } catch (error) {
        console.error('Error al llamar a la API:', error);
        throw error;
      }
}

export default consultaProductosPorNombre;