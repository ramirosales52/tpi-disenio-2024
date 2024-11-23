export default class RegionVitivinicola {
  private nombre: string
  constructor(nombre: string) {
    this.nombre = nombre
  }

  getNombre(): string {
    return this.nombre
  }
}
