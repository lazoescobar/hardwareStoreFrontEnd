const validarNombre = ( nombre:string ) : boolean => {
    const regex = /^([A-ZÁÉÍÓÚÑÄËÏÖÜáéíóúñäëïöü][a-záéíóúñäëïöü]+[ \-']?)+$/;
    return regex.test(nombre);
}

export default validarNombre;