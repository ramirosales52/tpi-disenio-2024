import Entidades from '../utils/Entidades'
import { FetchDatabaseException } from '../exceptions/FetchDatabaseException'

import { type VinosConDatosYPromedio } from '../types'

import VinoService from '../services/VinoService'

import Vino from '../models/Vino'
import Pais from '../models/Pais'
import Provincia from '../models/Provincia'

import { SommelierStrategy } from '../models/strategy/SommelierStrategy'
import { TipoReseniaStrategy } from '../models/strategy/TipoReseniaStrategy'
import { AmigoStrategy } from '../models/strategy/AmigoStrategy'
import { NormalStrategy } from '../models/strategy/NormalStrategy'

import Mapper from '../mapper/Mapper'
import { PDFExporter } from '../boundary/PDFExporter'
import { ExcelExporter } from '../boundary/ExcelExporter'
import RegionVitivinicola from '../models/RegionVitivinicola'

export default class GestorRankingVinos {
  private fechaDesde: Date = new Date()
  private fechaHasta: Date = new Date()
  private tipoResenia: string = ''
  private strategy: TipoReseniaStrategy | undefined
  private tipoVisualizacion?: string
  private vinosConPuntaje: Map<Vino, number>[] = []
  private provincias: Provincia[] = []
  private paises: Pais[] = []
  private vinos: Vino[] = []

  constructor() {
    try {
      this.fetchBaseDeDatos()
    } catch (error) {
      if (error instanceof FetchDatabaseException) {
        throw new FetchDatabaseException(error.message)
      }
      throw new Error(error as string)
    }
  }

  private async fetchBaseDeDatos() {
    await VinoService.getAllVinos()
      .then(vinosDB => {
        vinosDB.forEach(vinoDB => {
          const pais = Entidades.getOrCreatePais(
            this.paises,
            vinoDB.bodega.regionVitivinicola.provincia.pais.nombre
          )
          const provincia = Entidades.getOrCreateProvincia(
            pais.getProvincias(),
            vinoDB.bodega.regionVitivinicola.provincia.nombre
          )
          const region = Entidades.getOrCreateRegion(
            provincia.getRegionesVitivinicolas(),
            vinoDB.bodega.regionVitivinicola.nombre
          )
          pais.agregarProvincia(provincia)
          provincia.agregarRegionVitivinicola(region)
          const vino = new Mapper().mapVino(vinoDB)
          this.addPais(pais)
          this.addProvincia(provincia)
          this.addVino(vino)
        })
      })
      .catch(err => {
        // pantalla.mostrarError(err)
        throw new Error(err)
      })
  }

  public async generarRankingVinos(): Promise<{
    success: boolean
    message: string
  }> {
    // Validar que haya vinos
    if (this.vinos.length === 0) {
      return { success: false, message: 'No hay vinos' }
    }

    // Dependiendo del tipo de reseña, creamos la estrategia correspondiente
    // PATRON STRATEGY
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
    this.vinos.forEach(vino => {
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
      const promedioReseniasValidadas =
        vino.calcularPromedioReseniasValidadas(reseniasEnPeriodo)

      // Creamos un nuevo map para el vino con el puntaje promedio
      const map = new Map<Vino, number>()
      map.set(vino, promedioReseniasValidadas)
      this.vinosConPuntaje.push(map)
    })

    // Ordenamos los vinos y tomamos los primeros 10
    this.ordenarVinosSegunCalificacion()
    const { success, message } = await this.obtenerTopTenVinosConInformacion()

    // Limpiamos la lista de vinos con puntaje para que no se acumulen
    this.vinosConPuntaje = []
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

    // ESTA VARIABLE CONTIENE SOLO VALORES PRIMITIVOS
    // Para que pueda ser exportable a Excel o PDF
    const datosVinoConPuntaje = top10VinosConPuntaje.map(vinoConPuntaje => {
      const vino = vinoConPuntaje.keys().next().value
      if (!vino) {
        throw new Error('Vino no encontrado')
      }

      const puntaje = vinoConPuntaje.values().next().value

      // Obtenemos la información del vino y le agregamos el puntaje promedio
      const datosVino = vino.obtenerInformacionVinoBodegaRegionYVarietal()
      const [regionNombre, region] = datosVino.region as [
        string,
        RegionVitivinicola
      ]

      const datosVinoConPuntaje: VinosConDatosYPromedio = {
        ...datosVino,
        // Seteamos solo el nombre de la región
        // El puntero solo lo necesitaba para buscar la provincia
        region: regionNombre,
        puntaje: puntaje || 0,
      }

      const provinciaEncontrada = this.provincias.find(provincia => {
        if (provincia.esTuRegion(region)) {
          datosVinoConPuntaje.provincia = provincia.getNombre()
          return true
        }
        return false
      })

      if (!provinciaEncontrada) {
        throw new Error('Provincia no encontrada')
      }

      const paisEncontrado = this.paises.find(pais => {
        if (pais.esTuProvincia(provinciaEncontrada)) {
          datosVinoConPuntaje.pais = pais.getNombre()
          return true
        }
        return false
      })
      if (!paisEncontrado) {
        throw new Error('País no encontrado')
      }

      return datosVinoConPuntaje
    })

    // Validamos si hay vinos con reseñas validas
    if (!this.validarSiHayReseniasValidas(datosVinoConPuntaje)) {
      return { success: false, message: 'No hay vinos con reseñas validas' }
    }

    // Creamos el PDF o el Excel dependiendo del pedido del usuario
    // A ESTE PUNTO YA TENEMOS LOS DATOS DE LOS VINOS CON SU PUNTAJE
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
    await new ExcelExporter().exportVinosToExcel(datosVinoConPuntaje)
  }

  public async generarPDF(datosVinoConPuntaje: VinosConDatosYPromedio[]) {
    await new PDFExporter().exportVinosToPDF(datosVinoConPuntaje)
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

  private addProvincia(provincia: Provincia): void {
    this.provincias.push(provincia)
  }
  private addPais(pais: Pais): void {
    this.paises.push(pais)
  }
  private addVino(vino: Vino): void {
    this.vinos.push(vino)
  }
}
