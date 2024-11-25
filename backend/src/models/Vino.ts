import Bodega from './Bodega'
import RegionVitivinicola from './RegionVitivinicola'
import Resenia from './Resenia'
import { TipoReseniaStrategy } from './strategy/TipoReseniaStrategy'
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

  filtrarResenias(
    strategy: TipoReseniaStrategy,
    fechaDesde: Date,
    fechaHasta: Date
  ): Resenia[] {
    // METODO POLIMÓRFICO QUE DELEGARÁ LA LÓGICA DE FILTRADO DE RESEÑAS A LA ESTRATEGIA
    return strategy.filtrarResenias(this.resenias, fechaDesde, fechaHasta)
  }

  calcularPromedioReseniasValidadas(resenias: Resenia[]): number {
    return parseFloat(
      (
        resenias.reduce(
          (acumulador, resenia) => acumulador + resenia.obtenerPuntaje(),
          0
        ) / resenias.length
      ).toFixed(2)
    )
  }

  obtenerInformacionVinoBodegaRegionYVarietal() {
    const [bodega, [nombreRegion, region]] =
      this.bodega.obtenerNombreYRegion() as [
        string,
        [string, RegionVitivinicola]
      ]

    return {
      vino: this.getNombre(),
      bodega,
      region: [nombreRegion, region],
      varietales: this.varietales.map(varietal =>
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
