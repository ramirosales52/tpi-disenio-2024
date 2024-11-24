import type {
  Vino,
  Bodega,
  RegionVitivinicola,
  Varietal,
  TipoUva,
  Pais,
  Resenia,
  Provincia,
} from '@prisma/client'
import BodegaModel from '../models/Bodega'
import ReseniaModel from '../models/Resenia'
import TipoUvaModel from '../models/TipoUva'
import RegionVitivinicolaModel from '../models/RegionVitivinicola'
import VarietalModel from '../models/Varietal'
// import ProvinciaModel from '../models/Provincia'
// import PaisModel from '../models/Pais'
import VinoModel from '../models/Vino'

export default class Mapper {
  public mapVino(
    vinoDB: Vino & {
      bodega: Bodega & {
        regionVitivinicola: RegionVitivinicola
      }
      varietales: (Varietal & { tipoUva: TipoUva })[]
      resenias: Resenia[]
    }
  ) {
    return new VinoModel(
      vinoDB.nombre,
      Number(vinoDB.precio),
      vinoDB.varietales.map(varietal => this.mapVarietal(varietal)),
      this.mapBodega(vinoDB.bodega),
      vinoDB.resenias.map(resenia => this.mapResenia(resenia))
    )
  }

  // Mapper para la bodega
  private mapBodega(
    bodegaDB: Bodega & { regionVitivinicola: RegionVitivinicola }
  ) {
    return new BodegaModel(
      bodegaDB.nombre,
      this.mapRegionVitivinicola(bodegaDB.regionVitivinicola)
    )
  }

  // Mapper para la región vitivinícola
  private mapRegionVitivinicola(regionDB: RegionVitivinicola) {
    return new RegionVitivinicolaModel(regionDB.nombre)
  }

  // Mapper para el tipo de uva
  public mapTipoUva(tipoUvaDB: TipoUva) {
    return new TipoUvaModel(tipoUvaDB.nombre)
  }

  // Mapper para los varietales
  private mapVarietal(varietalDB: Varietal & { tipoUva: TipoUva }) {
    return new VarietalModel(
      varietalDB.nombre,
      this.mapTipoUva(varietalDB.tipoUva)
    )
  }

  // Mapper para las reseñas
  private mapResenia(reseniaDB: Resenia) {
    return new ReseniaModel(
      reseniaDB.esPremium,
      reseniaDB.fechaResenia,
      reseniaDB.puntaje
    )
  }
}
