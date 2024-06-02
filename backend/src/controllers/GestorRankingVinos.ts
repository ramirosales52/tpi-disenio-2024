import Vino from '../models/Vino'

import { vinos } from '../data/data'
import { exportVinosToExcel } from '../utils/exceljs'
import { exportVinosToPDF } from '../utils/pdfkit'
import { type VinosConDatosYPromedio } from '../types'

export default class GestorRankingVinos {
  private fechaDesde: Date = new Date()
  private fechaHasta: Date = new Date()
  private tipoVisualizacion?: string
  private vinosConResenias: Array<Vino> = []
  private vinosConPuntaje: Map<Vino, number>[] = []

  constructor() {}

  public async generarRankingVinos(): Promise<{
    success: boolean
    message: string
  }> {
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

      if (reseniasDeSommeliersEnPeriodo.length === 0) return

      // Calculamos el puntaje promedio de las reseñas
      const puntaje = vino.calcularPromedioReseniasValidadas(
        reseniasDeSommeliersEnPeriodo
      )

      // Creamos un nuevo map para el vino con el puntaje promedio
      const map = new Map<Vino, number>()
      map.set(vino, puntaje)
      this.vinosConPuntaje.push(map)
    })

    // Ordenamos los vinos y tomamos los primeros 10
    this.ordenarVinosSegunCalificacion()
    const { success, message } = await this.obtenerTopTenVinosConInformacion()
    return { success, message }
  }

  public ordenarVinosSegunCalificacion() {
    this.vinosConPuntaje.sort((a, b) => {
      const puntajeA = a.values().next().value
      const puntajeB = b.values().next().value
      return puntajeB - puntajeA
    })
  }

  public async obtenerTopTenVinosConInformacion() {
    // Tomamos los primeros 10 vinos de la lista ordenada
    const top10VinosConPuntaje = this.vinosConPuntaje.slice(0, 10)

    const datosVinoConPuntaje = top10VinosConPuntaje.map(vinoConPuntaje => {
      const vino: Vino = vinoConPuntaje.keys().next().value
      const puntaje = vinoConPuntaje.values().next().value

      // Obtenemos la información del vino y le agregamos el puntaje promedio
      const datosVino = vino.obtenerInformacionVinoBodegaVarietal()
      const datosVinoConPuntaje: VinosConDatosYPromedio = {
        ...datosVino,
        puntaje,
      }

      return datosVinoConPuntaje
    })

    // Validamos si hay vinos con reseñas validas
    if (this.validarSiHayReseniasValidas(datosVinoConPuntaje)) {
      return { success: false, message: 'No hay vinos con reseñas validas' }
    }

    // Creamos el PDF o el Excel dependiendo del pedido del usuario
    if (this.tipoVisualizacion === 'xlsx') {
      await this.generarExcel(datosVinoConPuntaje)
      return { success: true, message: 'Excel generado correctamente' }
    }
    if (this.tipoVisualizacion === 'pdf') {
      await this.generarPDF(datosVinoConPuntaje)
      return { success: true, message: 'PDF generado correctamente' }
    }

    return { success: false, message: 'No se pudo generar' }
  }

  public validarSiHayReseniasValidas(
    datosVinoConPuntaje: VinosConDatosYPromedio[]
  ) {
    return datosVinoConPuntaje.length === 0
  }

  public async generarExcel(datosVinoConPuntaje: VinosConDatosYPromedio[]) {
    await exportVinosToExcel(datosVinoConPuntaje)
  }

  public async generarPDF(datosVinoConPuntaje: VinosConDatosYPromedio[]) {
    await exportVinosToPDF(datosVinoConPuntaje)
  }

  public opcionGenerarRankingVinos(): void {
    // Solitar fechas para generar el ranking
    // pantalla.solicitarFechasDesdeYHasta()
  }

  public tomarFechasIngresadas(fechaDesde: Date, fechaHasta: Date) {
    const { error } = this.validarFechasIngresadas(fechaDesde, fechaHasta)

    if (error) return { error }

    this.fechaDesde = fechaDesde
    this.fechaHasta = fechaHasta

    return { error: false }
    // pantalla.solicitarTipoReseña()
  }

  public tomarTipoVisualizacion(tipoVisualizacion: string) {
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
      return {
        error: true,
      }
    }
    return {
      error: false,
    }
  }

  // public solicitarReseña() {}

  // public solicitarFormaVisualizacion() {}

  // public solicitarConfirmacion() {}
}
