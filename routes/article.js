const router = require('express').Router();
const { getArticles, createArticle, deleteArticle } = require('../controllers/article');

// по запросу возвращаем все сохраненные пользователем статьи
router.get('/articles', getArticles);

// по запросу создаем статью
router.post('/articles', createArticle);

// по запросу удаляем статью
router.delete('/articles/:articleId', deleteArticle);
