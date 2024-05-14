import {InterfaceNuevoProducto} from './types/InterfacesProducto';

async function registrarNuevoProducto( idUsuario: number, nombre: string, cantidad : number, tipoProducto: string): Promise<InterfaceNuevoProducto> {
    
    try {
        const response = await fetch('/api/producto/nuevo-producto', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                idUsuario,
                nombre,
                cantidad,
                tipoProducto
             }),
          });

        const data = await response.json();
        const out:InterfaceNuevoProducto = {...data}; 
        out.status = response.status;
        return out;
      } catch (error) {
        console.error('Error al llamar a la API:', error);
        throw error;
      }
}

export default registrarNuevoProducto;