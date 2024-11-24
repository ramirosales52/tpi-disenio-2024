import database from '../../database'

export default class VinoService {
  public static async getAllVinos() {
    return await database.vino.findMany({
      include: {
        bodega: {
          include: {
            regionVitivinicola: {
              include: {
                provincia: {
                  include: { pais: true },
                },
              },
            },
          },
        },
        varietales: {
          include: { tipoUva: true },
        },
        resenias: true,
      },
    })
  }
}
