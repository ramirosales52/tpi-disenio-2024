import database from '../../database'

const main = async () => {
  try {
    // Paso 1: Crear el pais y las provincias
    const pais1 = await database.pais.create({
      data: {
        nombre: 'Argentina',
        provincias: {
          create: [
            { nombre: 'Mendoza' },
            { nombre: 'San Juan' },
            { nombre: 'La Rioja' },
          ],
        },
      },
    })

    // Paso 2: Crear las regiones vitivinícolas
    const provincia1 = await database.provincia.findFirst({
      where: {
        nombre: 'Mendoza',
      },
    })
    const provincia2 = await database.provincia.findFirst({
      where: {
        nombre: 'San Juan',
      },
    })
    const provincia3 = await database.provincia.findFirst({
      where: {
        nombre: 'La Rioja',
      },
    })

    if (!provincia1 || !provincia2 || !provincia3) {
      throw new Error()
    }

    const region1 = await database.regionVitivinicola.create({
      data: { nombre: 'Valle de Uco', provinciaId: provincia1.id },
    })
    const region2 = await database.regionVitivinicola.create({
      data: { nombre: 'Maipú', provinciaId: provincia1.id },
    })
    const region3 = await database.regionVitivinicola.create({
      data: { nombre: 'Tulum', provinciaId: provincia2.id },
    })
    const region4 = await database.regionVitivinicola.create({
      data: { nombre: 'Famatina', provinciaId: provincia3.id },
    })

    // Paso 3: Crear las bodegas
    const bodega1 = await database.bodega.create({
      data: {
        nombre: 'Bodega Norton',
        regionVitivinicolaId: region1.id,
      },
    })
    const bodega2 = await database.bodega.create({
      data: {
        nombre: 'Bodega Trapiche',
        regionVitivinicolaId: region2.id,
      },
    })
    const bodega3 = await database.bodega.create({
      data: {
        nombre: 'Bodega El Esteco',
        regionVitivinicolaId: region3.id,
      },
    })
    const bodega4 = await database.bodega.create({
      data: {
        nombre: 'Bodega La Riojana',
        regionVitivinicolaId: region4.id,
      },
    })

    // Paso 4: Crear tipos de uva
    const tipoUva1 = await database.tipoUva.create({
      data: { nombre: 'Malbec' },
    })
    const tipoUva2 = await database.tipoUva.create({
      data: { nombre: 'Merlot' },
    })
    const tipoUva3 = await database.tipoUva.create({
      data: { nombre: 'Cabernet Sauvignon' },
    })
    const tipoUva4 = await database.tipoUva.create({
      data: { nombre: 'Syrah' },
    })
    const tipoUva5 = await database.tipoUva.create({
      data: { nombre: 'Chardonnay' },
    })
    const tipoUva6 = await database.tipoUva.create({
      data: { nombre: 'Torrontés' },
    })

    // Paso 5: Crear varietales
    const varietal1 = await database.varietal.create({
      data: {
        nombre: 'Malbec Reserva',
        tipoUvaId: tipoUva1.id,
      },
    })
    const varietal2 = await database.varietal.create({
      data: {
        nombre: 'Merlot Reserva Especial',
        tipoUvaId: tipoUva2.id,
      },
    })

    // Paso 7: Crear vinos con las relaciones a bodegas, varietales y resenias
    const vino1 = await database.vino.create({
      data: {
        nombre: 'Malbec Gran Reserva',
        precio: 3500,
        bodegaId: 1,
      },
    })
    // Paso 6: Crear resenias
    const resenia1 = await database.resenia.create({
      data: {
        esPremium: false,
        fechaResenia: new Date('2022-01-01'),
        puntaje: 95,
        vinoId: 1,
      },
    })

    console.log('Datos creados correctamente')
  } catch (error) {
    console.error('Error creando los datos:', error)
  } finally {
    await database.$disconnect()
  }
}

main()
