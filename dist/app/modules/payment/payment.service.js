"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const client_1 = require("@prisma/client");
const config_1 = __importDefault(require("../../../config"));
const sslcommerz_lts_1 = __importDefault(require("sslcommerz-lts"));
const ApiError_1 = __importDefault(require("../../../error/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const crypto_1 = __importDefault(require("crypto"));
const initPayment = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const transactionId = crypto_1.default.randomBytes(5).toString('hex').toUpperCase();
    const data = {
        total_amount: payload.amount,
        currency: 'BDT',
        tran_id: transactionId, // use unique tran_id for each api call
        // success_url: `http://localhost:5000/api/v1/payments/success/${transactionId}/${payload.bookingId}`,
        // fail_url: 'http://localhost:5000/api/v1/payments/fail',
        // cancel_url: 'http://localhost:5000/api/v1/payments/fail',
        success_url: `https://computer-and-it-servervice-backend.vercel.app/api/v1/payments/success/${transactionId}/${payload.bookingId}`,
        fail_url: 'https://computer-and-it-servervice-backend.vercel.app/api/v1/payments/fail',
        cancel_url: 'https://computer-and-it-servervice-backend.vercel.app/api/v1/payments/fail',
        ipn_url: 'http://localhost:3030/ipn',
        shipping_method: 'Courier',
        product_name: 'Computer.',
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name: 'Customer Name',
        cus_email: 'customer@example.com',
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: '01711111111',
        cus_fax: '01711111111',
        ship_name: 'Customer Name',
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
    };
    const sslcz = new sslcommerz_lts_1.default(config_1.default.store_id, config_1.default.store_password, false);
    const apiResponse = yield sslcz.init(data);
    const gatewayPageURL = apiResponse.GatewayPageURL;
    if (!gatewayPageURL) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Invalid gateway page');
    }
    yield prisma_1.default.payment.create({
        data: {
            transactionId: transactionId,
            amount: payload.amount,
            status: client_1.Payment_Status.PENDING,
            bookingId: payload.bookingId,
        },
    });
    return gatewayPageURL;
});
const successPayment = (tran_id, bookingId) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistPayment = yield prisma_1.default.payment.findFirst({
        where: {
            transactionId: tran_id,
        },
    });
    if (!isExistPayment) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Payment not found');
    }
    yield prisma_1.default.payment.updateMany({
        where: {
            transactionId: tran_id,
        },
        data: {
            status: client_1.Payment_Status.PAID,
        },
    });
    yield prisma_1.default.booking.updateMany({
        where: {
            id: bookingId,
        },
        data: {
            status: client_1.Booking_status.PAID,
        },
    });
    const redirectLink = `http://localhost:3000/payment/success?transactionId=${isExistPayment.transactionId}`;
    return { url: redirectLink };
});
const failPayment = () => __awaiter(void 0, void 0, void 0, function* () {
    const redirectLink = `http://localhost:3000/payment/fail`;
    return { url: redirectLink };
});
exports.PaymentService = {
    initPayment,
    successPayment,
    failPayment,
};
