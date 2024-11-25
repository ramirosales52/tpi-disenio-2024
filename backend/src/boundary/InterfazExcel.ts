import { type VinosConDatosYPromedio } from '../types'

export interface InterfazExcel {
  exportVinosToExcel(datosVinos: VinosConDatosYPromedio[]): Promise<void>
  getExportPath(): string
}
