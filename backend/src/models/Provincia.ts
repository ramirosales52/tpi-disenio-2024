import RegionVitivinicola from './RegionVitivinicola'

export default class Provincia {
  private regionesVitivinicolas: RegionVitivinicola[] = []
  private nombre: string
  constructor(nombre: string) {
    this.nombre = nombre
  }

  getNombre(): string {
    return this.nombre
  }

  getRegionesVitivinicolas(): RegionVitivinicola[] {
    return this.regionesVitivinicolas
  }

  agregarRegionVitivinicola(region: RegionVitivinicola) {
    this.regionesVitivinicolas.push(region)
  }

  eliminarRegionVitivinicola(region: RegionVitivinicola) {
    this.regionesVitivinicolas = this.regionesVitivinicolas.filter(
      r => r !== region
    )
  }

  esTuRegion(region: RegionVitivinicola): boolean {
    return this.regionesVitivinicolas.some(
      r => r.getNombre() === region.getNombre()
    )
  }
}
