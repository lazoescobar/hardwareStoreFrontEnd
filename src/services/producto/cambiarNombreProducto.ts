import {InformacionProducto, InfoProducto} from './types/InterfacesProducto';

async function cambiarNombreProducto( idUsuario: number, idProducto: number, nuevoNombre : string): Promise<InfoProducto> {
    
    try {
        const response = await fetch('/api/producto/cambiar-nombre', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                idUsuario,
                idProducto,
                nuevoNombre
             }),
          });

        if (!response.ok) {
            throw new Error('Error al enviar los datos');
        } 
        const data: InformacionProducto = await response.json();
        const producto : InfoProducto = data.infoProducto;
        return producto;
      } catch (error) {
        console.error('Error al llamar a la API:', error);
        throw error;
      }
}

export default cambiarNombreProducto;