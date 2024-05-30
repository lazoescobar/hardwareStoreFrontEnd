import { NextRequest, NextResponse } from 'next/server';
import ExcelJS from 'exceljs';

export async function GET(req: NextRequest) {
  try {
    // Crear un nuevo workbook
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Reporte');

    // Añadir columnas
    worksheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Nombre', key: 'name', width: 30 },
      { header: 'Edad', key: 'age', width: 10 },
    ];

    // Añadir filas (esto es solo un ejemplo, los datos pueden provenir de una base de datos)
    worksheet.addRow({ id: 1, name: 'Juan', age: 25 });
    worksheet.addRow({ id: 2, name: 'Ana', age: 28 });

    // Generar archivo en buffer
    const buffer = await workbook.xlsx.writeBuffer();

    // Configurar las cabeceras para la descarga
    const headers = new Headers({
      'Content-Disposition': 'attachment; filename=report.xlsx',
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    // Devolver el archivo como respuesta
    return new NextResponse(buffer, { headers });
  } catch (err) {
    console.error('Error generating report', err);
    return new NextResponse('Error generating report', { status: 500 });
  }
}