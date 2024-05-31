import { NextRequest, NextResponse } from 'next/server';
import ExcelJS from 'exceljs';

export async function POST(request: NextRequest) {
  const bodyRequest = await request.json();
  if( bodyRequest?.fechaDesde && bodyRequest?.fechaHasta){
    const { fechaDesde, fechaHasta} = bodyRequest;
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/modulo-inventario/movimiento-producto/consulta-movimientos-por-rango-fechas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
        body: JSON.stringify({ 
          fechaDesde,
          fechaHasta,
        }),
      });

      const workbook = new ExcelJS.Workbook();
      const data = await response.json();

      const {fechas} = data;

      for (let clave in fechas) {
        if (fechas.hasOwnProperty(clave)) {
          const sheet = workbook.addWorksheet(clave);
          sheet.columns = [
            { header: 'nombre Producto', key: 'nombreProducto', width: 100 },
            { header: 'Tipo Movimiento', key: 'tipoMovimiento', width: 40 },
            { header: 'Cantidad', key: 'cantidad', width: 20 },
          ];
          const movimientos = fechas[clave];
          for (let movimiento of movimientos) {
            const movimientoObject = {nombreProducto: movimiento.nombreProducto, tipoMovimiento: movimiento.tipoMovimiento, cantidad: movimiento.cantidad};
            sheet.addRow(movimientoObject);
          }
          const headerRow1 = sheet.getRow(1);
          headerRow1.eachCell((cell, colNumber) => {
            cell.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: '93AABF' },
            };
            cell.font = {
              bold: true,
            };
            cell.border = {
              top: { style: 'thin' },
              left: { style: 'thin' },
              bottom: { style: 'thin' },
              right: { style: 'thin' },
            };
          });
        }
      }
      
      const buffer = await workbook.xlsx.writeBuffer();
      const headers = new Headers({
        'Content-Disposition': 'attachment; filename=report.xlsx',
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      return new NextResponse(buffer, { headers });
    } catch (err) {
      console.error('Error generating report', err);
      return new NextResponse('Error generating report', { status: 500 });
    }
  }
  else{
    throw new Error('Parametros en peticion no existen');
  }
}