
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
 
