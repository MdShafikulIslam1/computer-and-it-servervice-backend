import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import pick from '../../../shared/pick';
import { paginationOptionFields } from '../../../common/paginationOptions';
import { CartService } from './cart.service';
import { cartFilterableFields } from './cart.constant';

const create = catchAsync(async (req, res) => {
  const result = await CartService.create(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully create anCart',
    data: result,
  });
});

const getAll = catchAsync(async (req, res) => {
  const filters = pick(req.query, cartFilterableFields);
  const paginationOptions = pick(req.query, paginationOptionFields);
  const result = await CartService.getAll(filters, paginationOptions);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Get allCart',
    data: result.data,
    meta: result.meta,
  });
});
const getSingle = catchAsync(async (req, res) => {
  const result = await CartService.getSingle(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Get singleCart',
    data: result,
  });
});
const deleteOne = catchAsync(async (req, res) => {
  const result = await CartService.deleteOne(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully DeleteCart',
    data: result,
  });
});
const updateOne = catchAsync(async (req, res) => {
  const result = await CartService.updateOne(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully UpdateCart',
    data: result,
  });
});

export const CartController = {
  create,
  getAll,
  getSingle,
  deleteOne,
  updateOne,
};
