/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prisma, Service } from '@prisma/client';
import { FileUploaderService } from '../../../helpers/fileUploader';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { IGenericResponse } from '../../../interfaces/common';
import { ImageKitFile, IUploadFile } from '../../../interfaces/file';
import { IPaginationOptions } from '../../../interfaces/paginationOptions';
import prisma from '../../../shared/prisma';
import { serviceSearchableFields } from './service.constant';
import { IServiceFilterableFields } from './service.interface';

const create = async (req: any): Promise<Service> => {
  const file = req.file as IUploadFile;
  const uploadedImage = (await FileUploaderService.fileUploadToImageKit(
    file
  )) as ImageKitFile;
  const serviceData = {
    imageUrl: uploadedImage.url,
    ...req.body,
  };

  const result = await prisma.service.create({
    data: serviceData,
  });
  return result;
};

const getAll = async (
  filters: IServiceFilterableFields,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Service[]>> => {
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
      OR: serviceSearchableFields.map(field => ({
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
  const whereConditions: Prisma.ServiceWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.service.findMany({
    where: whereConditions,
    include: {
      category: true,
      reviewRatings: true,
    },
    orderBy,
    skip,
    take: limit,
  });
  const total = await prisma.service.count({
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

const getSingle = async (id: string): Promise<Service | null> => {
  const result = await prisma.service.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
    },
  });
  return result;
};

const deleteOne = async (id: string): Promise<Service | null> => {
  const result = await prisma.service.delete({
    where: {
      id,
    },
  });
  return result;
};
const updateOne = async (
  id: string,
  data: Partial<Service>
): Promise<Service | null> => {
  const result = await prisma.service.update({
    where: {
      id,
    },
    data,
  });
  return result;
};
export const ServicesItemService = {
  create,
  getAll,
  getSingle,
  updateOne,
  deleteOne,
};
