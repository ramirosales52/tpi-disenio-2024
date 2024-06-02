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

      // Calculamos el puntaje promedio de las reseñas
      const puntaje = vino.calcularPromedioReseñasValidadas(
        reseniasDeSommeliersEnPeriodo
      )

      // Creamos un nuevo map para el vino con el puntaje promedio
      const map = new Map<Vino, number>()
      map.set(vino, puntaje)
      this.vinosConPuntaje.push(map)
    })

    // Ordenamos los vinos y tomamos los primeros 10
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

    if (datosVinoConPuntaje.length === 0) {
      this.notificarNoHayVinosConPuntaje()
      return
    }

    // Creamos el PDF o el Excel dependiendo del pedido del usuario
    if (this.tipoVisualizacion === 'excel') {
      this.generarExcel(datosVinoConPuntaje)
      console.log('Excel generado correctamente')
    }
    if (this.tipoVisualizacion === 'pdf') {
      this.generarPDF(datosVinoConPuntaje)
      console.log('PDF generado correctamente')
    }

    //TODO: Notificar
  }

  public notificarNoHayVinosConPuntaje() {
    console.log('No hay vinos con puntaje')
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
}
