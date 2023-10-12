import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { CategoryService } from './category.service';
import pick from '../../../shared/pick';
import { paginationOptionFields } from '../../../common/paginationOptions';
import { categoryFilterableFields } from './category.constant';

const create = catchAsync(async (req, res) => {
  const result = await CategoryService.create(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully create Category',
    data: result,
  });
});

const getAll = catchAsync(async (req, res) => {
  const filters = pick(req.query, categoryFilterableFields);
  const paginationOptions = pick(req.query, paginationOptionFields);
  const result = await CategoryService.getAll(filters, paginationOptions);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Get all Category',
    data: result.data,
    meta: result.meta,
  });
});
const getSingle = catchAsync(async (req, res) => {
  const result = await CategoryService.getSingle(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Get single Category',
    data: result,
  });
});
const deleteOne = catchAsync(async (req, res) => {
  const result = await CategoryService.deleteOne(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Delete Category',
    data: result,
  });
});
const updateOne = catchAsync(async (req, res) => {
  const result = await CategoryService.updateOne(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Update Category',
    data: result,
  });
});

export const CategoryController = {
  create,
  getAll,
  getSingle,
  deleteOne,
  updateOne,
};
