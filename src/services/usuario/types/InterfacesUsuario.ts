
/* Consulta producto */
export interface Usuario {
    id: number;
    nombreUsuario: string;
    nombreCompleto: string;
    perfil: string;
    fechaRegistro: string;
    estado: string;
}

export interface InterfaceConsultaUsuarios {
    mensaje: string;
    usuarios: Array<Usuario>;
}
 
export interface UsuarioPorId {
    id: number;
    nombre: string;
    fechaRegistro: string;
    fechaModificacion: string;
}

export interface InterfaceConsultaUsuario {
    mensaje: string;
    usuario: UsuarioPorId;
}

export interface General{
    mensaje: string;
}
 
