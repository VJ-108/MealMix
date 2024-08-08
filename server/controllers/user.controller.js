import prisma from "../prisma/index.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { signupSchema, loginSchema } from "../utils/validationSchemas.js";
import { sendOTP } from "../utils/emailService.js";

const generateRefreshToken = async (user) => {
  const { email } = user;
  const refreshToken = jwt.sign(
    {
      id: user.id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
  await prisma.user.update({
    where: { email },
    data: { refreshToken },
  });
  return refreshToken;
};

const generateAccessToken = async (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (user.otpExpiry && new Date() > user.otpExpiry) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    await prisma.user.update({
      where: { email },
      data: { otp: null, otpExpiry: null, verified: true },
    });

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error verifying OTP" });
  }
};

const signup = async (req, res) => {
  try {
    const result = signupSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: result.error.errors[0].message });
    }
    const { username, email, password } = req.body;
    const existedUser = await prisma.user.findFirst({
      where: { OR: [{ username }, { email }] },
    });
    if (existedUser) {
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    }
    const hashedPassword = await bcryptjs.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiryTime = parseInt(process.env.OTP_EXPIRY_TIME, 10);
    const otpExpiry = new Date(Date.now() + otpExpiryTime);
    const user = await prisma.user.create({
      data: { username, email, password: hashedPassword, otp, otpExpiry },
      select: { id: true, username: true, email: true },
    });
    await sendOTP(email, otp);
    res.status(201).json({
      message: "User created successfully, please verify your email",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating new user" });
  }
};

const resendOTP = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.verified) {
      return res.status(400).json({ message: "User already verified" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiryTime = parseInt(process.env.OTP_EXPIRY_TIME, 10);
    const otpExpiry = new Date(Date.now() + otpExpiryTime);
    await prisma.user.update({
      where: { email },
      data: { otp, otpExpiry },
    });

    await sendOTP(email, otp);
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error resending OTP" });
  }
};

const login = async (req, res) => {
  try {
    const decodedToken = req.cookies?.accessToken;
    if (decodedToken) {
      try {
        const decoded = jwt.verify(
          decodedToken,
          process.env.ACCESS_TOKEN_SECRET
        );
        if (!decoded || !decoded.id) {
          return res.status(401).json({ message: "Invalid access token" });
        }

        const user = await prisma.user.findUnique({
          where: { id: decoded.id },
          select: {
            id: true,
            username: true,
            email: true,
            verified: true,
            ratings: {
              select: {
                recipeId: true,
                rating: true,
              },
            },
          },
        });

        if (!user) {
          return res.status(401).json({ message: "User not found" });
        }

        if (!user.verified) {
          return res
            .status(401)
            .json({ message: "Please verify your email to login" });
        }

        return res.status(200).json({
          message: "Logged in successfully",
          user,
        });
      } catch (error) {
        return res.status(401).json({ message: "Invalid access token" });
      }
    }

    const result = loginSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: result.error.errors[0].message });
    }

    const { email, password } = req.body;

    const user = await prisma.user.findFirst({
      where: { email },
      select: {
        id: true,
        username: true,
        email: true,
        password: true,
        verified: true,
        ratings: {
          select: {
            recipeId: true,
            rating: true,
          },
        },
      },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid email" });
    }

    if (!user.verified) {
      return res
        .status(401)
        .json({ message: "Please verify your email to login" });
    }

    const isPasswordCorrect = await bcryptjs.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const accessToken = await generateAccessToken(user);
    const refreshToken = await generateRefreshToken(user);

    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "None", 
    };

    res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        message: "Logged in successfully",
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          ratedRecipesIds: user.ratings,
          verified: user.verified,
        },
        accessToken,
        refreshToken,
      });
  } catch (error) {
    res.status(500).json({ message: "Error logging in" });
  }
};

const logout = async (req, res) => {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: { refreshToken: null },
    });
    if (!updatedUser) {
      return res.status(401).json({ message: "User not found" });
    }
    res
      .status(200)
      .clearCookie("accessToken")
      .clearCookie("refreshToken")
      .json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error logging out" });
  }
};

const deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id;
    await prisma.rating.deleteMany({
      where: { userId },
    });
    const user = await prisma.user.delete({
      where: { id: userId },
    });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    res
      .status(200)
      .clearCookie("accessToken")
      .clearCookie("refreshToken")
      .json({ message: "Account deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting account" });
  }
};

export { signup, login, logout, deleteAccount, verifyOTP, resendOTP };
