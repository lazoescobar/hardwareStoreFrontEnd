import { InterfaceSalidaNuevoMovimiento } from './types/InterfaceMovimientoProducto';

async function nuevoMovimientoIngresoEgreso(idUsuario: number, idProducto: number, tipoMovimiento: string, cantidad: number): Promise<InterfaceSalidaNuevoMovimiento> {
    
    try {
        const response = await fetch(`/api/movimientos-producto/nuevo-movimiento/${idProducto}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                idUsuario,
                tipoMovimiento,
                cantidad
             }),
          });

        const data: InterfaceSalidaNuevoMovimiento = await response.json();
        return data;
      } catch (error) {
        console.error('Error al llamar a la API:', error);
        throw error;
      }
}

export default nuevoMovimientoIngresoEgreso;