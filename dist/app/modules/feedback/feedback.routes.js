"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackRoutes = void 0;
const express_1 = __importDefault(require("express"));
const feedback_controller_1 = require("./feedback.controller");
const router = express_1.default.Router();
router.post('/create-feedback', feedback_controller_1.FeedbackController.create);
router.get('/', feedback_controller_1.FeedbackController.getAll);
// router.get('/:id', FeedbackController.getSingle);
// router.delete('/:id', FeedbackController.deleteOne);
// router.patch('/:id', FeedbackController.updateOne);
exports.FeedbackRoutes = router;
