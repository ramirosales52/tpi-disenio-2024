import Provincia from './Provincia'

export default class RegionVitivinicola {
  private nombre: string
  private provincia: Provincia
  constructor(nombre: string, provincia: Provincia) {
    this.nombre = nombre
    this.provincia = provincia
  }

  obtenerNombreProvinciaYPais(): string {
    return this.getNombre() + ', ' + this.getProvincia().obtenerNombreYPais()
  }

  getNombre(): string {
    return this.nombre
  }

  getProvincia(): Provincia {
    return this.provincia
  }
}
