import Excel from 'exceljs'
import path from 'node:path'

import { type VinosConDatosYPromedio } from '../types'

export const exportVinosToExcel = async (
  datosVinos: VinosConDatosYPromedio[]
) => {
  const workbook = new Excel.Workbook()
  const worksheet = workbook.addWorksheet('Lista de Vinos')

  worksheet.columns = [
    {
      header: 'Puntaje',
      key: 'puntaje',
      width: 10,
      font: { bold: true, size: 16 },
    },
    { header: 'Vino', key: 'vino', width: 10 },
    { header: 'Bodega', key: 'bodega', width: 10 },
    { header: 'Varietales', key: 'varietales', width: 10 },
    { header: 'Precio', key: 'precio', width: 10 },
  ]

  datosVinos.forEach(datosVino => {
    worksheet.addRow(datosVino)
  })

  const exportPath = path.resolve(__dirname, '../output/vinos.xlsx')

  await workbook.xlsx.writeFile(exportPath)
}
