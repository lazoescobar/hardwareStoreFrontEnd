export interface InterfaceSalidaNuevoMovimiento{
    mensaje: string;
    stockActual?: number;
}

export interface Movimiento {
    fechaMovimiento: string;
    tipoMovimiento: string;
    ingreso?: number;
    egreso?: number;
    stock: number;
}

export interface InfaceSalidaConsultaMovimientos{
    mensaje: string;
    movimientos?: Array<Movimiento>;
}