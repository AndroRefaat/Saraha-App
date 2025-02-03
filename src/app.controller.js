import DB from './DB/connection.js';
import authConroller from './modules/auth/auth.controller.js';
import userConroller from './modules/user/user.controller.js';
import messageController from './modules/messages/message.controller.js';
import globalErrorHandler from './utils/errorHandeling/globalErrorHandler.js';
import notFoundHandler from './utils/errorHandeling/notFoundHandler.js';
import cors from 'cors';
const bootstrap = async (app, express) => {
    await DB();
    app.use(express.json());
    app.use(cors());
    app.use('/auth', authConroller);
    app.use('/user', userConroller);
    app.use('/message', messageController);
    app.all('*', notFoundHandler)
    app.use(globalErrorHandler)
}

export default bootstrap;