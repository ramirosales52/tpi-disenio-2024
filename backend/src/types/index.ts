// // import Bodega from '../models/Bodega'
// import Pais from '../models/Pais'
// import Provincia from '../models/Provincia'
import RegionVitivinicola from '../models/RegionVitivinicola'

// import { RegionVitivinicola } from "@prisma/client"

export type VinosConDatosYPromedio = {
  puntaje: number
  vino: string
  bodega: string

  //Devolviendo string[]
  // region: string

  //Devolviendo [string, RegionVitivinicola]
  // region: RegionVitivinicola

  region: string

  varietales: string[]
  precio: number
  provincia?: string
  pais?: string
}
