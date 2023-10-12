import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AuthService } from './auth.service';
import config from '../../../config';
import { IRefreshTokenResponse } from './auth.interface';

const loginUser = catchAsync(async (req, res) => {
  const { ...loginData } = req.body;
  const result = await AuthService.loginUser(loginData);
  const { refreshToken } = result;
  // set up refreshToken to the browser cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' Login Successful',
    data: result,
  });
});
const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthService.refreshToken(refreshToken);
  //  set up refresh token to the browser cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);
  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'New Access token generated!',
    data: result,
  });
});

const changePassword = catchAsync(async (req, res) => {
  const user = req.user;
  const { ...passwordData } = req.body;
  const result = await AuthService.changePassword(user, passwordData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' password change Successfully',
    data: result,
  });
});
export const AuthController = {
  loginUser,
  refreshToken,
  changePassword,
};
