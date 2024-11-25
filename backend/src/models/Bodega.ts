import RegionVitivinicola from './RegionVitivinicola'

export default class Bodega {
  private nombre: string
  private region: RegionVitivinicola
  constructor(nombre: string, region: RegionVitivinicola) {
    this.nombre = nombre
    this.region = region
  }

  obtenerNombreYRegion() {
    return [this.getNombre(), [this.region.getNombre(), this.getRegion()]]
  }

  getNombre(): string {
    return this.nombre
  }

  getRegion(): RegionVitivinicola {
    return this.region
  }
}
