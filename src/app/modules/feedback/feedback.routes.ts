import express from 'express';
import { FeedbackController } from './feedback.controller';
const router = express.Router();
router.post('/create-feedback', FeedbackController.create);
router.get('/', FeedbackController.getAll);
// router.get('/:id', FeedbackController.getSingle);
// router.delete('/:id', FeedbackController.deleteOne);
// router.patch('/:id', FeedbackController.updateOne);
export const FeedbackRoutes = router;
