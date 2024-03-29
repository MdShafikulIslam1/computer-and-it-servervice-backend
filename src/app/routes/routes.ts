import express from 'express';
import { UserRoutes } from '../modules/user/user.routes';
import { AuthRoutes } from '../modules/auth/auth.route';
import { CategoryRoutes } from '../modules/category/category.routes';
import { ServiceRoutes } from '../modules/service/category.routes';
import { ReviewRoutes } from '../modules/review/review.routes';
import { CartRoutes } from '../modules/cart/cart.routes';
import { BookingRoutes } from '../modules/booking/booking.routes';
import { FeedbackRoutes } from '../modules/feedback/feedback.routes';
import { PaymentRouter } from '../modules/payment/payment.routes';
const router = express.Router();
const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/categories',
    route: CategoryRoutes,
  },
  {
    path: '/services',
    route: ServiceRoutes,
  },
  {
    path: '/reviews',
    route: ReviewRoutes,
  },
  {
    path: '/carts',
    route: CartRoutes,
  },
  {
    path: '/bookings',
    route: BookingRoutes,
  },
  {
    path: '/feedbacks',
    route: FeedbackRoutes,
  },
  {
    path: '/payments',
    route: PaymentRouter,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
