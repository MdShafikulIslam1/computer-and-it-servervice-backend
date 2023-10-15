import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import pick from '../../../shared/pick';
import { paginationOptionFields } from '../../../common/paginationOptions';
import { reviewFilterableFields } from './review.constant';
import { ReviewService } from './review.service';

const create = catchAsync(async (req, res) => {
  const result = await ReviewService.create(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully create Review',
    data: result,
  });
});

const getAll = catchAsync(async (req, res) => {
  const filters = pick(req.query, reviewFilterableFields);
  const paginationOptions = pick(req.query, paginationOptionFields);
  const result = await ReviewService.getAll(filters, paginationOptions);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Get all Review Data',
    data: result.data,
    meta: result.meta,
  });
});
const getSingle = catchAsync(async (req, res) => {
  const result = await ReviewService.getSingle(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Get single Service',
    data: result,
  });
});
const deleteOne = catchAsync(async (req, res) => {
  const result = await ReviewService.deleteOne(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Delete Service',
    data: result,
  });
});
const updateOne = catchAsync(async (req, res) => {
  const result = await ReviewService.updateOne(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Update Service',
    data: result,
  });
});

export const ReviewController = {
  create,
  getAll,
  getSingle,
  deleteOne,
  updateOne,
};
