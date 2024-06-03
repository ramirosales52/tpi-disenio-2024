import TipoUva from './TipoUva'

export default class Varietal {
  private nombre: string
  private descripcion: string
  private tipoUva: TipoUva

  constructor(nombre: string, descripcion: string, tipoUva: TipoUva) {
    this.nombre = nombre
    this.descripcion = descripcion
    this.tipoUva = tipoUva
  }

  obtenerNombreYTipoUva(): string {
    return `${this.nombre} - Tipo Uva: ${this.tipoUva.getTipoUva()}`
  }

  getNombre(): string {
    return this.nombre
  }

  getDescripcion(): string {
    return this.descripcion
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

  setDescripcion(descripcion: string) {
    this.descripcion = descripcion
  }
}
