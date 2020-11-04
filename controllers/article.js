const Article = require('../models/article');
const BadRequestErr = require('../errors/BadRequestErr');
const NotFoundErr = require('../errors/NotFoundErr');
const ForbiddenErr = require('../errors/ForbiddenErr');

// по запросу возвращаем сохраненные пользователем статьи
const getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => res.status(200).send(articles))
    .catch(next);
};

// по запросу добавляем статью в бд
const createArticle = (req, res, next) => {
  const {
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
  } = req.body;

  Article.create({
    keyword, title, text, date, source, link, image, owner: req.user._id,
  })
    .catch((err) => {
      throw new BadRequestErr({ message: `Переданы не корректные данные: ${err.message}` });
    })
    .then((article) => res.status(201).send({
      _id: article._id,
      keyword: article.keyword,
      title: article.title,
      text: article.text,
      date: article.date,
      source: article.source,
      link: article.link,
      image: article.image,
    }))
    .catch(next);
};

// по запросу удаляем статью
const deleteArticle = (req, res, next) => {
  Article.findById(req.params.articleId)
    .select('+owner')
    .orFail()
    .catch(() => {
      throw new NotFoundErr({ message: 'Нет такой статьи' });
    })
    .then((article) => {
      if (article.owner.toString() !== req.user._id) {
        throw new ForbiddenErr({ message: 'Упс, чужие статьи удалять нельзя' });
      }
      Article.findByIdAndDelete(req.params.articleId)
        .then(() => res.status(200).send({ message: `Статья с id: ${req.params.articleId} удалена` }))
        .catch(next);
    })
    .catch(next);
};

module.exports = {
  getArticles,
  createArticle,
  deleteArticle,
};
