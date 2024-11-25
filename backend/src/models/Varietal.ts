import TipoUva from './TipoUva'

export default class Varietal {
  private nombre: string
  private tipoUva: TipoUva

  constructor(nombre: string, tipoUva: TipoUva) {
    this.nombre = nombre
    this.tipoUva = tipoUva
  }

  obtenerNombreYTipoUva(): string {
    return `${this.getNombre()} - Tipo Uva: ${this.tipoUva.getNombre()}`
  }

  getNombre(): string {
    return this.nombre
  }

  setNombre(nombre: string) {
    this.nombre = nombre
  }

  setTipoUva(tipoUva: TipoUva) {
    this.tipoUva = tipoUva
  }
}
