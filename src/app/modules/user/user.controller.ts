import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.service';
import pick from '../../../shared/pick';
import { userFilterableFields } from './user.constant';
import { paginationOptionFields } from '../../../common/paginationOptions';

const create = catchAsync(async (req, res) => {
  const result = await UserService.create(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully create an user',
    data: result,
  });
});

const getAll = catchAsync(async (req, res) => {
  const filters = pick(req.query, userFilterableFields);
  const paginationOptions = pick(req.query, paginationOptionFields);
  const result = await UserService.getAll(filters, paginationOptions);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Get all User',
    data: result.data,
    meta: result.meta,
  });
});
const getSingle = catchAsync(async (req, res) => {
  const result = await UserService.getSingle(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Get single user',
    data: result,
  });
});
const deleteOne = catchAsync(async (req, res) => {
  const result = await UserService.deleteOne(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Delete user',
    data: result,
  });
});
const updateOne = catchAsync(async (req, res) => {
  const result = await UserService.updateOne(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Update user',
    data: result,
  });
});

export const UserController = {
  create,
  getAll,
  getSingle,
  deleteOne,
  updateOne,
};
