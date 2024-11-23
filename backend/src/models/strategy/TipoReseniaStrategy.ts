import Resenia from '../Resenia'

export interface TipoReseniaStrategy {
  filtrarResenias(
    resenias: Resenia[],
    fechaDesde: Date,
    fechaHasta: Date
  ): Resenia[]
}
