import PDFDocument from 'pdfkit'
import fs from 'node:fs'
import path from 'node:path'

import { type VinosConDatosYPromedio } from '../types'

export const exportVinosToPDF = async (
  datosVinos: VinosConDatosYPromedio[]
) => {
  const exportPath = path.resolve(__dirname, '../output/vinos.pdf')
  const doc = new PDFDocument()
  doc.pipe(fs.createWriteStream(exportPath))

  doc.fontSize(18).text('Lista de Vinos', { align: 'center' })
  doc.moveDown()

  datosVinos.forEach(datosVino => {
    doc.fontSize(12).text(`${datosVino.vino}`, { underline: true })
    doc.text(
      `Bodega: ${datosVino.bodega.getNombre()}, ${datosVino.provincia?.getNombre()}, ${datosVino.pais?.obtenerNombre()}`
    )
    doc.text(`Varietales: ${datosVino.varietales}`)
    doc.text(`Puntaje: ${datosVino.puntaje}`)
    doc.text(`Precio: ${datosVino.precio}`)
    doc.moveDown()
  })

  doc.end()
}
