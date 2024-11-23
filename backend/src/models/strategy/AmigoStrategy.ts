import Resenia from '../Resenia'
import { TipoReseniaStrategy } from './TipoReseniaStrategy'

// Devolvemos todas las reseñas porque esta estrategia está fuera del flujo del caso de uso
// y no se necesita filtrar las reseñas
export class AmigoStrategy implements TipoReseniaStrategy {
  public filtrarResenias(
    resenias: Resenia[],
    fechaDesde: Date,
    fechaHasta: Date
  ): Resenia[] {
    return resenias
  }
}
