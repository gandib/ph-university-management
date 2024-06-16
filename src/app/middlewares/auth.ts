import { JwtPayload } from 'jsonwebtoken';
import httpStatus from 'http-status';
import AppError from '../errors/appError';
import catchAsync from '../utils/catchAsync';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';
import { verifyToken } from '../modules/Auth/auth.utils';

const auth = (...requiredRole: TUserRole[]) => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;

    // if token is sent frpm the client
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    // check if the token is valid
    const decoded = verifyToken(token, config.jwt_access_secret as string);

    const { role, userId, iat } = decoded;

    //checking if the user is exists
    const user = await User.isUserExistsByCustomId(userId);

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'User is not found!');
    }

    // checking user is already deleted
    const isUserDeleted = user?.isDeleted;
    if (isUserDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, 'User is already deleted!');
    }

    // checking user is blocked
    const userStatus = user?.status;
    if (userStatus === 'blocked') {
      throw new AppError(httpStatus.FORBIDDEN, 'User is already blocked!');
    }

    // checking password is changed, if true > do token invalid
    if (
      user?.passwordChangedAt &&
      User.isJWTIssuedBeforePasswordChanged(
        user?.passwordChangedAt,
        iat as number,
      )
    ) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    if (requiredRole && !requiredRole.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
