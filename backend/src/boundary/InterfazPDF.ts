import { type VinosConDatosYPromedio } from '../types'

export interface InterfazPDF {
  exportVinosToExcel(datosVinos: VinosConDatosYPromedio[]): Promise<void>
  getExportPath(): string
}
