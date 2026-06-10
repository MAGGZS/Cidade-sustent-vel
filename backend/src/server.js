import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import respostasRoutes from './routes/respostas.routes.js'
import statsRoutes    from './routes/stats.routes.js'

const app  = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

// Rotas
app.use('/respostas', respostasRoutes)
app.use('/stats',     statsRoutes)

// Health check
app.get('/health', (_, res) => res.json({ status: 'ok' }))

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})
