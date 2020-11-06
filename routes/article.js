const router = require('express').Router();

const {
  validateCreateArticle,
  validateDeleteArticle,
} = require('../middlewares/validations.js');

const {
  getArticles,
  createArticle,
  deleteArticle,
} = require('../controllers/article');

// по запросу возвращаем все сохраненные пользователем статьи
router.get('/articles', getArticles);

// по запросу создаем статью
router.post('/articles', validateCreateArticle, createArticle);

// по запросу удаляем статью
router.delete('/articles/:articleId', validateDeleteArticle, deleteArticle);

module.exports = router;
