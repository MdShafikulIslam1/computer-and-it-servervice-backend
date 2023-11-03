/* eslint-disable @typescript-eslint/no-explicit-any */
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/paginationOptions';
import prisma from '../../../shared/prisma';
import { Feedback, Prisma } from '@prisma/client';
import { IFeedbackFilterableFields } from './feedback.interface';
import { feedbackSearchableFields } from './feedback.constant';
const create = async (payload: Feedback): Promise<Feedback> => {
  const result = await prisma.feedback.create({
    data: payload,
  });
  return result;
};

const getAll = async (
  filters: IFeedbackFilterableFields,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Feedback[]>> => {
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
      OR: feedbackSearchableFields.map(field => ({
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
  const whereConditions: Prisma.FeedbackWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.feedback.findMany({
    where: whereConditions,
    orderBy,
    skip,
    take: limit,
  });
  const total = await prisma.feedback.count({
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

// const getSingle = async (id: string): Promise<Feedback | null> => {
//   const result = await prisma.Feedback.findFirst({
//     where: {
//       id,
//     },
//     include: {
//       user: true,
//       service: true,
//     },
//   });
//   return result;
// };

// const deleteOne = async (id: string): Promise<Feedback | null> => {
//   const result = await prisma.Feedback.delete({
//     where: {
//       id,
//     },
//   });
//   return result;
// };
// const updateOne = async (
//   id: string,
//   data: Partial<Feedback>
// ): Promise<Feedback | null> => {
//   const result = await prisma.Feedback.update({
//     where: {
//       id,
//     },
//     data,
//   });
//   return result;
// };
export const FeedbackService = {
  create,
  getAll,
  // getSingle,
  // updateOne,
  // deleteOne,
};
