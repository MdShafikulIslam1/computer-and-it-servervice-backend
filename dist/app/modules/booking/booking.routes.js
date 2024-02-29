"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const booking_controller_1 = require("./booking.controller");
const router = express_1.default.Router();
router.post('/create-booking', booking_controller_1.BookingController.create);
router.get('/', booking_controller_1.BookingController.getAll);
router.get('/:id', booking_controller_1.BookingController.getSingle);
router.delete('/:id', booking_controller_1.BookingController.deleteOne);
router.patch('/:id', booking_controller_1.BookingController.updateOne);
exports.BookingRoutes = router;
