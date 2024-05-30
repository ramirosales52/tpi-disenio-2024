import PDFDocument from 'pdfkit'
import fs from 'node:fs'
import path from 'node:path'

type VinosConDatosYPromedio = {
  puntaje: number
  vino: string
  bodega: string
  varietales: string[]
  precio: number
}

export const exportVinosToPDF = async (
  datosVinos: VinosConDatosYPromedio[]
) => {
  const exportPath = path.resolve(__dirname, '../output/vinos.pdf')
  const doc = new PDFDocument()
  doc.pipe(fs.createWriteStream(exportPath))

  doc.fontSize(18).text('Lista de Vinos', { align: 'center' })
  doc.moveDown()

  // Añadir los datos de cada vino al PDF
  datosVinos.forEach(datosVino => {
    doc.fontSize(12).text(`${datosVino.vino}`, { underline: true })
    doc.text(`Bodega: ${datosVino.bodega}`)
    doc.text(`Varietales: ${datosVino.varietales}`)
    doc.text(`Puntaje: ${datosVino.puntaje}`)
    doc.text(`Precio: ${datosVino.precio}`)
    doc.moveDown()
  })

  doc.end()
}
