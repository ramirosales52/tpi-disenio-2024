import Bodega from './Bodega'
import Resenia from './Resenia'
import Varietal from './Varietal'

export default class Vino {
  private nombre: string
  private precio: number
  private varietales: Varietal[]
  private bodega: Bodega
  private resenias: Resenia[] = []
  constructor(
    nombre: string,
    precio: number,
    varietales: Varietal[],
    bodega: Bodega,
    resenias?: Resenia[]
  ) {
    this.nombre = nombre
    this.precio = precio
    this.varietales = varietales
    this.bodega = bodega
    if (resenias) {
      this.resenias = resenias
    }
  }

  tieneResenias(): boolean {
    return this.resenias.length > 0
  }

  mostrarReseñasDeSommelierEnPeriodo(
    fechaDesde: Date,
    fechaHasta: Date
  ): Resenia[] {
    return this.resenias.filter(
      resenia =>
        resenia.esDePeriodo(fechaDesde, fechaHasta) &&
        resenia.obtenerEsPremium()
    )
  }

  calcularPromedioReseñasValidadas(resenias: Resenia[]): number {
    return (
      resenias.reduce(
        (acumulador, resenia) => acumulador + resenia.obtenerPuntaje(),
        0
      ) / resenias.length
    )
  }

  obtenerInformacionVinoBodegaVarietal() {
    return {
      vino: this.getNombre(),
      bodega: this.getBodega().obtenerNombreRegionProvinciaYPais(),
      varietales: this.getVarietales().map(varietal =>
        varietal.obtenerNombreYTipoUva()
      ),
      precio: this.getPrecio(),
    }
  }

  getNombre(): string {
    return this.nombre
  }

  getBodega(): Bodega {
    return this.bodega
  }

  getVarietales(): Varietal[] {
    return this.varietales
  }
  getPrecio(): number {
    return this.precio
  }
}
