const { CelebrateError } = require('celebrate');
const validator = require('validator');
const { celebrate, Joi } = require('celebrate');

// проверяем ссылки, которые нам присылают
const validatorLink = (value) => {
  console.log(value);
  if (!validator.isURL(value)) {
    throw new CelebrateError('Ссылка не валидная, введите другую');
  }
  return value;
};

// валидация приходящих данных на запрос авторизации
const validateSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .message('Поле "email" должно быть валидным')
      .messages({
        'any.required': 'Поле "email" обязательно для заполнения',
      }),
    password: Joi.string().required().min(10).pattern(/^\S+$/)
      .message('Поле password должно быть без пробелов')
      .messages({
        'any.required': 'Поле "email" обязательно для заполнения',
        'string.min': 'Минимальная длина пароля 10 символов',
      }),
  }),
});

// валидация приходящих данных при запросе регистрации пользователя
const validateSignup = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .message('Поле "email" должно быть валидным')
      .messages({
        'any.required': 'Поле "email" обязательно для заполнения',
      }),
    password: Joi.string().required().min(10).pattern(/^\S+$/)
      .message('Поле "password" должно быть без пробелов')
      .messages({
        'any.required': 'Поле "password" обязательно для заполнения',
        'string.min': 'Минимальная длина пароля 10 символов',
      }),
    name: Joi.string().required().min(2).max(30)
      .messages({
        'any.required': 'Поле "name" обязательно для заполнения!',
        'string.min': 'Минимальная длина "name" 2 символa',
        'string.max': 'Максимальная длина "name" 30 символов',
      }),
  }),
});

// валидация приходящих данных при запросе создания карточки
const validateCreateArticle = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required()
      .messages({
        'any.required': 'Поле "keyword" обязательно для заполнения',
      }),
    title: Joi.string().required()
      .messages({
        'any.required': 'Поле "title" обязательно для заполнения',
      }),
    text: Joi.string().required()
      .messages({
        'any.required': 'Поле "text" обязательно для заполнения',
      }),
    date: Joi.string().required()
      .messages({
        'any.required': 'Поле "date" обязательно для заполнения',
      }),
    source: Joi.string().required()
      .messages({
        'any.required': 'Поле "source" обязательно для заполнения',
      }),
    link: Joi.string().custom(validatorLink).required()
      .messages({
        'any.required': 'Поле "link" обязательно для заполнения',
      }),
    image: Joi.string().custom(validatorLink).required()
      .messages({
        'any.required': 'Поле "image" обязательно для заполнения',
      }),
  }),
});

// валидируем id при запросе удаления карточки
const validateDeleteArticle = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().required().hex(),
  }),
});

module.exports = {
  validateSignin,
  validateSignup,
  validateCreateArticle,
  validateDeleteArticle,
};
