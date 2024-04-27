interface Producto {
    id: number;
    nombre: string;
    fechaRegistro: string;
    fechaModificacion: string;
}
 
export interface InformacionProducto {
    mensaje: string;
    producto : Producto;
}
  
async function obtenerinfoProducto(id: string | string[]): Promise<InformacionProducto> {
    try {
      const response = await fetch(`/api/producto/${id}`);
      if (!response.ok) {
        throw new Error('Error al obtener los datos');
      }
      const data: InformacionProducto = await response.json();
      return data;
    } catch (error) {
      console.error('Error al llamar a la API:', error);
      throw error;
    }
}

export default obtenerinfoProducto;