import express from 'express';
import { CategoryController } from './category.controller';
const router = express.Router();
router.post('/create-category', CategoryController.create);
router.get('/', CategoryController.getAll);
router.get('/:id', CategoryController.getSingle);
router.delete('/:id', CategoryController.deleteOne);
router.patch('/:id', CategoryController.updateOne);
export const CategoryRoutes = router;
