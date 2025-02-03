import { Schema, model, Types } from "mongoose";

const messageSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    sender: {
        type: Types.ObjectId,
        ref: "User",
    },
    reciever: {
        type: Types.ObjectId,
        ref: "User",
    }
}, { timestamps: true });

const Message = model("Message", messageSchema);
export default Message
