import Excel from 'exceljs'
import path from 'node:path'

import { type VinosConDatosYPromedio } from '../types'
import { InterfazExcel } from './InterfazExcel'

export class ExcelExporter implements InterfazExcel {
  private exportPath: string

  constructor(
    exportDir: string = '../output',
    fileName: string = 'vinos.xlsx'
  ) {
    this.exportPath = path.resolve(__dirname, exportDir, fileName)
  }

  public async exportVinosToExcel(
    datosVinos: VinosConDatosYPromedio[]
  ): Promise<void> {
    const workbook = new Excel.Workbook()
    const worksheet = workbook.addWorksheet('Lista de Vinos')

    // Definir las columnas de la hoja
    worksheet.columns = [
      {
        header: 'Puntaje',
        key: 'puntaje',
        width: 10,
        font: { bold: true, size: 16 },
      },
      { header: 'Vino', key: 'vino', width: 20 },
      { header: 'Bodega', key: 'bodega', width: 20 },
      { header: 'Varietales', key: 'varietales', width: 20 },
      { header: 'Precio', key: 'precio', width: 10 },
    ]

    // Agregar filas con los datos de vinos
    // datosVinos.forEach(datosVino => {
    //   worksheet.addRow({
    //     puntaje: datosVino.puntaje,
    //     vino: datosVino.vino,
    //     bodega: datosVino.bodega.getNombre(),
    //     varietales: datosVino.varietales,
    //     precio: datosVino.precio,
    //   })
    // })
    datosVinos.forEach(datosVino => {
      worksheet.addRow(datosVino)
    })

    // Guardar el archivo Excel
    await workbook.xlsx.writeFile(this.exportPath)
  }

  public getExportPath(): string {
    return this.exportPath
  }
}
