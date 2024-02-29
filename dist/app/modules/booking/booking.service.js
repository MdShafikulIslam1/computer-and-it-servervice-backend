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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const booking_constant_1 = require("./booking.constant");
const ApiError_1 = __importDefault(require("../../../error/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const create = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    if (((_a = payload === null || payload === void 0 ? void 0 : payload.bookingItems) === null || _a === void 0 ? void 0 : _a.length) < 1) {
        throw new ApiError_1.default(http_status_1.default.NOT_ACCEPTABLE, 'Add at least one booking item in your cart');
    }
    const cartIds = (_b = payload === null || payload === void 0 ? void 0 : payload.bookingItems) === null || _b === void 0 ? void 0 : _b.map((booking) => booking === null || booking === void 0 ? void 0 : booking.cartId);
    const result = yield prisma_1.default.$transaction((ts) => __awaiter(void 0, void 0, void 0, function* () {
        const bookingCreate = yield ts.booking.create({
            data: payload,
        });
        yield ts.cart.deleteMany({
            where: {
                id: {
                    in: cartIds,
                },
            },
        });
        return bookingCreate;
    }));
    return result;
});
const getAll = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelpers_1.paginationHelpers.calculatePagination(paginationOptions);
    // sorting
    let orderBy = {};
    if (sortBy && sortOrder) {
        orderBy = {
            [sortBy]: sortOrder,
        };
    }
    const andConditions = [];
    // searching;
    if (searchTerm) {
        andConditions.push({
            OR: booking_constant_1.bookingSearchableFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }
    //filtering
    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map(key => ({
                [key]: {
                    equals: filterData[key],
                },
            })),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.booking.findMany({
        where: whereConditions,
        include: {
            user: true,
        },
        orderBy,
        skip,
        take: limit,
    });
    const total = yield prisma_1.default.booking.count({
        where: whereConditions,
    });
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingle = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.booking.findFirst({
        where: {
            id,
        },
        include: {
            user: true,
        },
    });
    return result;
});
const deleteOne = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.booking.delete({
        where: {
            id,
        },
    });
    return result;
});
const updateOne = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.booking.update({
        where: {
            id,
        },
        data,
    });
    return result;
});
exports.BookingService = {
    create,
    getAll,
    getSingle,
    updateOne,
    deleteOne,
};
