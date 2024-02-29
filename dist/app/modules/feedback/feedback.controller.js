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
exports.FeedbackController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const paginationOptions_1 = require("../../../common/paginationOptions");
const feedback_service_1 = require("./feedback.service");
const feedback_constant_1 = require("./feedback.constant");
const create = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield feedback_service_1.FeedbackService.create(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Successfully create an Feedback',
        data: result,
    });
}));
const getAll = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, feedback_constant_1.feedbackFilterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, paginationOptions_1.paginationOptionFields);
    const result = yield feedback_service_1.FeedbackService.getAll(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Successfully Get allFeedback',
        data: result.data,
        meta: result.meta,
    });
}));
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
exports.FeedbackController = {
    create,
    getAll,
    // getSingle,
    // deleteOne,
    // updateOne,
};
