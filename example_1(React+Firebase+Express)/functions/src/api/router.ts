import * as express from 'express';
import Subject from './subject';

const router = express.Router();

router.post('/', Subject.create);
router.put('/:id', Subject.update);
router.delete('/:id', Subject.delete);

export default router;
