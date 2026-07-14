function errorHandler(error, _req, res, _next) {
  if (error.name === "ValidationError") {
    return res.status(400).json({
      error: {
        code: "VALIDATION_ERROR",
        message: "The request contains invalid task data.",
        details: Object.values(error.errors).map((item) => ({
          field: item.path,
          issue: item.message
        }))
      }
    });
  }

  if (error.name === "CastError") {
    return res.status(400).json({
      error: {
        code: "INVALID_ID",
        message: "The provided task ID is not valid."
      }
    });
  }

  console.error(error);

  return res.status(500).json({
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: "Something went wrong on the server."
    }
  });
}

module.exports = errorHandler;

