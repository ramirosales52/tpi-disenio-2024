import Pais from './Pais'

export default class Provincia {
  private nombre: string
  private pais: Pais
  constructor(nombre: string, pais: Pais) {
    this.nombre = nombre
    this.pais = pais
  }

  obtenerNombreYPais(): string {
    return this.nombre + ', ' + this.pais.obtenerNombre()
  }

  getNombre(): string {
    return this.nombre
  }

  getPais(): Pais {
    return this.pais
  }
}
