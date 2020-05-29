//! Require
const Article = require('../models/article')
const User = require('../models/user')
const { notFound, unauthorized } = require('../lib/errorMessages')

//! CLOTHING
//? Function to get all articles of clothing
//* WORKING tested
//* ERROR tested
async function articlesIndex(req, res, next) {
  try {
    const articles = await Article.find().populate('user').populate('comments.user').populate('ratings.user').populate('user.article')
    if (!articles) throw new Error(notFound)
    res.status(200).json(articles)
  } catch (err) {
    next(err)
  }
}

//? Function to create an article of clothing
//* WORKING tested
//* ERROR tested
async function articlesCreate(req, res, next) {
  try {
    req.body.user = req.currentUser
    const createdArticle = await Article.create(req.body)
    res.status(201).json(createdArticle)
  } catch (err) {
    next(err)
  }
}

//? Function to show single article of clothing
//* WORKING tested
//* ERROR tested
async function articlesShow(req, res, next) {
  const articleId = req.params.id
  try {
    const article = await Article.findById(articleId).populate('user').populate('comments.user')
    const user = await User.findById(article.user._id).populate('createdArticles')
    await Object.assign(article.user, user)
    await article.save()
    if (!article) throw new Error(notFound)
    res.status(200).json(article)
  } catch (err) {
    next(err)
  }
}

//? Function to update single article of clothing
//* WORKING tested
//* ERROR tested
async function articlesUpdate(req, res, next) {
  try {
    const article = await Article.findById(req.params.id)
    console.log(req.params)
    if (!article) throw new Error(notFound)
    if (!article.user.equals(req.currentUser._id)) throw new Error(unauthorized)
    Object.assign(article, req.body)
    await article.save()
    res.status(202).json(article)
  } catch (err) {
    console.log(err.message)
    next(err)
  }
}

//? Function to delete an article of clothing by id
//* WORKING tested
//* ERROR tested
async function articlesDelete(req, res, next) {
  req.body.user = req.currentUser
  try {
    const toDelete = await Article.findById(req.params.id)
    if (!toDelete) throw new Error(notFound)
    if (!toDelete.user.equals(req.currentUser._id)) throw new Error(unauthorized)
    await toDelete.remove()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
}

//! COMMENTS
//? Function to Create Comments
//* WORKING tested
//* ERROR tested
async function articleCommentCreate(req, res, next) {
  try {
    req.body.user = req.currentUser
    const articleId = req.params.id
    const article = await Article.findById(articleId).populate('comments.user')
    if (!article) throw new Error(notFound)
    article.comments.push(req.body)
    await article.save()
    res.status(201).json(article)
  } catch (err) {
    next(err)
  }
}

//? Function to delete Comment on Article
//* WORKING tested
//* ERROR tested
async function articleCommentDelete(req, res, next) {
  try {
    req.body.user = req.currentUser
    const article = await Article.findById(req.params.articleid)
    if (!article) throw new Error(notFound)
    const commentToDelete = article.comments.id(req.params.commentId)
    if (!commentToDelete) throw new Error(notFound)
    if (!commentToDelete.user.equals(req.currentUser._id)) throw new Error(unauthorized)
    await commentToDelete.remove()
    await article.save()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
}

//? Add Rating
//* WORKING tested
//* ERROR tested
async function articleRatingCreate(req, res, next) {
  try {
    req.body.user = req.currentUser
    const rating = req.body
    const articleId = req.params.id
    const article = await Article.findById(articleId)
    if (!article) throw new Error(notFound)
    article.ratings.push(rating)
    await article.save()
    res.status(201).json(article.ratings)
  } catch (err) {
    next(err)
  }
}

//? Update article rating
//* WORKING tested
//* ERROR tested
async function editArticleRating(req, res, next) {
  try {
    req.body.user = req.currentUser
    const id = req.params.id
    const ratingId = req.params.ratingid
    const article = await Article.findById(id)
    if (!article) throw new Error(notFound)
    const ratingToUpdate = article.ratings.id(ratingId)
    if (!ratingToUpdate) throw new Error(notFound)
    if (!ratingToUpdate.user.equals(req.currentUser._id)) throw new Error(unauthorized)
    Object.assign(ratingToUpdate, req.body)
    await article.save()
    res.status(201).json(ratingToUpdate)
  } catch (err) {
    next(err)
  }
}

//! Exports
module.exports = {
  getClothes: articlesIndex,
  create: articlesCreate,
  single: articlesShow,
  update: articlesUpdate,
  delete: articlesDelete,
  commentCreate: articleCommentCreate,
  commentDelete: articleCommentDelete,
  rating: articleRatingCreate,
  editArticleRating
}