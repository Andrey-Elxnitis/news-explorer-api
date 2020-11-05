const requestLimit = require('express-rate-limit');

// ограничиваем колличетсво запросов для защиты сервера
const limit = requestLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

module.exports = limit;
