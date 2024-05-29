export default class TipoUva {
  private nombre: string
  constructor(nombre: string) {
    this.nombre = nombre
  }

  getNombre(): string {
    return this.nombre
  }

  setNombre(nombre: string) {
    this.nombre = nombre
  }
}
