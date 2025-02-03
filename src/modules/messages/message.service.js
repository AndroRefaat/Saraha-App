import User from "../../DB/models/user.model.js";
import { asyncHandler } from "../../utils/errorHandeling/asyncHandler.js"
import Message from './../../DB/models/message.model.js';


export const sendMessage = asyncHandler(async (req, res, next) => {
    const { content, reciever } = req.body;
    const user = await User.findById(reciever);
    if (!user) return next(new Error("User not found", { cause: 400 }));
    const message = await Message.create({ content, sender: req.user._id, reciever });
    res.status(201).json({ message: "Message sent successfully" });

})


export const getSingleMessage = asyncHandler(async (req, res, next) => {
    const { user } = req;
    const message = await Message.findById(req.params.messageId).populate([
        { path: "sender", select: "userName email -_id" },
        { path: "reciever", select: "userName email -_id" },
    ])
    if (message.reciever?.email === user.email || message.sender?.email === user.email) return res.status(200).json({ message });
    return next(new Error("Unauthorized", { cause: 401 }));
})



export const getAllMessages = asyncHandler(async (req, res, next) => {
    const { flag } = req.query;
    let results;
    if (flag == "inbox") {
        results = await Message.find({ reciever: req.user._id });
    }
    else {
        results = await Message.find({ sender: req.user._id });
    }
    return res.status(200).json({ results });
})



export const updateMessage = asyncHandler(async (req, res, next) => { })



export const deleteMessage = asyncHandler(async (req, res, next) => { })