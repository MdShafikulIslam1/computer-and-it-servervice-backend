/* eslint-disable @typescript-eslint/no-explicit-any */
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/paginationOptions';
import prisma from '../../../shared/prisma';
import { Cart, Prisma } from '@prisma/client';
import { ICartFilterableFields } from './cart.interface';
import { cartSearchableFields } from './cart.constant';
const create = async (payload: Cart): Promise<Cart> => {
  const result = await prisma.cart.create({
    data: payload,
  });
  return result;
};

const getAll = async (
  filters: ICartFilterableFields,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Cart[]>> => {
  const { searchTerm, ...filterData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);
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
      OR: cartSearchableFields.map(field => ({
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
          equals: (filterData as any)[key],
        },
      })),
    });
  }
  const whereConditions: Prisma.CartWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.cart.findMany({
    where: whereConditions,
    include: {
      user: true,
      service: true,
    },
    orderBy,
    skip,
    take: limit,
  });
  const total = await prisma.cart.count({
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
};

const getSingle = async (id: string): Promise<Cart | null> => {
  const result = await prisma.cart.findFirst({
    where: {
      id,
    },
    include: {
      user: true,
      service: true,
    },
  });
  return result;
};

const deleteOne = async (id: string): Promise<Cart | null> => {
  const result = await prisma.cart.delete({
    where: {
      id,
    },
  });
  return result;
};
const updateOne = async (
  id: string,
  data: Partial<Cart>
): Promise<Cart | null> => {
  const result = await prisma.cart.update({
    where: {
      id,
    },
    data,
  });
  return result;
};
export const CartService = {
  create,
  getAll,
  getSingle,
  updateOne,
  deleteOne,
};
