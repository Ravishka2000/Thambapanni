import asyncHandler from "express-async-handler";
import sendEmail from "./EmailController.js";
import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import bcrypt from "bcrypt";
import generateToken from "../config/jwtToken.js";
import generateRefreshToken from "../config/refreshToken.js";


//Register User 
const createUser = asyncHandler(async (req, res) => {

    //get from the body
    const { firstName, lastName, email, mobile, password, role } = req.body;
    const findUser = await User.findOne({ email });

    //validate inputs
    if (!email || !password || !firstName || !lastName || !mobile) {
        res.status(400);
        throw new Error("Please fill out all fields");
    }

    if (!findUser) {
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            mobile,
            password,
            role
        });
    } else {
        throw new Error("User already exists");
    }

    const user = await User.findOne({ email });

    //creating refreshtoken 
    if (user) {
        const refreshToken = generateRefreshToken(user?._id);
        const { _id, firstName, email, mobile, role } = user;
        const updateUser = await User.findOneAndUpdate(
            user._id,
            {
                refreshToken: refreshToken
            },
            {
                new: true
            }
        )
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 1 * 1000,
        })
        res.status(200).json({
            _id,
            firstName,
            email,
            mobile,
            token: generateToken(user._id),
            role
        })
    }
});

//login User 
const loginUser = asyncHandler(async (req, res) => {
    //get email and password from body 
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("Please enter email and password");
    }

    //validate user
    const user = await User.findOne({ email });

    if (!user) {
        res.status(400);
        throw new Error("User not found, Please SignUp");
    }

    const passwordIsCorrect = await bcrypt.compare(password, user.password);

    //create refresh token
    if (user && passwordIsCorrect) {
        const refreshToken = generateRefreshToken(user?._id);
        const { _id, firstName, email, mobile, role } = user;
        const updateUser = await User.findOneAndUpdate(
            user._id,
            {
                refreshToken: refreshToken
            },
            {
                new: true
            }
        )
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 1 * 1000,
        })
        res.status(200).json({
            _id,
            firstName,
            email,
            mobile,
            token: generateToken(user._id),
            role
        })
    } else {
        res.status(400);
        throw new Error("Invalid Email or Password");
    }

});


//login as admin
const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("Please enter email and password");
    }

    const admin = await User.findOne({ email });
    if (admin.role !== 'admin') {
        throw new Error("Not Authorized");
    }

    if (!admin) {
        res.status(400);
        throw new Error("User not found, Please SignUp");
    }

    const passwordIsCorrect = await bcrypt.compare(password, admin.password);

    if (admin && passwordIsCorrect) {
        const refreshToken = generateRefreshToken(admin?._id);
        const { _id, firstName, email, mobile, role } = admin;
        const updateUser = await User.findOneAndUpdate(
            admin._id,
            {
                refreshToken: refreshToken
            },
            {
                new: true
            }
        )
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 72 * 1000,
        })
        res.status(200).json({
            _id,
            firstName,
            email,
            mobile,
            token: generateToken(admin._id),
            role
        })
    } else {
        res.status(400);
        throw new Error("Invalid Email or Password");
    }

});

//login as admin
const loginGuide = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("Please enter email and password");
    }

    const guide = await User.findOne({ email });
    if (guide.role !== 'guide') {
        throw new Error("Not Authorized");
    }

    if (!guide) {
        res.status(400);
        throw new Error("User not found, Please SignUp");
    }

    const passwordIsCorrect = await bcrypt.compare(password, guide.password);

    if (guide && passwordIsCorrect) {
        const refreshToken = generateRefreshToken(guide?._id);
        const { _id, firstName, email, mobile, role } = guide;
        const updateUser = await User.findOneAndUpdate(
            guide._id,
            {
                refreshToken: refreshToken
            },
            {
                new: true
            }
        )
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 72 * 1000,
        })
        res.status(200).json({
            _id,
            firstName,
            email,
            mobile,
            token: generateToken(guide._id),
            role
        })
    } else {
        res.status(400);
        throw new Error("Invalid Email or Password");
    }

});

//save address
const saveAddress = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { address } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(_id, {
            address
        }, {
            new: true
        });
        res.json(updatedUser);
    } catch (error) {
        throw new Error(error);
    }
});

//get a user
const getUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        res.json(user);
    } catch (error) {
        throw new Error(error);
    }
});

//delete a user
const deleteUser = asyncHandler(async (req, res) => {
    //get id from req.params
    const { id } = req.params;
    try {
        const user = await User.findByIdAndDelete(id);
        res.json(user);
    } catch (error) {
        throw new Error(error);
    }
});

//update user
const updateUser = asyncHandler(async (req, res) => {
    //get id from req.params
    const { _id } = req.user;
    const { firstName, lastName, email, mobile } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(_id, {
            firstName,
            lastName,
            email,
            mobile
        }, {
            new: true
        });
        res.json(updatedUser);
    } catch (error) {
        throw new Error(error);
    }
});

//handle refresh 
const handleRefreshToken = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie?.refreshToken) {
        throw new Error("No refresh token");
    }
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({ refreshToken });
    if (!user) {
        throw new Error("No Refresh Token present in db or not matched");
    }
    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, dePayPaled) => {
        if (err || user.id !== dePayPaled.id) {
            throw new Error("There is something wrong with refresh token");
        }
        const accessToken = generateToken(user?._id);
        res.json({ accessToken });
    })
});

//logout 
const logout = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie?.refreshToken) {
        throw new Error("No refresh token");
    }
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({ refreshToken });
    if (!user) {
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
        });
        return res.sendStatus(204);
    }
    await User.findOneAndUpdate(refreshToken, {
        refreshToken: "",
    });
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
    });
    return res.sendStatus(204);
});

//update password
const updatePassword = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { password } = req.body;
    const user = await User.findById(_id);
    if (password) {
        user.password = password;
        const updatedPasword = await user.save();
        res.json(updatedPasword);
    } else {
        res.json(user);
    }
});

//forgot password
const forgotPasswordToken = asyncHandler(async (req, res) => {
    //get the email from the body
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!email) {
        throw new Error("Please enter the email");
    }
    if (!user) {
        throw new Error("Invalid email");
    }
    try {
        //send the reset password link
        const token = await user.createPasswordResetToken();
        await user.save();
        const resetURL = `Hi, Please follow this link to reset your password. This link is valid till 10 minutes from now. <a href='http://localhost:3000/api/user/reset-password/${token}'>Click Here</a>`;
        const data = {
            to: email,
            subject: "Forgot Password Link",
            text: "Hey user",
            htm: resetURL,
        }
        sendEmail(data);
        res.json(token);
    } catch (error) {
        throw new Error(error);
    }
});

//get All Users
const getAllUsers = asyncHandler(async (req, res) => {
    try {
        const getUsers = await User.find();
        res.json(getUsers);
    } catch (error) {
        throw new Error(error);
    }
});

//reset password
const resetPassword = asyncHandler(async (req, res) => {
    //get new password from req.body
    const { password } = req.body;
    const { token } = req.params;
    const hashToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
        passwordResetToken: hashToken,
        passwordResetExpires: {
            $gt: Date.now()
        }
    });
    if (!user) {
        throw new Error("Token expired, please try again");
    }
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    res.json(user);
});

//verify token 
const verifyToken = asyncHandler(async (req, res) => {
    res.status(200).json({ user: req.user });
});


export default {
    createUser,
    updateUser,
    forgotPasswordToken,
    updatePassword,
    resetPassword,
    loginUser,
    loginAdmin,
    loginGuide,
    getAllUsers,
    handleRefreshToken,
    logout,
    getUser,
    deleteUser,
    saveAddress,
    verifyToken
}