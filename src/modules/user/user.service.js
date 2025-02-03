
import User from '../../DB/models/user.model.js';
import { decrypt, encrypt } from '../../utils/encryption/encryption.js';
import { asyncHandler } from '../../utils/errorHandeling/asyncHandler.js';
import { compare, hash } from '../../utils/hash/hash.js';



export const profile = asyncHandler(async (req, res, next) => {
    const { user } = req;
    const phone = decrypt({ cipherText: user.phone });
    return res.status(200).json({ ...user, phone });
})

export const updateProfile = asyncHandler(async (req, res, next) => {
    if (req.body.phone) {
        req.body.phone = encrypt({ plainText: req.body.phone });
    }
    const updateProfile = await User.findByIdAndUpdate(req.user._id, { ...req.body, changedAt: Date.now() }, { new: true, runValidators: true },);
    updateProfile
    return res.status(200).json({ success: true, message: "Profile updated successfully", updateProfile });
})


export const updatePassword = asyncHandler(async (req, res, next) => {
    const { oldPassword, password } = req.body;
    if (!await compare({ plainText: oldPassword, hash: req.user.password })) return next(new Error("Incorrect password", { cause: 400 }));
    const hashPassword = hash({ plainText: password });
    const user = await User.findByIdAndUpdate(req.user._id, { password: hashPassword, changedAt: Date.now() }, { new: true, runValidators: true });
    return res.status(200).json({ success: true, message: "Password updated successfully", user });
})

export const freezeAccount = asyncHandler(async (req, res, next) => {

    const user = await User.findByIdAndUpdate(req.user._id, { isDeleted: true, changedAt: Date.now() }, { new: true, runValidators: true });
    return res.status(200).json({ success: true, message: "Password updated successfully", user });
})