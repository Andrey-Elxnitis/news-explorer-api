const router = require('express').Router();
const NotFoundErr = require('../errors/NotFoundErr');

// для не существующих ресурсов возвращаем ошибку 404
router.all('/', () => {
  throw new NotFoundErr({ message: 'Такого ресурса не существует' });
});

module.exports = router;
