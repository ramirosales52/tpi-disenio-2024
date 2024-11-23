import Vino from '../models/Vino'
import Resenia from '../models/Resenia'
import Bodega from '../models/Bodega'
import RegionVitivinicola from '../models/RegionVitivinicola'
import Provincia from '../models/Provincia'
import Pais from '../models/Pais'
import Varietal from '../models/Varietal'
import TipoUva from '../models/TipoUva'

const pais1 = new Pais('Argentina')
const provincia1 = new Provincia('Mendoza')
const provincia2 = new Provincia('San Juan')
const provincia3 = new Provincia('La Rioja')

pais1.agregarProvincia(provincia1)
pais1.agregarProvincia(provincia2)
pais1.agregarProvincia(provincia3)

const region1 = new RegionVitivinicola('Valle de Uco')
const region2 = new RegionVitivinicola('Maipú')
const region3 = new RegionVitivinicola('Tulum')
const region4 = new RegionVitivinicola('Famatina')

provincia1.agregarRegionVitivinicola(region1)
provincia1.agregarRegionVitivinicola(region2)
provincia2.agregarRegionVitivinicola(region3)
provincia3.agregarRegionVitivinicola(region4)

export const provinciasDB: Provincia[] = [provincia1, provincia2, provincia3]
export const paisesDB: Pais[] = [pais1]

const bodega1 = new Bodega('Bodega Norton', region1)
const bodega2 = new Bodega('Bodega Trapiche', region2)
const bodega3 = new Bodega('Bodega El Esteco', region3)
const bodega4 = new Bodega('Bodega La Riojana', region4)

const tipoUva1 = new TipoUva('Malbec')
const tipoUva2 = new TipoUva('Merlot')
const tipoUva3 = new TipoUva('Cabernet Sauvignon')
const tipoUva4 = new TipoUva('Syrah')
const tipoUva5 = new TipoUva('Chardonnay')
const tipoUva6 = new TipoUva('Torrontés')

const varietal1 = new Varietal(
  'Malbec Reserva',
  'Reserva de excelente calidad',
  tipoUva1
)
const varietal2 = new Varietal(
  'Merlot Reserva Especial',
  'Reserva especial de Merlot',
  tipoUva2
)
const varietal3 = new Varietal(
  'Cabernet Sauvignon Gran Reserva',
  'Gran Reserva de Cabernet Sauvignon',
  tipoUva3
)
const varietal4 = new Varietal(
  'Syrah Premium',
  'Vino Premium de Syrah',
  tipoUva4
)
const varietal5 = new Varietal(
  'Chardonnay Select',
  'Selección especial de Chardonnay',
  tipoUva5
)
const varietal6 = new Varietal(
  'Torrontés Clásico',
  'Clásico Torrontés',
  tipoUva6
)

const resenia1 = new Resenia(false, new Date('2022-01-01'), 95)
const resenia2 = new Resenia(true, new Date('2021-06-15'), 30)
const resenia3 = new Resenia(true, new Date('2022-01-01'), 45)
const resenia4 = new Resenia(true, new Date('2021-06-15'), 52)
const resenia5 = new Resenia(false, new Date('2022-01-01'), 100)
const resenia6 = new Resenia(true, new Date('2021-06-15'), 49)
const resenia7 = new Resenia(true, new Date('2022-01-01'), 91)
const resenia8 = new Resenia(true, new Date('2021-06-15'), 85)
const resenia9 = new Resenia(true, new Date('2021-06-15'), 67)
const resenia10 = new Resenia(true, new Date('2021-06-15'), 20)
const resenia11 = new Resenia(true, new Date('2021-06-15'), 59)
const resenia12 = new Resenia(true, new Date('2022-03-01'), 74)
const resenia13 = new Resenia(false, new Date('2021-12-20'), 88)
const resenia14 = new Resenia(true, new Date('2022-02-15'), 63)
const resenia15 = new Resenia(false, new Date('2021-11-11'), 91)
const resenia16 = new Resenia(true, new Date('2022-01-20'), 55)
const resenia17 = new Resenia(true, new Date('2021-07-05'), 78)
const resenia18 = new Resenia(false, new Date('2022-03-10'), 82)
const resenia19 = new Resenia(true, new Date('2021-08-18'), 46)
const resenia20 = new Resenia(true, new Date('2022-01-05'), 90)
const resenia21 = new Resenia(false, new Date('2021-09-09'), 69)
const resenia22 = new Resenia(true, new Date('2022-02-25'), 50)
const resenia23 = new Resenia(true, new Date('2021-10-16'), 81)
const resenia24 = new Resenia(false, new Date('2021-12-01'), 73)
const resenia25 = new Resenia(true, new Date('2022-03-20'), 60)
const resenia26 = new Resenia(true, new Date('2021-11-30'), 77)
const resenia27 = new Resenia(true, new Date('2022-04-10'), 66)
const resenia28 = new Resenia(false, new Date('2022-03-25'), 89)
const resenia29 = new Resenia(true, new Date('2022-05-05'), 53)
const resenia30 = new Resenia(true, new Date('2022-04-15'), 44)
const resenia31 = new Resenia(false, new Date('2022-05-20'), 97)
const resenia32 = new Resenia(true, new Date('2022-06-01'), 62)
const resenia33 = new Resenia(false, new Date('2022-06-10'), 84)
const resenia34 = new Resenia(true, new Date('2022-06-25'), 75)

export const vinos: Vino[] = [
  new Vino('Malbec Gran Reserva', 3500, [varietal1], bodega1, [
    resenia1,
    resenia2,
  ]), // 30
  new Vino('Altura Malbec', 4200, [varietal1], bodega1, [resenia3, resenia4]), // 45 52
  new Vino('Cumbres Malbec', 4800, [varietal1], bodega1, [resenia5, resenia6]), // 49
  new Vino('Norton Malbec Especial', 5500, [varietal1], bodega1, [
    resenia7,
    resenia8,
  ]), // 91 85 --> 88
  new Vino('Reserva de los Andes', 6000, [varietal1], bodega1, [
    resenia9,
    resenia10,
  ]), // 67 20 --> 43.5
  new Vino('Blend de Valle', 6500, [varietal1, varietal2], bodega1, [
    resenia11,
    resenia12,
  ]), // 59 74 --> 66.5
  new Vino('Gran Malbec de Norton', 7000, [varietal1], bodega1, [
    resenia13,
    resenia14,
  ]), // 63
  new Vino('Norton Reserva', 7500, [varietal1], bodega1, [
    resenia15,
    resenia16,
  ]), // 55
  new Vino('Viña de las Estrellas', 8000, [varietal1], bodega1, [
    resenia17,
    resenia18,
  ]), // 78
  new Vino('Colección Privada', 8500, [varietal1], bodega1, [
    resenia19,
    resenia20,
  ]), // 46 90 --> 68
  new Vino('Trapiche Merlot', 3200, [varietal2], bodega2, [
    resenia21,
    resenia22,
  ]), // 50
  new Vino('Cabernet de Trapiche', 4300, [varietal3], bodega2, [
    resenia23,
    resenia24,
  ]), // 81
  new Vino('Esteco Syrah', 5000, [varietal4], bodega3, [resenia25, resenia26]), // 60 77 --> 68.5
  new Vino('Famatina Chardonnay', 5400, [varietal5], bodega4, [
    resenia27,
    resenia28,
  ]), // 66
  new Vino('La Riojana Torrontés', 6000, [varietal6], bodega4, [
    resenia29,
    resenia30,
  ]), // 53 44 --> 48.5
  new Vino('Estrellas Blend', 6500, [varietal1, varietal4], bodega3, [
    resenia31,
    resenia32,
  ]), // 62
  new Vino('Finca Altamira', 7200, [varietal1, varietal3], bodega1, [
    resenia33,
    resenia34,
  ]), // 75
]
