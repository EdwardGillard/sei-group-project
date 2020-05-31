//! require router, secureRoute and controllers 
const router = require('express').Router()
const user = require('../controllers/users')
const auths = require('../controllers/auth')
const articles = require('../controllers/articles')
const posts = require('../controllers/posts')
const mapPins = require('../controllers/mapPins')
const secureRoute = require('../lib/secureRoute')
const messages = require('../controllers/messages')


//? CLOTHES
//* Get/Post Clothes
router.route('/clothes')
  .get(articles.getClothes)
  .post(secureRoute, articles.create)

//* Get Single Clothes/ Edit Clothes/ Delete Clothes
router.route('/clothes/:id')
  .get(articles.single)
  .put(secureRoute, articles.update)
  .delete(secureRoute, articles.delete)

//* Comments on Clothing
router.route('/clothes/:id/comments')
  .post(secureRoute, articles.commentCreate)

//* Delete Comments on Clothing
router.route('/clothes/:commentId/comments/:articleid')
  .delete(secureRoute, articles.commentDelete)

//? *****************************//

//? AUTHS
//* Register
router.route('/register')
  .post(auths.register)

//* Login
router.route('/login')
  .post(auths.login)

//* Show current user
router.route('/profile')
  .get(secureRoute, user.profile)
  .put(secureRoute, user.updateUser)

//* Get Specific Profile
router.route('/profile/:username')
  .get(user.getProfile)

router.route('/deleteUser')
  .delete(secureRoute, user.deleteUser)

//* Add Comment to specifc profile
router.route('/profile/comments/:id')
  .post(secureRoute, user.commentCreate)

//* Delete specific comment on specific user.
router.route('/profile/:id/comments/:commentId')
  .delete(secureRoute, user.commentDelete)

//? *****************************//

//? POSTS
//* Get/Create posts
router.route('/posts')
  .get(posts.index)
  .post(secureRoute, posts.create)

//* Get specific Post/ Edit Post/ Delete Post
router.route('/posts/:id')
  .get(posts.single)
  .put(secureRoute, posts.update)
  .delete(secureRoute, posts.delete)

//* Comment on Post
router.route('/posts/:id/comments')
  .post(secureRoute, posts.commentCreate)

//* Delete a Comment on a Post
router.route('/posts/:id/comments/:commentId')
  .delete(secureRoute, posts.commentDelete)

//? *****************************//

//? RATINGS

//* User ratings
router.route('/profile/:id/rating')
  .post(secureRoute, user.ratingCreate)

//* Edit User rating
router.route('/profile/:id/rating/:ratingid')
  .put(secureRoute, user.editUserRating)

//* Rating for Articles 
router.route('/clothes/:id/rating')
  .post(secureRoute, articles.rating)

//* Edit Rating for Articles
router.route('/clothes/:id/rating/:ratingid')
  .put(secureRoute, articles.editArticleRating)

//? *****************************//

//? FAVOURITES
//* Get Favourites
router.route('/favourites')
  .get(secureRoute, user.getAllFavourites)

//? FAVS ARTICLES
//* Add article to favs
router.route('/favourites/article')
  .post(secureRoute, user.favsArticle)

//* remove article from favs
router.route('/favourites/article/:id')
  .delete(secureRoute, user.favArticlesRemove)

//? FAVS FRIENDS
//* add friend to favs
router.route('/favourites/friends')
  .post(secureRoute, user.favsFriend)

//* remove friend from favs
router.route('/favourite/friend/:id')
  .delete(secureRoute, user.favFriendsRemove)

//? FAVS POSTS
//* Add post to favs
router.route('/favourites/posts')
  .post(secureRoute, user.favsPost)

//*Remove post from favs
router.route('/favourites/posts/:id')
  .delete(secureRoute, user.favPostsRemove)

//? *****************************//

//? MAP PINS

//* Get and post pins
router.route('/pins')
  .get(secureRoute, mapPins.getPins)
  .post(secureRoute, mapPins.create)

//* Get single pin/ edit pin/ deletepin
router.route('/pins/:pinId')
  .get(secureRoute, mapPins.single)
  .put(secureRoute, mapPins.update)
  .delete(secureRoute, mapPins.delete)

//? *****************************//

//? MESSAGES
//* start message chain
router.route('/:userid/messages')
  .post(secureRoute, messages.createMessage)

//* get single message/ post response
router.route('/messages/:id')
  .post(secureRoute, messages.sendResponse)
  .get(secureRoute, messages.getMessage)

//* outbox for sent messages
router.route('/profile/messages/received')
  .get(secureRoute, messages.getMessageThread)

//! exports
module.exports = router