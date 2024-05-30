import {InterfaceNuevoUsuario} from './types/InterfacesUsuario';

async function registrarNuevoUsuario ( idUsuario: number, tipoUsuario : string, tipoDocumento: string,
                                        numeroDocumento: string, nombres: string, apellidoPaterno: string,
                                        apellidoMaterno: string, nombreUsuario: string, password:string ): Promise<InterfaceNuevoUsuario> {
    
    try {
        const response = await fetch('/api/usuario/nuevo-usuario', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                idUsuario,
                tipoUsuario,
                tipoDocumento,
                numeroDocumento,
                nombres,
                apellidoPaterno, 
                apellidoMaterno, 
                nombreUsuario, 
                password,
             }),
          });

        const data = await response.json();
        const out:InterfaceNuevoUsuario = {...data}; 
        out.status = response.status;
        return out;
      } catch (error) {
        console.error('Error al llamar a la API:', error);
        throw error;
      }
}

export default registrarNuevoUsuario;