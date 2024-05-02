import { InformacionProducto, InfoProducto } from './types/InterfacesProducto';
  
async function obtenerinfoProducto(id: string | string[]): Promise<InfoProducto> {
    try {
      const response = await fetch(`/api/producto/${id}`,
      {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache'
        }
      });
      
      if (!response.ok) {
        throw new Error('Error al obtener los datos');
      }
      const data: InformacionProducto = await response.json();
      const producto : InfoProducto = data.infoProducto;
      return producto;
    } catch (error) {
      console.error('Error al llamar a la API:', error);
      throw error;
    }
}

export default obtenerinfoProducto;