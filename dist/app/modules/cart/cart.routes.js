"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartRoutes = void 0;
const express_1 = __importDefault(require("express"));
const cart_controller_1 = require("./cart.controller");
const Auth_1 = __importDefault(require("../../middlewares/Auth"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.post('/create-cart', (0, Auth_1.default)(client_1.User_role.admin), cart_controller_1.CartController.create);
router.get('/', cart_controller_1.CartController.getAll);
router.get('/:id', cart_controller_1.CartController.getSingle);
router.delete('/:id', cart_controller_1.CartController.deleteOne);
router.patch('/:id', cart_controller_1.CartController.updateOne);
exports.CartRoutes = router;
