const asyncHandler = (fn) => async () => {
  try {
    await fn(req, res, next);
  } catch (err) {
    res.status(err.code || 500).json({
      sucess: false,
      message: err.message,
    });
  }
};

module.exports = asyncHandler;
