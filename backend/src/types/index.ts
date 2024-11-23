import Bodega from '../models/Bodega'
import Pais from '../models/Pais'
import Provincia from '../models/Provincia'
import RegionVitivinicola from '../models/RegionVitivinicola'

export type VinosConDatosYPromedio = {
  puntaje: number
  vino: string
  bodega: Bodega
  region: RegionVitivinicola
  varietales: string[]
  precio: number
  provincia?: Provincia
  pais?: Pais
}
