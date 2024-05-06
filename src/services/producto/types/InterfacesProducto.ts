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



/* Consulta producto */
export interface Producto {
    id: number;
    nombre: string;
    fechaRegistroProducto: string;
    fechaUltimoIngreso: string;
    fechaUltimoEngreso: string;
    stockActual: number;
}

export interface InterfaceConsultaProductos {
    mensaje: string;
    productos: Array<Producto>;
}
  