import express from 'express';
import { BookingController } from './booking.controller';
const router = express.Router();
router.post('/create-booking', BookingController.create);
router.get('/', BookingController.getAll);
router.get('/:id', BookingController.getSingle);
router.delete('/:id', BookingController.deleteOne);
router.patch('/:id', BookingController.updateOne);
export const BookingRoutes = router;
