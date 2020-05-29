import React from 'react'
import { Link } from 'react-router-dom'

import { getUserProfile, postFavoriteFriend, commentOnUser, DeleteCommentOnUser, sendMessage, rateUser } from '../../lib/api'
import { getPostcodeInfo } from '../../lib/ext_api'
import { isAuthenticated } from '../../lib/auth'

import Comments from '../common/Comments'
import StarRating from '../common/StarRating'

import { toast } from '../../lib/notifications'

class userShowProfile extends React.Component {
  state = {
    user: null,
    location: '',
    userItems: null,
    friend: '',
    comments: {
      text: ''
    },
    commentsArray: [],
    contactModalOpen: false,
    text: '',
    ratingData: {
      rating: ''
    }
  }

  async componentDidMount() {
    try {
      await this.getUser()
    } catch (err) {
      this.props.history.push('/notfound')
    }
  }

  getUser = async () => {
    try {
      const userId = this.props.match.params.username
      console.log(userId)
      const res = await getUserProfile(userId)
      const userItems = res.data.createdArticles
      this.setState({ user: res.data, userItems, commentsArray: res.data.comments, })
      this.getLocation()
    } catch (err) {
      this.props.history.push('/notfound')
    }
  }

  //* Function to find user location details
  async getLocation() {
    try {
      const postcode = this.state.user.postcode
      const response = await getPostcodeInfo(postcode)
      const nuts = response.data.result.nuts
      const region = response.data.result.region
      this.setState({ location: `${nuts}, ${region}` })
    } catch (err) {
      const latitude = 51.515419
      const longitude = -0.141099
      this.setState({ location: 'London, UK', latitude, longitude })
    }
  }

  // * Function to toggle contact modal
  toggleContactModal = () => {
    this.setState({ contactModalOpen: !this.state.contactModalOpen })
  }

  // * Function to handle change of contact box
  handleContactChange = e => {
    const text = { ...this.state.text, [e.target.name]: e.target.value }
    this.setState({ text })
  }

  // * Function to submit message
  handleContactSubmit = async e => {
    e.preventDefault()
    const userId = this.state.user._id
    try {
      await sendMessage(userId, this.state.text)
      toast('You sent a message!')
    } catch (err) {
      toast('Couldnt submit message')
    }
    this.setState({ contactModalOpen: false })
  }

  // * Function to add poster to friends
  handleFriendSubmit = async e => {
    try {
      const addToList = await { ...this.state.friend, [e.target.name]: e.target.value }
      await postFavoriteFriend(addToList)
      toast(`You added ${this.state.user.username}!`)
    } catch (err) {
      toast('Couldnt add user')
    }
  }

  //* Handle Comments on User
  handleCommentChange = e => {
    const comments = { ...this.state.comments, [e.target.name]: e.target.value }
    this.setState({ comments })
  }

  //* Submit Comment on User
  handleCommentSubmit = async e => {
    e.preventDefault()
    try {
      const res = await commentOnUser(this.state.user._id, this.state.comments)
      this.setState({ commentsArray: res.data.comments, comments: { ...this.state.comments, text: '' } })
      this.getUser()
      toast('Comment added')
    } catch (err) {
      toast('Couldnt add comment')
    }
  }

  //* Delete Comments on User
  deleteComment = async e => {
    try {
      const commentId = e.target.value
      await DeleteCommentOnUser(this.state.user._id, commentId)
      toast('Comment deleted!')
      this.getUser()
    } catch (err) {
      toast('Couldnt delete this comment')
    }
  }

  //* Function to get the page Users ratings - I they haven't been rated yet you start on 3 stars
  getUserRating = () => {
    const ratings = this.state.user.ratings
    if (ratings.length === 0) return 3
    return (Math.round((Object.values(ratings).reduce((a, { rating }) =>
      a + rating, 0) / ratings.length)))
  }


  //* ON Clicking the star sets state 
  onStarClick = (nextValue) => {
    if (!isAuthenticated()) return
    toast('Thankyou, rating has been added')
    const ratingData = { ...this.state.ratingData, rating: nextValue }
    this.setState({ ratingData }
      , () => {
        this.submitUserRating()
      })
  }

  //*POST rating on the user
  async submitUserRating() {
    try {
      const userId = this.state.user._id
      await rateUser(userId, this.state.ratingData)
    } catch (err) {
      toast('Rating couldnt be added')
    }
  }

  render() {
    if (!this.state.user) return <h1>User kidnapped, Ninja to the rescue</h1>

    const rating = parseInt(this.getUserRating())
    const { user, userItems, comments, commentsArray, contactModalOpen } = this.state
    const { location } = this.state
    const userName = user.username.charAt(0).toUpperCase() + user.username.slice(1)
    return (
      <>
        <div className="Show-profile">
          <div className="Show-profile-top">
            <div className="Photo-user-rating">
              <img src={user.profilePic} alt={user.username} />
              <h4 className="Username">{userName}</h4>
              <h6 className="User-location">{location}</h6>
              <StarRating
                rating={rating}
                onStarClick={this.onStarClick}
              />
              <div className="Follow-message">
                {isAuthenticated() && <button name="friend" value={user._id} onClick={this.handleFriendSubmit} className="Button">Follow</button>}
                {isAuthenticated() && <button onClick={this.toggleContactModal} className="Button">Message</button>}
                <div className="Modal-Message">
                  <div className={contactModalOpen ? "modal is-active" : "modal"}>
                    <div className="field">
                      <form onSubmit={this.handleContactSubmit}>
                        <div className="control">
                          <textarea
                            name="text"
                            onChange={this.handleContactChange}
                            className="textarea is-medium is-primary"
                            placeholder="Message..."></textarea>
                        </div>
                        <br />
                        <button className="Button">SEND</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="Comments-container">
              <h3>{userName}'s Reviews</h3>
              {
                isAuthenticated() && <section className="Comments">
                  <form
                    className="Comment-left"
                    onSubmit={this.handleCommentSubmit}>
                    <p> Your review for {userName}:</p>
                    <textarea
                      className="Comment-text"
                      rows="5"
                      type="textArea"
                      maxLength="200"
                      name="text"
                      onChange={this.handleCommentChange}
                      value={comments.text} />
                    <button className="fav-item-Button">Submit Comment</button>
                  </form>
                  <div className="Comments-on-user">
                    {commentsArray.map(comment => (
                      <Comments
                        key={comment._id}
                        comment={comment}
                        deleteComment={this.deleteComment}
                      />
                    ))}
                  </div>
                </section>
              }
            </div>
          </div>
          <div className="Show-profile-bottom">
            <div className="User-items-index">
              {userItems.map(item =>
                <div key={item._id}>
                  <Link to={`/clothes/${item._id}`}>
                    <div className="Card">
                      <div className="img">
                        <img src={item.image} alt={item.title} loading="lazy" width="300" height="300" />
                      </div>
                      <div className="Card-text">
                        <h4 className="Title">{item.title}</h4>
                      </div>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default userShowProfile