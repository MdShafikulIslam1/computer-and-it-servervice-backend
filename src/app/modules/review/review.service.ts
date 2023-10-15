/* eslint-disable @typescript-eslint/no-explicit-any */
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/paginationOptions';
import prisma from '../../../shared/prisma';
import { ReviewRating, Prisma } from '@prisma/client';
import { IReviewFilterableFields } from './review.interface';
import { reviewSearchableFields } from './review.constant';

const create = async (payload: ReviewRating): Promise<ReviewRating> => {
  const result = await prisma.reviewRating.create({
    data: payload,
  });
  return result;
};

const getAll = async (
  filters: IReviewFilterableFields,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ReviewRating[]>> => {
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
      OR: reviewSearchableFields.map(field => ({
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
  const whereConditions: Prisma.ReviewRatingWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.reviewRating.findMany({
    where: whereConditions,
    include: {
      user: true,
      service: true,
    },
    orderBy,
    skip,
    take: limit,
  });
  const total = await prisma.reviewRating.count({
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

const getSingle = async (id: string): Promise<ReviewRating | null> => {
  const result = await prisma.reviewRating.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const deleteOne = async (id: string): Promise<ReviewRating | null> => {
  const result = await prisma.reviewRating.delete({
    where: {
      id,
    },
  });
  return result;
};
const updateOne = async (
  id: string,
  data: Partial<ReviewRating>
): Promise<ReviewRating | null> => {
  const result = await prisma.reviewRating.update({
    where: {
      id,
    },
    data,
  });
  return result;
};
export const ReviewService = {
  create,
  getAll,
  getSingle,
  updateOne,
  deleteOne,
};
