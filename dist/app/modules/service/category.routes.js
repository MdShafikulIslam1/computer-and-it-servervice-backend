"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRoutes = void 0;
const express_1 = __importDefault(require("express"));
const category_controller_1 = require("./category.controller");
const router = express_1.default.Router();
router.post('/create-service', category_controller_1.ServiceController.create);
router.get('/', category_controller_1.ServiceController.getAll);
router.get('/:id', category_controller_1.ServiceController.getSingle);
router.delete('/:id', category_controller_1.ServiceController.deleteOne);
router.patch('/:id', category_controller_1.ServiceController.updateOne);
exports.ServiceRoutes = router;
