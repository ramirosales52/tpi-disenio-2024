import database from '../../database'
import randomDate from '../utils/randomDate'

const main = async () => {
  try {
    // Paso 1: Crear el pais y las provincias
    await database.pais.create({
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
      throw new Error('Error al buscar las provincias')
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
    // Paso 5: Crear varietales
    const varietal3 = await database.varietal.create({
      data: {
        nombre: 'Cabernet Sauvignon Gran Reserva',
        tipoUvaId: tipoUva3.id,
      },
    })
    const varietal4 = await database.varietal.create({
      data: {
        nombre: 'Syrah Premium',
        tipoUvaId: tipoUva4.id,
      },
    })
    // Paso 5: Crear varietales
    const varietal5 = await database.varietal.create({
      data: {
        nombre: 'Chardonnay Select',
        tipoUvaId: tipoUva5.id,
      },
    })
    const varietal6 = await database.varietal.create({
      data: {
        nombre: 'Torrontés Clásico',
        tipoUvaId: tipoUva6.id,
      },
    })

    // Paso 7: Crear vinos con las relaciones a bodegas, varietales y resenias
    const vino1 = await database.vino.create({
      data: {
        nombre: 'Malbec Gran Reserva',
        precio: 3500,
        bodegaId: bodega1.id,
        varietales: {
          connect: [{ id: varietal1.id }],
        },
      },
    })

    const vino2 = await database.vino.create({
      data: {
        nombre: 'Altura Malbec',
        precio: 4200,
        bodegaId: bodega1.id,
        varietales: {
          connect: [{ id: varietal1.id }],
        },
      },
    })

    const vino3 = await database.vino.create({
      data: {
        nombre: 'Cumbres Malbec',
        precio: 4800,
        bodegaId: bodega1.id,
        varietales: {
          connect: [{ id: varietal1.id }],
        },
      },
    })

    const vino4 = await database.vino.create({
      data: {
        nombre: 'Norton Malbec Especial',
        precio: 5500,
        bodegaId: bodega1.id,
        varietales: {
          connect: [{ id: varietal1.id }],
        },
      },
    })

    const vino5 = await database.vino.create({
      data: {
        nombre: 'Reserva de los Andes',
        precio: 6000,
        bodegaId: bodega1.id,
        varietales: {
          connect: [{ id: varietal1.id }],
        },
      },
    })

    const vino6 = await database.vino.create({
      data: {
        nombre: 'Blend de Valle',
        precio: 6500,
        bodegaId: bodega1.id,
        varietales: {
          connect: [{ id: varietal1.id }, { id: varietal2.id }],
        },
      },
    })

    const vino7 = await database.vino.create({
      data: {
        nombre: 'Gran Malbec de Norton',
        precio: 7000,
        bodegaId: bodega1.id,
        varietales: {
          connect: [{ id: varietal1.id }],
        },
      },
    })

    const vino8 = await database.vino.create({
      data: {
        nombre: 'Norton Reserva',
        precio: 7500,
        bodegaId: bodega1.id,
        varietales: {
          connect: [{ id: varietal1.id }],
        },
      },
    })

    const vino9 = await database.vino.create({
      data: {
        nombre: 'Viña de las Estrellas',
        precio: 8000,
        bodegaId: bodega1.id,
        varietales: {
          connect: [{ id: varietal1.id }],
        },
      },
    })

    const vino10 = await database.vino.create({
      data: {
        nombre: 'Colección Privada',
        precio: 8500,
        bodegaId: bodega1.id,
        varietales: {
          connect: [{ id: varietal1.id }],
        },
      },
    })

    const vino11 = await database.vino.create({
      data: {
        nombre: 'Trapiche Merlot',
        precio: 3200,
        bodegaId: bodega2.id,
        varietales: {
          connect: [{ id: varietal2.id }],
        },
      },
    })

    const vino12 = await database.vino.create({
      data: {
        nombre: 'Cabernet de Trapiche',
        precio: 4300,
        bodegaId: bodega2.id,
        varietales: {
          connect: [{ id: varietal3.id }],
        },
      },
    })

    const vino13 = await database.vino.create({
      data: {
        nombre: 'Esteco Syrah',
        precio: 5000,
        bodegaId: bodega3.id,
        varietales: {
          connect: [{ id: varietal4.id }],
        },
      },
    })

    const vino14 = await database.vino.create({
      data: {
        nombre: 'Famatina Chardonnay',
        precio: 5400,
        bodegaId: bodega4.id,
        varietales: {
          connect: [{ id: varietal5.id }],
        },
      },
    })

    const vino15 = await database.vino.create({
      data: {
        nombre: 'La Riojana Torrontés',
        precio: 6000,
        bodegaId: bodega4.id,
        varietales: {
          connect: [{ id: varietal6.id }],
        },
      },
    })

    const vino16 = await database.vino.create({
      data: {
        nombre: 'Estrellas Blend',
        precio: 6500,
        bodegaId: bodega3.id,
        varietales: {
          connect: [{ id: varietal1.id }, { id: varietal4.id }],
        },
      },
    })

    const vino17 = await database.vino.create({
      data: {
        nombre: 'Finca Altamira',
        precio: 7200,
        bodegaId: bodega1.id,
        varietales: {
          connect: [{ id: varietal1.id }, { id: varietal3.id }],
        },
      },
    })

    // // Paso 6: Crear resenias
    // const resenia1 = await database.resenia.create({
    //   data: {
    //     esPremium: false,
    //     fechaResenia: randomDate('2018-01-01', new Date().toISOString()),
    //     puntaje: 95,
    //     vinoId: vino1.id,
    //   },
    // })
    // const resenia2 = await database.resenia.create({
    //   data: {
    //     esPremium: false,
    //     fechaResenia: randomDate('2018-01-01', new Date().toISOString()),
    //     puntaje: 30,
    //     vinoId: vino1.id,
    //   },
    // })

    const vinos = [
      vino1,
      vino2,
      vino3,
      vino4,
      vino5,
      vino6,
      vino7,
      vino8,
      vino9,
      vino10,
      vino11,
      vino12,
      vino13,
      vino14,
      vino15,
      vino16,
      vino17,
    ]
    // Agrega todos los vinos aquí

    for (const vino of vinos) {
      for (let i = 0; i < Math.floor(Math.random() * 10) + 5; i++) {
        await database.resenia.create({
          data: {
            esPremium: Math.random() < 0.5, // true o false al azar
            fechaResenia: randomDate('2018-01-01', new Date().toISOString()),
            puntaje: Math.floor(Math.random() * 101), // Puntaje entre 0 y 100
            vinoId: vino.id,
          },
        })
      }
    }

    console.log('Datos creados correctamente')
  } catch (error) {
    console.error('Error creando los datos:', error)
  } finally {
    await database.$disconnect()
  }
}

main()
