import { Router } from 'express';
import { validateParticipant, validateParticipantUpdate } from '../middleware/validate.js';
import * as controller from '../controllers/participantController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', controller.getAll);
router.get('/:id', requireAuth, controller.getById)
router.put('/:id', requireAuth, validateParticipantUpdate, controller.update);
router.delete('/:id', requireAuth, controller.remove);
router.post('/', requireAuth, validateParticipant, controller.create);



export default router;