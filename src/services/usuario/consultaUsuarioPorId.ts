import { InterfaceConsultaUsuario, UsuarioPorId } from './types/InterfacesUsuario';

async function consultaUsuario (id: string | string[]): Promise<UsuarioPorId> {
    
    try {
        const response = await fetch(`/api/usuario/${id}`, {
            method: 'GET',
            cache: 'no-store',
            headers: {
              'Content-Type': 'application/json',
            }
          });

        const data: InterfaceConsultaUsuario = await response.json();
        const usuario: UsuarioPorId = data.usuario;
        return usuario;
      } catch (error) {
        console.error('Error al llamar a la API:', error);
        throw error;
      }
}

export default consultaUsuario;