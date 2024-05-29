export default class Resenia {
  private esPremium: boolean
  private fechaResenia: Date
  private puntaje: number
  constructor(esPremium: boolean, fechaReseña: Date, puntaje: number) {
    this.esPremium = esPremium
    this.fechaResenia = fechaReseña
    this.puntaje = puntaje
  }

  obtenerPuntaje(): number {
    return this.puntaje
  }

  obtenerEsPremium(): boolean {
    return this.esPremium
  }

  esDePeriodo(fechaInicio: Date, fechaFin: Date): boolean {
    return (
      this.getFechaResenia() >= fechaInicio &&
      this.getFechaResenia() <= fechaFin
    )
  }

  getFechaResenia(): Date {
    return this.fechaResenia
  }
}
