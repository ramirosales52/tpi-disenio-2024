import Provincia from './Provincia'

export default class Pais {
  private provincias: Provincia[] = []
  private nombre: string
  constructor(nombre: string) {
    this.nombre = nombre
  }

  obtenerNombre(): string {
    return this.nombre
  }

  agregarProvincia(provincia: Provincia) {
    this.provincias.push(provincia)
  }

  eliminarProvincia(provincia: Provincia) {
    this.provincias = this.provincias.filter(p => p !== provincia)
  }

  esTuProvincia(provincia: Provincia): boolean {
    return this.provincias.includes(provincia)
  }
}
