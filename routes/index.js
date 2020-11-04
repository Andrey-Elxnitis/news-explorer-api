const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const usersRouters = require('./users.js');
const articleRouters = require('./article.js');
const error = require('./error.js');
const auth = require('../middlewares/auth.js');
const { login, createUser } = require('../controllers/users.js');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(10).pattern(/^\S+$/),
  }),
}), login);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(10).pattern(/^\S+$/),
    name: Joi.string().min(2).max(30),
  }).unknown(true),
}), createUser);

router.use(auth);

router.use('/', usersRouters);
router.use('/', articleRouters);

// отправляем ошибку, если ресурса не сушествует
router.use('*', error);

module.exports = router;
