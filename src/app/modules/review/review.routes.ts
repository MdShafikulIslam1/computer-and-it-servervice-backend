import express from 'express';
import { ReviewController } from './review.controller';
const router = express.Router();
router.post('/create-review', ReviewController.create);
router.get('/', ReviewController.getAll);
router.get('/:id', ReviewController.getSingle);
router.delete('/:id', ReviewController.deleteOne);
router.patch('/:id', ReviewController.updateOne);
export const ReviewRoutes = router;
