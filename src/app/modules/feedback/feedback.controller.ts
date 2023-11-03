import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import pick from '../../../shared/pick';
import { paginationOptionFields } from '../../../common/paginationOptions';
import { FeedbackService } from './feedback.service';
import { feedbackFilterableFields } from './feedback.constant';

const create = catchAsync(async (req, res) => {
  const result = await FeedbackService.create(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully create an Feedback',
    data: result,
  });
});

const getAll = catchAsync(async (req, res) => {
  const filters = pick(req.query, feedbackFilterableFields);
  const paginationOptions = pick(req.query, paginationOptionFields);
  const result = await FeedbackService.getAll(filters, paginationOptions);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Get allFeedback',
    data: result.data,
    meta: result.meta,
  });
});
// const getSingle = catchAsync(async (req, res) => {
//   const result = await FeedbackService.getSingle(req.params.id);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Successfully Get singleFeedback',
//     data: result,
//   });
// });
// const deleteOne = catchAsync(async (req, res) => {
//   const result = await FeedbackService.deleteOne(req.params.id);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Successfully DeleteFeedback',
//     data: result,
//   });
// });
// const updateOne = catchAsync(async (req, res) => {
//   const result = await FeedbackService.updateOne(req.params.id, req.body);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Successfully UpdateFeedback',
//     data: result,
//   });
// });

export const FeedbackController = {
  create,
  getAll,
  // getSingle,
  // deleteOne,
  // updateOne,
};
