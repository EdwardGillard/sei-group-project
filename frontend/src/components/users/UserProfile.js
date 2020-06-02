import React from 'react'

import { Link } from 'react-router-dom'
import UserClothCard from './UserClothCard'
import MessageCard from './MessageCard'
import EditProfilePicture from './EditProfilePicture'
import { getProfile, editProfile, deleteProfile, inboxMessage, replyMessage } from '../../lib/api'
import { logout } from '../../lib/auth'
import { getPostcodeInfo } from '../../lib/ext_api'
import Comments from '../common/Comments'
import StarRating from '../common/StarRating'
import { toast } from '../../lib/notifications'


class UserProfile extends React.Component {
  state = {
    user: '',
    location: '',
    latitude: '',
    longitude: '',
    modalOpen: false,
    commentsArray: [],
    rating: 0,
    errors: {},
    messages: null,
    replyModalOpen: false,
    replyId: '',
    message: {
      text: ''
    },
    messagesModalOpen: false
  }
  // * Function to GET the users details
  async componentDidMount() {
    try {
      await this.getUserDashboard()
      await this.getInbox()
      this.interval = setInterval(this.getInbox, 120000)
    } catch (err) {
      this.props.history.push('/notfound')
    }
  }

  //* Function to allow CDM to be called again
  async getUserDashboard() {
    try {
      const res = await getProfile()
      this.setState({ user: res.data, commentsArray: res.data.comments, errors: '' })
      this.getLocation()
    } catch (err) {
      this.props.history.push('/notfound')
    }
  }

  // * Function to toggle reply message box
  toggleReplyModal = e => {
    this.setState({ replyModalOpen: !this.state.contactModalOpen, replyId: e.target.value })
  }

  // * Function to handle change of reply textbox
  handleReplyChange = e => {
    const message = { ...this.state.message, [e.target.name]: e.target.value }
    this.setState({ message })
  }

  // * Function to reply to messages
  handleReplySubmit = async e => {
    e.preventDefault()
    const { replyId } = this.state
    try {
      await replyMessage(replyId, this.state.message)
      await this.setState({ message: { ...this.state.message, text: '' } })
      this.getInbox()
      toast('Reply sent!')
    } catch (err) {
      toast('Couldnt send reply')
    }
    this.setState({ replyModalOpen: false })
  }

  // * Function to GET incoming messages
  async getInbox() {
    try {
      const res = await inboxMessage()
      this.setState({ messages: res.data })
    } catch (err) {
      console.log(err)
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
      this.setState({ location: 'London, Greater London' })
    }
  }

  //* Function to allow user to upload a profile picture
  handleChange = (event) => {
    this.setState(prevState => ({
      user: {
        ...prevState.user,
        profilePic: event.target.value
      }
    }))
  }

  //* Function for PUT request to update profile picture
  handleSubmit = async event => {
    event.preventDefault()
    try {
      await editProfile(this.state.user)
      this.toggleModal()
      this.getUserDashboard()
      toast('Updated!')
    } catch (err) {
      console.log(err.response.data)
    }
  }

  //* Function to toggle state to show the image upload form or not
  toggleModal = () => {
    this.setState({ modalOpen: !this.state.modalOpen })
  }

  //* Delete Profile
  deleteUserProfile = async e => {
    try {
      await deleteProfile()
      await logout()
      this.props.history.push('/')
    } catch (err) {
      toast('Couldnt delete this profile')
    }
  }

  // * Function to push the user to clothes add page if they want to add a new item 
  handleAddClothes = () => {
    const user = this.props.match.params.username
    this.props.history.push(`/profile/${user}/add`)
  }

  //* Function to get the page Users ratings - I they haven't been rated yet you start on 3 stars
  getUserRating = () => {
    const ratings = this.state.user.ratings
    if (ratings.length === 0) return 3
    return (Math.round((Object.values(ratings).reduce((a, { rating }) =>
      a + rating, 0) / ratings.length)))
  }

  //* Push user to an edit page to 
  handleEditProfile = () => {
    const user = this.props.match.params.username
    this.props.history.push(`/profile/${user}/edit`)
  }

  // * Function to toggle messages modal
  toggleMessagesModal = () => {
    this.setState({ messagesModalOpen: !this.state.messagesModalOpen })
  }

  render() {
    if (!this.state.user || !this.state.location || !this.state.messages) return null
    const { username, createdArticles, profilePic } = this.state.user
    const { commentsArray, messages, location } = this.state
    const reversedCreatedArticles = createdArticles.slice(0, 6).reverse()
    const rating = parseInt(this.getUserRating())
    const nameCap = username.charAt(0).toUpperCase() + username.slice(1)
    // * Sorted messages by date
    const sortedMessages = messages.sort((a, b) => b.createdAt - a.createdAt)
    return (
      <div className="My-profile">
        <div className="My-profile-top-row">
          <div className="Photo-delete-rating">
            <div className="Profile-img">
              <img src={profilePic} alt="profile pic" />
            </div>
            <div>
            <EditProfilePicture
              profilePic={this.state.user.profilePic}
              toggleModal={this.toggleModal}
              modalOpen={this.state.modalOpen}
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
            />
            <button onClick={this.toggleModal}
              className="button is-profile-btn"
            >Change Profile Picture</button>
          </div>
          <div className="My-profile-rating">
            <StarRating
              rating={rating}
              editing={false}
            />
          </div>
          <div className="Edit-delete">
            <button onClick={this.handleEditProfile}
              className="My-profile-update-btn"
            >Update Profile</button>
            <button onClick={() => { if (window.confirm("Are you sure?")) this.deleteUserProfile() }} className="My-profile-delete-btn">Delete Profile</button>
          </div>
        </div>
        <div className="Welcome">
          <div className="My-profile-favs">
            <button className="Favs-btn"><Link to={`/profile/${username}/friends`}>Following</Link></button>
            <button className="Favs-btn"><a href={`/profile/${username}/favourites`} >Favourite Items</a></button>
            <button className="Favs-btn"><a href={`/profile/${username}/favouriteposts`}>Favourite Posts</a></button>
          </div>
          <div className="Welcome-user">
            <h5 className="title">WELCOME {nameCap}</h5>
            <h6 className="subtitle">{location}</h6>
          </div>
        </div>
      </div>
      <div className="My-profile-columns">
        <div className="Center-col">
          <div className="Messages-main">
            <div>
              <h3 className="Messages-Title"> {`${messages.length}`} Message(s)</h3>
              <div className="My-profile-message-board">
                <div>
                  {sortedMessages.map((message, i) =>
                    <MessageCard
                      value={this.state.message.text}
                      key={i}
                      {...message}
                      reply={this.toggleReplyModal}
                      sendReply={this.handleReplySubmit}
                      replyModal={this.state.replyModalOpen}
                      replyChange={this.handleReplyChange}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="My-items">
            <div className="My-items-top">
              <div className="My-items-title">
                <h3>My Items</h3>
              </div>
              <button className="fav-item-Button"
                onClick={this.handleAddClothes}
              >Add Clothes Now</button>
            </div>
            <div className="My-items-index">
              {(reversedCreatedArticles.length === 0) ?
                <div className="">
                  <h1>Looks like you haven't uploaded anthing yet.</h1>
                  <p> Why don't you add some clothes now? <br /> Or browse the clothes that are on offer? </p>
                </div>
                :
                <div className="My-items-index">
                  {reversedCreatedArticles.map(item =>
                    <UserClothCard
                      {...item}
                      key={item._id}
                    />
                  )}
                </div>}
            </div>
          </div>
          <div className="My-comments-wrapper">
            <div className="My-comments">
              <div className="My-comments-title">
                <h3>Comments</h3>
              </div>
              <div className="Comments-users">
                {commentsArray.map(comment => (
                  <Comments
                    key={comment._id}
                    comment={comment}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      </div >
    )
  }
}
export default UserProfile