const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  // 404 is not found
  res.status(404);
  // pass the error to the next middleware
  next(error);
};

const errorHandler = (err, req, res, next) => {
  // sometimes the error status code is 200, so we will set it to 500 if it is 200
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // check for Mongoose bad ObjectId
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    message = 'Resource not found';
    statusCode = 404;
  }
  res.status(statusCode).json({
    // we will send the error message to the frontend
    message: message,
    // we will send the stack trace to the frontend if we are in development mode
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export { notFound, errorHandler };
