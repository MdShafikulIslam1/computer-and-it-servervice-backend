import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import pick from '../../../shared/pick';
import { paginationOptionFields } from '../../../common/paginationOptions';
import { BookingService } from './booking.service';
import { bookingFilterableFields } from './booking.constant';

const create = catchAsync(async (req, res) => {
  const result = await BookingService.create(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully create Booking',
    data: result,
  });
});

const getAll = catchAsync(async (req, res) => {
  const filters = pick(req.query, bookingFilterableFields);
  const paginationOptions = pick(req.query, paginationOptionFields);
  const result = await BookingService.getAll(filters, paginationOptions);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Get all booking data',
    data: result.data,
    meta: result.meta,
  });
});
const getSingle = catchAsync(async (req, res) => {
  const result = await BookingService.getSingle(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Get single booking info',
    data: result,
  });
});
const deleteOne = catchAsync(async (req, res) => {
  const result = await BookingService.deleteOne(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully DeleteCart',
    data: result,
  });
});
const updateOne = catchAsync(async (req, res) => {
  const result = await BookingService.updateOne(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Update Booking update',
    data: result,
  });
});

export const BookingController = {
  create,
  getAll,
  getSingle,
  deleteOne,
  updateOne,
};
