const router = require('express').Router();
const usersRouters = require('./users.js');
const articleRouters = require('./article.js');
const error = require('./error.js');
const auth = require('../middlewares/auth.js');
const { login, createUser } = require('../controllers/users.js');
const {
  validateSignin,
  validateSignup,
} = require('../middlewares/validations.js');

router.post('/signin', validateSignin, login);
router.post('/signup', validateSignup, createUser);

router.use(auth);

router.use('/', usersRouters);
router.use('/', articleRouters);

// отправляем ошибку, если ресурса не сушествует
router.use('*', error);

module.exports = router;
