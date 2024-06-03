import Provincia from './Provincia'

export default class RegionVitivinicola {
  private nombre: string
  private provincia: Provincia
  constructor(nombre: string, provincia: Provincia) {
    this.nombre = nombre
    this.provincia = provincia
  }

  obtenerNombreProvinciaYPais(): string {
    return this.nombre + ', ' + this.provincia.obtenerNombreYPais()
  }

  getNombre(): string {
    return this.nombre
  }

  getProvincia(): Provincia {
    return this.provincia
  }
}
