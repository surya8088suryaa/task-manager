const globalErrorHandler = (err,req,res,next) => {
    console.error(err.message);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Oops! somethingn went wrong!",
        status: err.status || 500,

    });
};

export default globalErrorHandler;