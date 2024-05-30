const validarNombreUsuario = ( nombreUsuario:string ) : boolean => {
    const regex = /^@.*/;
    return regex.test(nombreUsuario);
}

export default validarNombreUsuario;