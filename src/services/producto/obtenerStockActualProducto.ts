import { InformacionStockProducto } from './types/InterfacesProducto'; 

async function obtenerStockActualProducto ( idProducto: number ): Promise<number> {
    
    try {
        const response = await fetch(`/api/producto/${idProducto}/stock-actual`);
        if (!response.ok) {
            throw new Error('Error al enviar los datos');
        } 
        const data: InformacionStockProducto = await response.json();
        const stock : number = data.stockActual;
        return stock;
      } catch (error) {
        console.error('Error al llamar a la API:', error);
        throw error;
      }
}

export default obtenerStockActualProducto;