const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundErr = require('../errors/NotFoundErr');
const ConflickErr = require('../errors/ConflictErr');

const { NODE_ENV, JWT_SECRET } = process.env;

// по запросу возвращаем email и name пользователя
const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user === null) {
        throw new NotFoundErr({ message: `Упс, пользователя с таким id ${req.user._id} не существует` });
      }
      res.status(200).send({ email: user.email, name: user.name });
    })
    .catch(next);
};

// по запросу создаем пользователя
const createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .catch((err) => {
      if (err.name === 'MongoError' || err.code === 11000) {
        throw new ConflickErr({ message: 'Пользователь с таким email уже есть, введите другой email' });
      } else next(err);
    })
    .then((user) => res.status(201).send({ message: `Пользователь с email: ${user.email} зарегистрирован` }))
    .catch(next);
};

// авторизация пользователя
const login = (req, res, next) => {
  const {
    email,
    password,
  } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // здесь создаем токен
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.status(200).send({ token });
    })
    .catch(next);
};

module.exports = {
  getUser,
  createUser,
  login,
};
