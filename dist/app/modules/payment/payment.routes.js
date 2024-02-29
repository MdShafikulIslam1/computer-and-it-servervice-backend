"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRouter = void 0;
const express_1 = require("express");
const payment_controller_1 = require("./payment.controller");
const router = (0, express_1.Router)();
router.post('/init', payment_controller_1.PaymentController.initPayment);
router.post('/success/:tranId/:bookingId', payment_controller_1.PaymentController.successPayment);
router.post('/fail', payment_controller_1.PaymentController.failPayment);
exports.PaymentRouter = router;
