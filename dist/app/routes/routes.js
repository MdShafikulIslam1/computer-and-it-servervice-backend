"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = require("../modules/user/user.routes");
const auth_route_1 = require("../modules/auth/auth.route");
const category_routes_1 = require("../modules/category/category.routes");
const category_routes_2 = require("../modules/service/category.routes");
const review_routes_1 = require("../modules/review/review.routes");
const cart_routes_1 = require("../modules/cart/cart.routes");
const booking_routes_1 = require("../modules/booking/booking.routes");
const feedback_routes_1 = require("../modules/feedback/feedback.routes");
const payment_routes_1 = require("../modules/payment/payment.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/users',
        route: user_routes_1.UserRoutes,
    },
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/categories',
        route: category_routes_1.CategoryRoutes,
    },
    {
        path: '/services',
        route: category_routes_2.ServiceRoutes,
    },
    {
        path: '/reviews',
        route: review_routes_1.ReviewRoutes,
    },
    {
        path: '/carts',
        route: cart_routes_1.CartRoutes,
    },
    {
        path: '/bookings',
        route: booking_routes_1.BookingRoutes,
    },
    {
        path: '/feedbacks',
        route: feedback_routes_1.FeedbackRoutes,
    },
    {
        path: '/payments',
        route: payment_routes_1.PaymentRouter,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
