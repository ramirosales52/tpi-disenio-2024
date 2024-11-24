import PDFDocument from 'pdfkit'
import fs from 'node:fs'
import path from 'node:path'

import { type VinosConDatosYPromedio } from '../types'

/**
 * Clase responsable de la exportación de datos de vinos a PDF.
 * Actúa como un Boundary en la arquitectura del sistema.
 */
export class PDFExporter {
  private exportPath: string

  constructor(exportDir: string = '../output', fileName: string = 'vinos.pdf') {
    this.exportPath = path.resolve(__dirname, exportDir, fileName)
  }

  // Genera un archivo PDF con los datos de los vinos.
  public async exportVinosToPDF(
    datosVinos: VinosConDatosYPromedio[]
  ): Promise<void> {
    const doc = new PDFDocument()
    doc.pipe(fs.createWriteStream(this.exportPath))

    // Título principal
    doc.fontSize(18).text('Lista de Vinos', { align: 'center' })
    doc.moveDown()

    // Iterar sobre los datos de vinos y escribir la información en el PDF
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

    // Finalizar el documento
    doc.end()
  }

  public getExportPath(): string {
    return this.exportPath
  }
}
