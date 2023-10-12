import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ServicesItemService } from './service.service';
import pick from '../../../shared/pick';
import { paginationOptionFields } from '../../../common/paginationOptions';
import { serviceFilterableFields } from './service.constant';

const create = catchAsync(async (req, res) => {
  const result = await ServicesItemService.create(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully create Service',
    data: result,
  });
});

const getAll = catchAsync(async (req, res) => {
  const filters = pick(req.query, serviceFilterableFields);
  const paginationOptions = pick(req.query, paginationOptionFields);
  const result = await ServicesItemService.getAll(filters, paginationOptions);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Get all Service',
    data: result.data,
    meta: result.meta,
  });
});
const getSingle = catchAsync(async (req, res) => {
  const result = await ServicesItemService.getSingle(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Get single Service',
    data: result,
  });
});
const deleteOne = catchAsync(async (req, res) => {
  const result = await ServicesItemService.deleteOne(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Delete Service',
    data: result,
  });
});
const updateOne = catchAsync(async (req, res) => {
  const result = await ServicesItemService.updateOne(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Update Service',
    data: result,
  });
});

export const ServiceController = {
  create,
  getAll,
  getSingle,
  deleteOne,
  updateOne,
};
