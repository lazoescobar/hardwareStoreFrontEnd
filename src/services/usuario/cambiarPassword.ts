import { General } from './types/InterfacesUsuario';

async function cambiarPasswordUsuario( idUsuario: number, idUsuarioACambiar: number, password : string): Promise<General> {
    
    try {
        const response = await fetch('/api/usuario/cambiar-password', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                idUsuario,
                idUsuarioACambiar,
                password
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

export default cambiarPasswordUsuario;