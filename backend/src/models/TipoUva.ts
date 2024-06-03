export default class TipoUva {
  private nombre: string
  constructor(nombre: string) {
    this.nombre = nombre
  }

  getNombre(): string {
    return this.nombre
  }

  getTipoUva(): string {
    return this.getNombre()
  }

  setNombre(nombre: string) {
    this.nombre = nombre
  }
}
