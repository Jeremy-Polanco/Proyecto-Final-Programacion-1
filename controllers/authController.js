import { StatusCodes } from 'http-status-codes';
import CustomError from '../errors/index.js';
import User from '../model/User.js';

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new CustomError.BadRequestError('Please Provide all Values');
  }

  const userAlreadyExist = await User.findOne({ email });

  if (userAlreadyExist) {
    throw new CustomError.BadRequestError('Email already in use');
  }

  const user = await User.create(req.body);

  res
    .status(StatusCodes.CREATED)
    .json({ user: { name: user.name, email: user.email } });
};
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomError.BadRequestError('Please Provide All Values');
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    throw CustomError.UnauthenticatedError('Invalid Credentials');
  }

  const passwordMatched = user.comparePassword(password);

  if (!passwordMatched) {
    throw CustomError.UnauthenticatedError('Invalid Credentials');
  }

  res
    .status(StatusCodes.OK)
    .json({ user: { name: user.name, email: user.email } });
};

export { register, login };
