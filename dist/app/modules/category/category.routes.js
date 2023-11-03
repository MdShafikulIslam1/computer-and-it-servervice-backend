"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const category_controller_1 = require("./category.controller");
const router = express_1.default.Router();
router.post('/create-category', category_controller_1.CategoryController.create);
router.get('/', category_controller_1.CategoryController.getAll);
router.get('/:id', category_controller_1.CategoryController.getSingle);
router.delete('/:id', category_controller_1.CategoryController.deleteOne);
router.patch('/:id', category_controller_1.CategoryController.updateOne);
exports.CategoryRoutes = router;
