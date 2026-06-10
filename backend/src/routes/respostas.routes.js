import { Router } from 'express'
import {
  criarResposta,
  listarRespostas,
  buscarResposta,
  deletarResposta,
} from '../controllers/respostas.controller.js'

const router = Router()

router.post('/',       criarResposta)
router.get('/',        listarRespostas)
router.get('/:id',     buscarResposta)
router.delete('/:id',  deletarResposta)

export default router
