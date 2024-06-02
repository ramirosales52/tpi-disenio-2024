import path from 'node:path'
// paquete para crear el servidor
import express, { Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import GestorRankingVinos from './controllers/GestorRankingVinos'

dotenv.config()
const PORT = process.env.PORT || 4000
const app = express()
app.use(cors())
app.use(express.json())

// Render ante un GET en la ruta /
// app.use(express.static(path.join(__dirname, '../../frontend/dist')))

// app.post('/confirmar', (req: Request, res: Response) => {
//   const { body } = req

//   gestor.generarRankingVinos()
// })

app.post('/generar-ranking', (req: Request, res: Response) => {
  const gestor = new GestorRankingVinos()
  const { body } = req
  const { fechaDesde, fechaHasta, tipoVisualizacion } = body
  gestor.tomarFechasIngresadas(new Date(fechaDesde), new Date(fechaHasta))
  gestor.tomarTipoVisualizacion(tipoVisualizacion)
  gestor.generarRankingVinos()

  res.status(200).json({ success: true })
})

// Iniciamos el servidor
app.listen(PORT, () => {
  console.log(`Service running on port: ${PORT}`)
})
