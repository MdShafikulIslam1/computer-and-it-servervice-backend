"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewRoutes = void 0;
const express_1 = __importDefault(require("express"));
const review_controller_1 = require("./review.controller");
const router = express_1.default.Router();
router.post('/create-review', review_controller_1.ReviewController.create);
router.get('/', review_controller_1.ReviewController.getAll);
router.get('/:id', review_controller_1.ReviewController.getSingle);
router.delete('/:id', review_controller_1.ReviewController.deleteOne);
router.patch('/:id', review_controller_1.ReviewController.updateOne);
exports.ReviewRoutes = router;
