const errorHandler = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ message: err.message });
    return;
  }
  res.status(500).send({ message: `К сожалению на сервере произошла ошибка: ${err.message}` });
  next();
};

module.exports = errorHandler;
