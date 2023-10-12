import express from 'express';
import { ServiceController } from './category.controller';
const router = express.Router();
router.post('/create-service', ServiceController.create);
router.get('/', ServiceController.getAll);
router.get('/:id', ServiceController.getSingle);
router.delete('/:id', ServiceController.deleteOne);
router.patch('/:id', ServiceController.updateOne);
export const ServiceRoutes = router;
