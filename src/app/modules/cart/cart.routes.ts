import express from 'express';
import { CartController } from './cart.controller';
const router = express.Router();
router.post('/create-cart', CartController.create);
router.get('/', CartController.getAll);
router.get('/:id', CartController.getSingle);
router.delete('/:id', CartController.deleteOne);
router.patch('/:id', CartController.updateOne);
export const CartRoutes = router;
