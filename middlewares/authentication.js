import CustomError from '../errors/index.js';
import { isTokenValid } from '../utils/index.js';
import Token from '../model/Token.js';

const authenticateUser = async (req, res, next) => {
  const { refreshToken, accessToken } = req.signedCookies;

  try {
    if (accessToken) {
      const payload = isTokenValid(accessToken);
      req.user = payload.user;
      return next();
    }
    const payload = isTokenValid(refreshToken);

    const existingToken = await Token.findOne({
      user: payload.user.userId,
      refreshToken: payload.refreshToken,
    });

    if (!existingToken || existingToken?.isValid) {
      throw new CustomError.UnauthenticatedError('Authentication Invalid');
    }

    req.user = payload.user;
    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError('Authentication Invalid');
  }
};

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnauthenticatedError(
        'Unauthorized to access this route'
      );
    }
    next();
  };
};

export { authenticateUser, authorizePermissions };
