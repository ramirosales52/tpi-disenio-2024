import Resenia from '../models/Resenia'
import Vino from '../models/Vino'

import { vinos } from '../data/data'

type VinosConDatosYPromedio = {
  name: string
  promedio: number
}

export default class GestorRankingVinos {
  private fechaDesde: Date = new Date()
  private fechaHasta: Date = new Date()
  private tipoVisualizacion?: string
  private vinosConResenias: Array<Vino> = []
  private vinosConPuntaje: Map<Vino, number>[] = []
  // private reseniasDeSommeliersEnPeriodo: Array<Resenia> = []

  private reseniasDeSommeliers: Array<Resenia> = []
  // private sommeliers: Array<Sommelier> = []
  // string -> nombre vino
  // number -> puntaje

  constructor() {
    // Inicializamos el array de TODOS LOS VINOS en el gestor
  }

  public generarRankingVinos(): void {
    // Filtrar vinos que tengan al menos una reseña
    this.vinosConResenias = vinos.filter(vino => {
      return vino.tieneResenias()
    })

    // Recorremos cada vino que tenga reseñas
    this.vinosConResenias.forEach(vino => {
      // Obtenemos las reseñas de los sommeliers dentro del periodo para cada vino
      const reseniasDeSommeliersEnPeriodo =
        vino.mostrarReseñasDeSommelierEnPeriodo(
          this.fechaDesde,
          this.fechaHasta
        )
      // console.log({ reseniasDeSommeliersEnPeriodo })

      const puntaje = vino.calcularPromedioReseñasValidadas(
        reseniasDeSommeliersEnPeriodo
      )
      const map = new Map<Vino, number>()
      map.set(vino, puntaje)
      this.vinosConPuntaje.push(map)
    })

    this.ordenarVinosSegunCalifiacion()
    this.obtenerTopTenVinosConInformacion()
  }

  public ordenarVinosSegunCalifiacion() {
    this.vinosConPuntaje.sort((a, b) => {
      const puntajeA = a.values().next().value
      const puntajeB = b.values().next().value
      return puntajeB - puntajeA
    })
  }

  public obtenerTopTenVinosConInformacion() {
    // Tomamos los primeros 10 vinos de la lista ordenada
    const top10VinosConPuntaje = this.vinosConPuntaje.slice(0, 10)

    top10VinosConPuntaje.forEach(vinoConPuntaje => {
      const vino: Vino = vinoConPuntaje.keys().next().value
      const puntaje = vinoConPuntaje.values().next().value
      const datosVino = vino.obtenerInformacionVinoBodegaVarietal()
      console.log(`${datosVino}Puntaje: ${puntaje}\n`)
    })
  }

  public opcionGenerarRankingVinos(): void {
    // Solitar fechas para generar el ranking
    // pantalla.solicitarFechasDesdeYHasta()
  }

  public tomarFechasIngresadas(fechaDesde: Date, fechaHasta: Date) {
    try {
      this.validarFechasIngresadas(fechaDesde, fechaHasta)
      this.fechaDesde = fechaDesde
      this.fechaHasta = fechaHasta
    } catch (error) {
      console.log(error)
    }

    // pantalla.solicitarTipoReseña()
  }

  public tomarTipoVisualizacion(tipoVisualizacion: string) {
    // TENGO EL TIPO DE RESEÑA SELECCIONADO POR EL USUARIO
    this.tipoVisualizacion = tipoVisualizacion
  }

  public mostrarOpcionesVisualizacion() {
    // pantalla.solicitarTipoVisualizacion()
  }

  public tomarConfirmacion() {
    // TENGO LA CONFIRMACION DEL USUARIO
    this.generarRankingVinos()
  }

  public validarFechasIngresadas(fechaDesde: Date, fechaHasta: Date) {
    // Validar que la fecha Desde sea menor o igual a la fecha Hasta
    if (fechaDesde > fechaHasta) {
      throw new Error('La fecha Desde debe ser menor o igual a la fecha Hasta.')
    }
    const fechaActual = new Date()
    if (fechaHasta > fechaActual) {
      throw new Error('La fecha Hasta no puede ser mayor a la fecha actual.')
    }
  }

  public solicitarReseña() {}

  public solicitarFormaVisualizacion() {}

  public solicitarConfirmacion() {}

  public calcularPromedioReseniaVino() {}
}
