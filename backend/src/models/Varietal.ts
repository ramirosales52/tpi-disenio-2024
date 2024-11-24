import TipoUva from './TipoUva'

export default class Varietal {
  private nombre: string
  private tipoUva: TipoUva

  constructor(nombre: string, tipoUva: TipoUva) {
    this.nombre = nombre
    this.tipoUva = tipoUva
  }

  obtenerNombreYTipoUva(): string {
    return `${this.nombre} - Tipo Uva: ${this.tipoUva.getTipoUva()}`
  }

  getNombre(): string {
    return this.nombre
  }

  getTipoUva(): TipoUva {
    return this.tipoUva
  }

  setNombre(nombre: string) {
    this.nombre = nombre
  }

  setTipoUva(tipoUva: TipoUva) {
    this.tipoUva = tipoUva
  }
}
