import express from 'express';
import { UserRoutes } from '../modules/user/user.routes';
import { AuthRoutes } from '../modules/auth/auth.route';
import { CategoryRoutes } from '../modules/category/category.routes';
import { ServiceRoutes } from '../modules/service/category.routes';
import { ReviewRoutes } from '../modules/review/review.routes';
import { CartRoutes } from '../modules/cart/cart.routes';
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
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
