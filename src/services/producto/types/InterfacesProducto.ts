export interface InfoProducto {
    id: number;
    nombre: string;
    tipo?: string;
    descrTipo?: string;
    fechaRegistro: string;
    fechaModificacion: string;
}
 
export interface InformacionProducto {
    mensaje: string;
    infoProducto : InfoProducto;
}
  