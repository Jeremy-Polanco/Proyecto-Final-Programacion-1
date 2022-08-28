import { StatusCodes } from 'http-status-codes';
import cloudinaryModule from 'cloudinary';
const cloudinary = cloudinaryModule.v2;
import User from '../model/User.js';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import CustomError from '../errors/index.js';
import createTokenUser from '../utils/createTokenUser.js';
import { attachCookiesToResponse } from '../utils/jwt.js';

const getAllUsers = async (req, res) => {
  const users = await User.find({}).select('-password');

  res.status(StatusCodes.OK).json({
    users,
  });
};

const getSingleUser = async (req, res) => {
  const { id: userId } = req.params;

  const user = await User.find({ _id: userId }).select('-password');

  if (!user) {
    throw new CustomError.NotFoundError(`No user found with id : ${userId}`);
  }

  res.status(StatusCodes.OK).json({
    user,
  });
};

const showCurrentUser = async (req, res) => {
  const user = await User.find({ _id: req.user.userId }).select('-password');

  if (!user) {
    throw new CustomError.NotFoundError(
      `No user found with id:  ${req.user.userId}`
    );
  }

  res.status(StatusCodes.OK).json({
    user,
  });
};

const updateUser = async (req, res) => {
  const { email, name, bio, phone } = req.body;

  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      user_filename: true,
      folder: 'user-photo',
    }
  );
  fs.unlinkSync(req.files.image.tempFilePath);

  const user = await User.findOne({ _id: req.user.userId });

  if (name) {
    user.name = name;
  }
  if (email) {
    user.email = email;
  }
  if (bio) {
    user.bio = bio;
  }
  if (phone) {
    user.phone = phone;
  }
  if (req.files) {
    user.image = result.secure_url;
  }

  await user.save();

  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });
  res
    .status(StatusCodes.OK)
    .json({ user: tokenUser, msg: 'Success, User updated!' });
};

const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    throw new CustomError.BadRequestError('Please provide all values');
  }

  const user = await User.find({ id: req.user.userId });

  const IsPasswordCorrect = await user.comparePassword(oldPassword);

  if (!IsPasswordCorrect) {
    throw new CustomError.UnauthenticatedError('Invalid credentials');
  }

  user.password = newPassword;

  await user.save();

  res.status(StatusCodes.OK).json({
    msg: 'Success!, Password Updated',
  });
};

export {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
