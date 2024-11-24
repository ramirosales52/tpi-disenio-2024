import Pais from '../models/Pais'
import Provincia from '../models/Provincia'
import RegionVitivinicola from '../models/RegionVitivinicola'

export default class Entidades {
  public static getOrCreateRegion(
    regiones: RegionVitivinicola[],
    nombre: string
  ): RegionVitivinicola {
    let region = regiones.find(r => r.getNombre() === nombre)
    if (!region) {
      region = new RegionVitivinicola(nombre)
    }
    return region
  }

  public static getOrCreatePais(paises: Pais[], nombre: string): Pais {
    let pais = paises.find(p => p.obtenerNombre() === nombre)
    if (!pais) {
      pais = new Pais(nombre)
    }
    return pais
  }

  public static getOrCreateProvincia(
    provincias: Provincia[],
    nombre: string
  ): Provincia {
    let provincia = provincias.find(p => p.getNombre() === nombre)
    if (!provincia) {
      provincia = new Provincia(nombre)
    }
    return provincia
  }
}
