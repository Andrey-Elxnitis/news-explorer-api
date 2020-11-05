const router = require('express').Router();
const { getUser } = require('../controllers/users');

// при запросе возвращаем информацию о пользователе
router.get('/users/me', getUser);

module.exports = router;
