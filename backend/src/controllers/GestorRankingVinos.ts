import Vino from '../models/Vino'

import { vinos, paisesDB, provinciasDB } from '../data/data'
import { exportVinosToExcel } from '../utils/exceljs'
import { exportVinosToPDF } from '../utils/pdfkit'
import { type VinosConDatosYPromedio } from '../types'
import Provincia from '../models/Provincia'
import Pais from '../models/Pais'
import { SommelierStrategy } from '../models/strategy/SommelierStrategy'
import { TipoReseniaStrategy } from '../models/strategy/TipoReseniaStrategy'
import { AmigoStrategy } from '../models/strategy/AmigoStrategy'
import { NormalStrategy } from '../models/strategy/NormalStrategy'

export default class GestorRankingVinos {
  private fechaDesde: Date = new Date()
  private fechaHasta: Date = new Date()
  private tipoResenia: string = ''
  private strategy: TipoReseniaStrategy | undefined
  private tipoVisualizacion?: string
  private vinosConResenias: Array<Vino> = []
  private vinosConPuntaje: Map<Vino, number>[] = []
  private provincias: Provincia[] = []
  private paises: Pais[] = []

  constructor() {
    this.provincias = provinciasDB
    this.paises = paisesDB
  }

  public async generarRankingVinos(): Promise<{
    success: boolean
    message: string
  }> {
    if (this.tipoResenia === 'sommelier') {
      this.strategy = new SommelierStrategy()
    }
    if (this.tipoResenia === 'amigo') {
      this.strategy = new AmigoStrategy()
    }
    if (this.tipoResenia === 'normal') {
      this.strategy = new NormalStrategy()
    }

    // Filtrar vinos que tengan al menos una reseña
    this.vinosConResenias = vinos.filter(vino => {
      if (!vino.tieneResenias()) {
        return
      }

      if (!this.strategy) {
        throw new Error('Estrategia no definida')
      }

      // IMPLEMENTAMOS EL PATRÓN STRATEGY
      const reseniasEnPeriodo = vino.filtrarResenias(
        this.strategy,
        this.fechaDesde,
        this.fechaHasta
      )

      if (reseniasEnPeriodo.length === 0) return

      // Calculamos el puntaje promedio de las reseñas
      // Lo hacemos en el vino para no repetir código por cada estrategia
      const puntaje = vino.calcularPromedioReseniasValidadas(reseniasEnPeriodo)

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
      const puntajeA = a.values().next().value || 0
      const puntajeB = b.values().next().value || 0
      return puntajeB - puntajeA
    })
  }

  public async obtenerTopTenVinosConInformacion() {
    // Tomamos los primeros 10 vinos de la lista ordenada
    const top10VinosConPuntaje = this.vinosConPuntaje.slice(0, 10)

    const datosVinoConPuntaje = top10VinosConPuntaje.map(vinoConPuntaje => {
      const vino = vinoConPuntaje.keys().next().value
      if (!vino) {
        throw new Error('Vino no encontrado')
      }

      const puntaje = vinoConPuntaje.values().next().value

      // Obtenemos la información del vino y le agregamos el puntaje promedio
      const datosVino = vino.obtenerInformacionVinoBodegaRegionYVarietal()

      const datosVinoConPuntaje: VinosConDatosYPromedio = {
        ...datosVino,
        puntaje: puntaje || 0,
      }

      // Buscamos entre todas las provincias la que contienen la región del vino
      const provinciaEncontrada = this.provincias.find(provincia =>
        provincia.esTuRegion(datosVinoConPuntaje.region)
      )
      if (!provinciaEncontrada) {
        throw new Error('Provincia no encontrada')
      }
      datosVinoConPuntaje.provincia = provinciaEncontrada

      // Buscar país que contenga la provincia
      const paisEncontrado = this.paises.find(pais =>
        pais.esTuProvincia(provinciaEncontrada)
      )
      if (!paisEncontrado) {
        throw new Error('País no encontrado')
      }
      datosVinoConPuntaje.pais = paisEncontrado

      return datosVinoConPuntaje
    })

    // Validamos si hay vinos con reseñas validas
    if (!this.validarSiHayReseniasValidas(datosVinoConPuntaje)) {
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
    return datosVinoConPuntaje.length !== 0
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
  }

  public tomarTipoVisualizacion(tipoVisualizacion: string) {
    this.tipoVisualizacion = tipoVisualizacion
  }

  public mostrarOpcionesVisualizacion() {
    // pantalla.solicitarTipoVisualizacion()
  }

  public async tomarConfirmacion() {
    return await this.generarRankingVinos()
  }

  public tomarTipoResenia(tipoResenia: string) {
    this.tipoResenia = tipoResenia
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
}
