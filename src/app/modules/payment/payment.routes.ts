import { Router } from 'express';
import { PaymentController } from './payment.controller';

const router = Router();

router.post('/init', PaymentController.initPayment);

router.post('/success/:tranId/:bookingId', PaymentController.successPayment);

router.post('/fail', PaymentController.failPayment);

export const PaymentRouter = router;
