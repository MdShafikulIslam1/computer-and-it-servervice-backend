/* eslint-disable @typescript-eslint/no-explicit-any */
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/paginationOptions';
import prisma from '../../../shared/prisma';
import { Booking, Prisma } from '@prisma/client';
import { IBookingFilterableFields } from './booking.interface';
import { bookingSearchableFields } from './booking.constant';
const create = async (payload: any): Promise<Booking> => {
  const cartIds = payload?.bookingItems?.map((booking: any) => booking?.cartId);
  const result = await prisma.$transaction(async ts => {
    const bookingCreate = await ts.booking.create({
      data: payload,
    });
    await ts.cart.deleteMany({
      where: {
        id: {
          in: cartIds,
        },
      },
    });
    return bookingCreate;
  });
  return result;
};

const getAll = async (
  filters: IBookingFilterableFields,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Booking[]>> => {
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
      OR: bookingSearchableFields.map(field => ({
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
  const whereConditions: Prisma.BookingWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.booking.findMany({
    where: whereConditions,
    orderBy,
    skip,
    take: limit,
  });
  const total = await prisma.booking.count({
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

const getSingle = async (id: string): Promise<Booking | null> => {
  const result = await prisma.booking.findFirst({
    where: {
      id,
    },
  });
  return result;
};

const deleteOne = async (id: string): Promise<Booking | null> => {
  const result = await prisma.booking.delete({
    where: {
      id,
    },
  });
  return result;
};
const updateOne = async (
  id: string,
  data: Partial<any>
): Promise<Booking | null> => {
  const result = await prisma.booking.update({
    where: {
      id,
    },
    data,
  });
  return result;
};
export const BookingService = {
  create,
  getAll,
  getSingle,
  updateOne,
  deleteOne,
};
