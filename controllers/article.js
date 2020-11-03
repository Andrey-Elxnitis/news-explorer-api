const Article = require('../models/article');
const BadRequestErr = require('../errors/BadRequestErr');
const NotFoundErr = require('../errors/NotFoundErr');
const ForbiddenErr = require('../errors/ForbiddenErr');

const getArticles = (req, res, next) => {
  Article.find({})
    .then((articles) => res.status(200).send(articles))
    .catch(next);
};

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
    .then((article) => res.status(201).send(article))
    .catch(next);
};

// по запросу удаляем карточку
const deleteArticle = (req, res, next) => {
  Article.findById(req.params.articleId)
    .orFail()
    .catch(() => {
      throw new NotFoundErr({ message: 'Нет такой статьи' });
    })
    .then((article) => {
      if (article.owner.toString() !== req.user._id) {
        throw new ForbiddenErr({ message: 'Удалять можно только свои карточки' });
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
