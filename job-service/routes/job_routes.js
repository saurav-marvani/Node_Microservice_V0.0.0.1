import express from 'express'
import { PostJob, GetAllJob, GetJob, UpdateJob, DeleteJob } from '../controller/job/job_controller.js'
const router = express.Router()

router.post('/', PostJob)
router.get('/', GetAllJob)
router.get('/:job_id', GetJob)
router.patch('/:job_id', UpdateJob)
router.delete('/:job_id', DeleteJob)


export default router
