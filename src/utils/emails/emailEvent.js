import { EventEmitter } from "events";
import jwt from "jsonwebtoken";
import sendEmails, { subjects } from "./sendEmails.js";
import { signup } from "./generateHTML.js";

export const eventEmitter = new EventEmitter();
eventEmitter.on('sendEmail', async (email) => {
    const token = jwt.sign({ email }, process.env.JWT_SECRET);
    const link = `sa7ahaaapplication.ftp.evennode.com/auth/activateAccount/${token}`;
    const isSent = await sendEmails({ to: email, subject: subjects.register, html: signup(link) });
    if (!isSent) {
        return next(new Error("Failed to send activation email", { cause: 500 }));
    }
})

