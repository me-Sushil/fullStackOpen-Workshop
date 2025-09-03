const logger = require('./logger')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorhandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    // Invalid ObjectId format (e.g., malformed MongoDB _id)
    return response.status(400).send({ error: "malformatted id" });

  } else if (error.name === "ValidationError") {
    // Mongoose schema validation failed (invalid or missing data)
    return response.status(400).json({ error: error.message });

  } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return response.status(400).json({ error: 'expected `username` to be unique' })
  }


  next(error);
};


module.exports = {
  requestLogger,
  unknownEndpoint,
  errorhandler
}