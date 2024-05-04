import { InfaceSalidaConsultaMovimientos } from './types/InterfaceMovimientoProducto';

async function consultaMovimientoIngresoEgreso(idProducto: number): Promise<InfaceSalidaConsultaMovimientos> {
    
    try {
        const response = await fetch(`/api/movimientos-producto/${idProducto}/consulta-movimientos`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

        const data: InfaceSalidaConsultaMovimientos = await response.json();
        return data;
      } catch (error) {
        console.error('Error al llamar a la API:', error);
        throw error;
      }
}

export default consultaMovimientoIngresoEgreso;