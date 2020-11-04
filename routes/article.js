const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { validatorLink } = require('../middlewares/validate.js');

const {
  getArticles,
  createArticle,
  deleteArticle,
} = require('../controllers/article');

// по запросу возвращаем все сохраненные пользователем статьи
router.get('/articles', getArticles);

// по запросу создаем статью
router.post('/articles', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().custom(validatorLink).required(),
    image: Joi.string().custom(validatorLink).required(),
  }).unknown(true),
}), createArticle);

// по запросу удаляем статью
router.delete('/articles/:articleId', celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().required().hex(),
  }).unknown(true),
}), deleteArticle);

module.exports = router;
