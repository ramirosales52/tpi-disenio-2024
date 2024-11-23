import Resenia from '../Resenia'
import { TipoReseniaStrategy } from './TipoReseniaStrategy'

export class SommelierStrategy implements TipoReseniaStrategy {
  public filtrarResenias(
    resenias: Resenia[],
    fechaDesde: Date,
    fechaHasta: Date
  ): Resenia[] {
    return resenias.filter(
      resenia =>
        resenia.esDePeriodo(fechaDesde, fechaHasta) &&
        resenia.obtenerEsPremium()
    )
  }
}
