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
    tipo: string;
}

export interface InterfaceConsultaProductos {
    mensaje: string;
    productos: Array<Producto>;
}
 

/* Consulta producto por nombre*/
export interface ProductoPorNombre {
    nombre: string;
    fechaRegistroProducto: string;
}

export interface InterfaceConsultaProductosPorNombre {
    mensaje: string;
    productos: Array<ProductoPorNombre>;
}


export interface InterfaceNuevoProducto {
    status: number;
    data : {
        mensaje: string;
    }
}