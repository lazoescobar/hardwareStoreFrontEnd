export interface InfoProducto {
    id: number;
    nombre: string;
    tipo?: string;
    descTipo?: string;
    fechaRegistro: string;
    fechaModificacion: string;
}
 
export interface InformacionProducto {
    mensaje: string;
    infoProducto : InfoProducto;
}

export interface InformacionStockProducto{
    mensaje: string;
    stockActual : number;
}
  