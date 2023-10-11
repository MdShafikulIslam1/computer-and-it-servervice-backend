import express from 'express';
import { UserController } from './user.controller';
const router = express.Router();
router.post('/create-user', UserController.create);
router.get('/', UserController.getAll);
router.get('/:id', UserController.getSingle);
router.delete('/:id', UserController.deleteOne);
router.patch('/:id', UserController.updateOne);
export const UserRoutes = router;
