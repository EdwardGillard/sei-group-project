//! Require
const { notFound, unauthorized, duplicate, cantAddYourself, cantMessageYourself } = require('./errorMessages')

//* Function to handle Errors passed from Controllers
function errorHandler(err, req, res, next) {
  if (err.name === 'ValidationError') {

    const newErrors = {}
    for (const key in err.errors) {
      newErrors[key] = err.errors[key].message
    }
    return res.status(422).json(newErrors)
  }

  if (err.message === notFound) {
    return res.status(404).json({ message: 'Not Found' })
  }

  if (err.message === cantAddYourself) {
    return res.status(422).json({ message: cantAddYourself })
  }

  if (err.message === cantMessageYourself) {
    return res.status(422).json({ message: cantMessageYourself })
  }

  if (err.message === duplicate) {
    return res.status(422).json({ message: duplicate })
  }

  if (err.message === duplicate) {
    return res.status(422).json({ message: duplicate })
  }

  if (err.message === unauthorized) {
    return res.status(401).json({ message: unauthorized })
  }

  res.sendStatus(500)
  next(err)
}

//! Exports
module.exports = errorHandler