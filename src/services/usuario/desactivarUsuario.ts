import { General } from './types/InterfacesUsuario';

async function desactivarUsuario( idUsuarioDesactiva: number, idUsuario: number): Promise<General> {
    
    try {
        const response = await fetch('/api/usuario/desactivar', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                idUsuarioDesactiva,
                idUsuario
             }),
          });

        if (!response.ok) {
            throw new Error('Error al enviar los datos');
        } 
        const data: General = await response.json();
        return data;
      } catch (error) {
        console.error('Error al llamar a la API:', error);
        throw error;
      }
}

export default desactivarUsuario;