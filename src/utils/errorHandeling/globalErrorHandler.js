const globalErrorHandler = (error, req, res, next) => {
    const status = error.cause || 500;
    return res.status(status).json({ sucess: false, message: error.message })
}
export default globalErrorHandler