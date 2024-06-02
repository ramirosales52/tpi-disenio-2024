import Vino from '../models/Vino'
import Resenia from '../models/Resenia'
import Bodega from '../models/Bodega'
import RegionVitivinicola from '../models/RegionVitivinicola'
import Provincia from '../models/Provincia'
import Pais from '../models/Pais'
import Varietal from '../models/Varietal'
import TipoUva from '../models/TipoUva'

const pais1 = new Pais('Argentina')
const provincia1 = new Provincia('Mendoza', pais1)
const region1 = new RegionVitivinicola('Valle de Uco', provincia1)
const bodega1 = new Bodega('Bodega Norton', region1)

const tipoUva1 = new TipoUva('Malbec')
const tipoUva2 = new TipoUva('Merlot')
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

const resenia1 = new Resenia(true, new Date('2022-01-01'), 95)
const resenia2 = new Resenia(true, new Date('2021-06-15'), 30)
const resenia3 = new Resenia(true, new Date('2022-01-01'), 45)
const resenia4 = new Resenia(true, new Date('2021-06-15'), 52)
const resenia5 = new Resenia(true, new Date('2022-01-01'), 100)
const resenia6 = new Resenia(true, new Date('2021-06-15'), 49)
const resenia7 = new Resenia(true, new Date('2022-01-01'), 91)
const resenia8 = new Resenia(true, new Date('2021-06-15'), 85)
const resenia9 = new Resenia(true, new Date('2021-06-15'), 67)
const resenia10 = new Resenia(true, new Date('2021-06-15'), 20)
const resenia11 = new Resenia(true, new Date('2021-06-15'), 59)

// export const vinosSinResenias: Vino[] = [
//   new Vino(
//     'Vino 1',
//     20,
//     [varietal1],
//     bodega1
//     // [resenia1, resenia2]
//   ), // 95 30
//   new Vino(
//     'Vino 2',
//     25,
//     [varietal1],
//     bodega1
//     // [resenia2, resenia3]
//   ), // 45 45
//   new Vino(
//     'Vino 3',
//     30,
//     [varietal1],
//     bodega1
//     // [resenia3, resenia4]
//   ), // 45 52
//   new Vino(
//     'Vino 4',
//     35,
//     [varietal1],
//     bodega1
//     // [resenia4, resenia5]
//   ), // 52 100
//   new Vino(
//     'Vino 5',
//     40,
//     [varietal1],
//     bodega1
//     // [resenia5, resenia6]
//   ), // 100 49
//   new Vino(
//     'Vino 6',
//     45,
//     [varietal1, varietal2],
//     bodega1
//     // [resenia6, resenia7]
//   ), // 49 91
//   new Vino(
//     'Vino 7',
//     50,
//     [varietal1],
//     bodega1
//     // [resenia7, resenia8]
//   ), // 91 85
//   new Vino(
//     'Vino 8',
//     55,
//     [varietal1],
//     bodega1
//     // [resenia8, resenia9]
//   ), // 85 67
//   new Vino(
//     'Vino 9',
//     60,
//     [varietal1],
//     bodega1
//     // [resenia9, resenia10]
//   ), // 67 20
//   new Vino(
//     'Vino 10',
//     65,
//     [varietal1],
//     bodega1
//     // [resenia10, resenia11]
//   ), // 20 59
// ]

export const vinos: Vino[] = [
  new Vino('Vino 1', 20, [varietal1], bodega1, [resenia1, resenia2]), // 95 30
  new Vino('Vino 2', 25, [varietal1], bodega1, [resenia2, resenia3]), // 45 45
  new Vino('Vino 3', 30, [varietal1], bodega1, [resenia3, resenia4]), // 45 52
  new Vino('Vino 4', 35, [varietal1], bodega1, [resenia4, resenia5]), // 52 100
  new Vino('Vino 5', 40, [varietal1], bodega1, [resenia5, resenia6]), // 100 49
  new Vino('Vino 6', 45, [varietal1, varietal2], bodega1, [resenia6, resenia7]), // 49 91
  new Vino('Vino 7', 50, [varietal1], bodega1, [resenia7, resenia8]), // 91 85
  new Vino('Vino 8', 55, [varietal1], bodega1, [resenia8, resenia9]), // 85 67
  new Vino('Vino 9', 60, [varietal1], bodega1, [resenia9, resenia10]), // 67 20
  new Vino('Vino 10', 65, [varietal1], bodega1, [resenia10, resenia11]), // 20 59
]
