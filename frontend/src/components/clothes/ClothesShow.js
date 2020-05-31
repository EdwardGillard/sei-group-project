import React from 'react'

import { singleCloth, sendMessage, getUserProfile, postFavorite, addCommentCloth, deleteCommentCloth, rateClothes } from '../../lib/api'
import { toast } from '../../lib/notifications'

import SingleClothCard from './SingleClothCard'

class ClothesShow extends React.Component {

  state = {
    cloth: null,
    user: null,
    item: '',
    comments: {
      text: ''
    },
    commentsArray: [],
    contactModalOpen: false,
    messages: {
      text: ''
    },
    ratingData: {
      rating: null
    }
  }

  // * GET each clothing item on mount via Id
  componentDidMount() {
    try {
      this.getSingleCloth()
    } catch (err) {
      this.props.history.push('/notfound')
    }
  }

  // * Function to GET single clothing Item
  getSingleCloth = async () => {
    try {
      const clothId = this.props.match.params.id
      const res = await singleCloth(clothId)
      const userId = res.data.user.username
      const user = await getUserProfile(userId)
      this.setState({ cloth: res.data, user: user.data, commentsArray: res.data.comments })
    } catch (err) {
      this.props.history.push('/notfound')
    }
  }

  // * Function to click on first picture in similar user post
  handleFirstClick = async () => {
    const clothId = this.props.match.params.id
    const res = await singleCloth(clothId)
    const userId = res.data.user.username
    const user = await getUserProfile(userId)
    const newCloth = user.data.createdArticles[0]
    const newClothId = user.data.createdArticles[0]._id
    this.setState({ cloth: newCloth, user: user.data })
    this.props.history.push(`/clothes/${newClothId}`)
  }

  // * Function to click on second picture in similar user post
  handleSecondClick = async () => {
    const clothId = this.props.match.params.id
    const res = await singleCloth(clothId)
    const userId = res.data.user.username
    const user = await getUserProfile(userId)
    const newCloth = user.data.createdArticles[1]
    const newClothId = user.data.createdArticles[1]._id
    this.setState({ cloth: newCloth, user: user.data })
    this.props.history.push(`/clothes/${newClothId}`)
  }

  // * Function to add item to Favourite
  handleFavouriteSubmit = async e => {
    try {
      const addToList = await { ...this.state.item, [e.target.name]: e.target.value }
      await postFavorite(addToList)
      toast(`You added '${this.state.cloth.title}' to your favourites`)
    } catch (err) {
      toast(`${err.response.data.message}`)
    }
  }

  // * Function to toggle contact button
  toggleContactModal = () => {
    this.setState({ contactModalOpen: !this.state.contactModalOpen })
  }

  // * Function to handle change of contact box
  handleContactChange = e => {
    const messages = { ...this.state.messages, [e.target.name]: e.target.value }
    this.setState({ messages })
  }

  // * Function to submit message to user
  handleContactSubmit = async e => {
    e.preventDefault()
    const { user } = this.state
    const userId = user.id
    try {
      await sendMessage(userId, this.state.messages)
      this.setState({ messages: { ...this.state.messages, text: '' } })
      toast(`Message sent to ${user.username}!`)
    } catch (err) {
      toast('Message could not be sent')
    }
    this.setState({ contactModalOpen: false })
  }

  //* Handles change on comments
  handleCommentChange = e => {
    const comments = { ...this.state.comments, [e.target.name]: e.target.value }
    this.setState({ comments })
  }

  //* Submit Comment on item of Clothing
  handleCommentSubmit = async e => {
    const clothId = this.props.match.params.id
    e.preventDefault()
    try {
      if (this.state.comments.text <= 0) return null
      const res = await addCommentCloth(clothId, this.state.comments)
      this.setState({ commentsArray: res.data.comments, comments: { ...this.state.comments, text: '' } })
      this.getSingleCloth()
      toast('Comment added!')
    } catch (err) {
      toast('Could not add comment')
    }
  }

  //* Delete comment on item of Clothing
  deleteComment = async e => {
    try {
      const clothId = this.props.match.params.id
      const commentId = e.target.value
      await deleteCommentCloth(clothId, commentId)
      this.getSingleCloth()
      toast('Comment deleted!')
    } catch (err) {
      toast('Could not delete comment')
    }
  }

  //* Function to get the page Users ratings - If they haven't been rated yet you start on 3 stars
  getUserRating = () => {
    const ratings = this.state.user.ratings
    if (ratings.length === 0) return 0
    return (Math.round((ratings.reduce((a, rating) => a + parseInt(rating.rating), 0) / ratings.length)))
  }

  getArticleRating = () => {
    const articleRating = this.state.cloth.ratings
    if (articleRating.length === 0) return 0
    return (Math.round((articleRating.reduce((a, rating) => a + parseInt(rating.rating), 0) / articleRating.length)))
  }

  //* ON Clicking the star sets state 
  onStarClick = (nextValue) => {
    const ratingData = { ...this.state.ratingData, rating: nextValue }
    this.setState({ ratingData }
      , () => {
        this.submitArticleRating()
      })
  }

  //*POST rating on the user
  async submitArticleRating() {
    try {
      const clothId = this.props.match.params.id
      await rateClothes(clothId, this.state.ratingData)
      this.getSingleCloth()
      toast('Thankyou, rating has been added')
    } catch (err) {
      toast('Rating couldnt be added')
    }
  }

  render() {

    if (!this.state.cloth) return <h1>Even more Ninjas are working on this</h1>
    const { cloth, user, comments, commentsArray, contactModalOpen } = this.state
    const rating = parseInt(this.getUserRating())
    const articleRating = parseInt(this.getArticleRating())
    //* Variable of images from articles user posted
    const images = user.createdArticles.map(image => { return { image: image.image, id: image._id } })
    //* Current users Id
    const userId = user._id
    //* Cloth Id
    const clothId = cloth._id
    return (
      <>
        <section className="hero is-light">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                {cloth.title}
              </h1>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <div className="columns">
              <SingleClothCard
                {...cloth}
                {...user}
                {...comments}
                commentText={this.state.comments.text}
                commentsArray={commentsArray}
                deleteComment={this.deleteComment}
                handleCommentChange={this.handleCommentChange}
                handleCommentSubmit={this.handleCommentSubmit}
                images={images}
                currentUserId={userId}
                onFirstClick={this.handleFirstClick}
                onSecondClick={this.handleSecondClick}
                onClick={this.handleFavouriteSubmit}
                clothId={clothId}
                toggleContact={this.toggleContactModal}
                contactModalOpen={contactModalOpen}
                handleContactChange={this.handleContactChange}
                handleContactSubmit={this.handleContactSubmit}
                rating={rating}
                articleRating={articleRating}
                onStarClick={this.onStarClick}
                userid={this.state.cloth.user._id}
                val={this.state.ratingData.rating}
                message={this.state.messages.text}
              />
            </div>
          </div>
        </section>
      </>
    )
  }
}

export default ClothesShow