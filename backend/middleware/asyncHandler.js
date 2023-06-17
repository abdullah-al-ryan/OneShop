const asyncHandler = (fn) => (req, res, next) => {
  // we have a function that takes request, response and next. It's gonna resolve a promise. And if there's an error or it resolves, it's gonna catch it and pass it to the next piece of middleware.

  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;
