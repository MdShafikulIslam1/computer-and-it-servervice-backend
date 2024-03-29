/* eslint-disable @typescript-eslint/no-explicit-any */
import { Booking_status, Payment, Payment_Status } from '@prisma/client';
import config from '../../../config';
import SSLCommerzPayment from 'sslcommerz-lts';
import ApiError from '../../../error/ApiError';
import httpStatus from 'http-status';
import prisma from '../../../shared/prisma';
import crypto from 'crypto';

const initPayment = async (payload: Payment) => {
  const transactionId = crypto.randomBytes(5).toString('hex').toUpperCase();

  const data = {
    total_amount: payload.amount,
    currency: 'BDT',
    tran_id: transactionId, // use unique tran_id for each api call
    // success_url: `http://localhost:5000/api/v1/payments/success/${transactionId}/${payload.bookingId}`,
    // fail_url: 'http://localhost:5000/api/v1/payments/fail',
    // cancel_url: 'http://localhost:5000/api/v1/payments/fail',
    success_url: `https://computer-and-it-servervice-backend.vercel.app/api/v1/payments/success/${transactionId}/${payload.bookingId}`,
    fail_url:
      'https://computer-and-it-servervice-backend.vercel.app/api/v1/payments/fail',
    cancel_url:
      'https://computer-and-it-servervice-backend.vercel.app/api/v1/payments/fail',
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
  const sslcz = new SSLCommerzPayment(
    config.store_id,
    config.store_password,
    false
  );
  const apiResponse = await sslcz.init(data);
  const gatewayPageURL = apiResponse.GatewayPageURL;
  if (!gatewayPageURL) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid gateway page');
  }
  await prisma.payment.create({
    data: {
      transactionId: transactionId,
      amount: payload.amount,
      status: Payment_Status.PENDING,
      bookingId: payload.bookingId,
    },
  });
  return gatewayPageURL;
};

const successPayment = async (
  tran_id: string,
  bookingId: string
): Promise<{ url: string }> => {
  const isExistPayment = await prisma.payment.findFirst({
    where: {
      transactionId: tran_id,
    },
  });

  if (!isExistPayment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Payment not found');
  }

  await prisma.payment.updateMany({
    where: {
      transactionId: tran_id,
    },
    data: {
      status: Payment_Status.PAID,
    },
  });

  await prisma.booking.updateMany({
    where: {
      id: bookingId,
    },
    data: {
      status: Booking_status.PAID,
    },
  });

  const redirectLink = `${
    config.frontend_deploy_link || config.frontend_local_link
  }/payment/success?transactionId=${isExistPayment.transactionId}`;

  return { url: redirectLink };
};

const failPayment = async (): Promise<{ url: string }> => {
  const redirectLink = `${
    config.frontend_deploy_link || config.frontend_local_link
  }/payment/fail`;

  return { url: redirectLink };
};

export const PaymentService = {
  initPayment,
  successPayment,
  failPayment,
};
