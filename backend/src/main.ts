import express, { Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'node:path'

import GestorRankingVinos from './controllers/GestorRankingVinos'

dotenv.config()
const PORT = process.env.PORT || 4000
const app = express()
app.use(cors())
app.use(express.json())

app.use('/static', express.static(path.join(__dirname, './output')))

const gestor = new GestorRankingVinos()
app.post('/generar-ranking', async (req: Request, res: Response) => {
  const { body } = req
  const {
    fechaDesde,
    fechaHasta,
    tipoVisualizacion,
    tipoResenia = 'sommelier',
  } = body

  const { error } = gestor.tomarFechasIngresadas(
    new Date(fechaDesde),
    new Date(fechaHasta)
  )

  if (error) {
    return res.status(400).json({ success: false, message: 'Fechas inválidas' })
  }

  gestor.tomarTipoResenia(tipoResenia)
  gestor.tomarTipoVisualizacion(tipoVisualizacion)

  const { success, message } = await gestor.tomarConfirmacion()

  if (success) {
    return res.status(201).json({ success, message })
  } else {
    return res.status(400).json({ success, message })
  }
})

// Iniciamos el servidor
app.listen(PORT, () => {
  console.log(`Service running on port: ${PORT}`)
})
