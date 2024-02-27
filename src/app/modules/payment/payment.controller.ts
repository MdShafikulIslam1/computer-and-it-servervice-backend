import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { PaymentService } from './payment.service';

const initPayment = catchAsync(async (req, res) => {
  const result = await PaymentService.initPayment(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment Initiated',
    data: result,
  });
});

const successPayment = catchAsync(async (req, res) => {
  const result = await PaymentService.successPayment(req.params.tranId);
  res.redirect(result.url);
});

const failPayment = catchAsync(async (req, res) => {
  const result = await PaymentService.failPayment();
  res.redirect(result.url);
});

export const PaymentController = {
  initPayment,
  successPayment,
  failPayment,
};
