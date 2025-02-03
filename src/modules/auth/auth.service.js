import User from '../../DB/models/user.model.js';
import jwt from "jsonwebtoken";
import { eventEmitter } from '../../utils/emails/emailEvent.js';
import { compare, hash } from '../../utils/hash/hash.js';
import { generateToken } from '../../utils/token/token.js';
import { encrypt } from '../../utils/encryption/encryption.js';

export const register = async (req, res, next) => {
    const { email, password, confirmPassword, userName, phone } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return next(new Error("This email is already registered!", { cause: 400 }));
    }
    const user = await User.create({
        ...req.body,
        password: hash({ plainText: password }),
        phone: encrypt({ plainText: phone }),
        isActivated: false
    });
    eventEmitter.emit('sendEmail', email);
    res.status(201).json({ success: true, message: "User created successfully. Please check your email to activate your account." });

};

export const login = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return next(new Error("User not found", { cause: 400 }));
    if (!user.isActivated) return next(new Error("Account not activated. Please check your email.", { cause: 400 }));
    if (!await compare({ plainText: password, hash: user.password })) {
        return next(new Error("Incorrect password", { cause: 400 }));
    }
    const token = generateToken({ payload: { id: user._id } });
    if (user.isDeleted) {
        user.isDeleted = false;
        await user.save();
    }
    return res.status(200).json({
        success: true,
        message: "Login successful",
        token
    });

};


export const activateAccount = async (req, res, next) => {

    const { token } = req.params;
    if (!token) {
        return next(new Error("Invalid activation link", { cause: 400 }));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.email) {
        return next(new Error("Invalid token", { cause: 400 }));
    }
    const user = await User.findOne({ email: decoded.email });
    if (!user) return next(new Error("User not found", { cause: 400 }));
    if (user.isActivated) return next(new Error("Account is already activated", { cause: 400 }));
    user.isActivated = true;
    await user.save();
    return res.status(200).json({ success: true, message: "Account activated successfully!" });
};
