import { InterfaceConsultaUsuarios } from './types/InterfacesUsuario';

async function consultaUsuarios (nombre: string | null, todos: boolean): Promise<InterfaceConsultaUsuarios> {
    
    try {
        const response = await fetch(`/api/usuario/consulta-usuarios`, {
            method: 'POST',
            cache: 'no-store',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
              nombre,
              todos,
             })
          });

        const data: InterfaceConsultaUsuarios = await response.json();
        return data;
      } catch (error) {
        console.error('Error al llamar a la API:', error);
        throw error;
      }
}

export default consultaUsuarios;