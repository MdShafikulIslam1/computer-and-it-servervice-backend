import httpStatus from 'http-status';
import ApiError from '../../../error/ApiError';
import { ILoginUser } from './auth.interface';
import config from '../../../config';
import { JwtHelpers } from '../../../helpers/jwtHelpes';
import prisma from '../../../shared/prisma';
import { Secret } from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const loginUser = async (payload: ILoginUser) => {
  const { email, password } = payload;
  const isUserExist = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  if (!isUserExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User does not exist');
  }
  if (
    isUserExist.password &&
    !(await bcrypt.compare(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password in incorrect');
  }
  const jwtPayload = { email: isUserExist?.email, role: isUserExist?.role };
  const accessToken = JwtHelpers.createToken(
    jwtPayload,
    config.jwt.secret_key as Secret,
    config.jwt.expires_in_secret_key as string
  );
  //TODO:IMPLEMENT REFRESH TOKEN
  // const refreshToken = JwtHelpers.createToken(
  //   jwtPayload,
  //   config.jwt.refresh_secret_key as Secret,
  //   config.jwt.expires_in_refresh_key as string
  // );

  return {
    accessToken,
  };
};

export const AuthService = {
  loginUser,
};
