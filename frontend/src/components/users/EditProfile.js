import React from 'react'
import EditProfileForm from '../users/EditProfileForm'
import EditClothCard from '../users/EditClothCard'
import { editProfile, getProfile, deleteCloth } from '../../lib/api'
import { getPostcodeInfo } from '../../lib/ext_api'
import { toast } from '../../lib/notifications'

class EditProfile extends React.Component {
  state = {
    user: '',
    formData: {
      username: '',
      postcode: ''
    },
    errors: {}
  }

  async componentDidMount() {
    try {
      await this.getEditDashboard()
    } catch (err) {
      this.props.history.push('/notfound')
    }
  }

  async getEditDashboard() {
    try {
      const res = await getProfile()
      this.setState({ formData: res.data })
    } catch (err) {
      this.props.history.push('/notfound')
    }
  }

  //* Function to update the user profile info
  handleChange = event => {
    const formData = { ...this.state.formData, [event.target.name]: event.target.value }
    const errors = { ...this.state.errors, [event.target.name]: '' }
    this.setState({ formData, errors })
  }

  //* Test updated postcode against database using axios request.
  getLocation = async () => {
    try {
      const postcode = this.state.formData.postcode
      await getPostcodeInfo(postcode)
    } catch (err) {
      const errors = { ...this.state.errors, postcode: err.response.data.error }
      this.setState({ errors })
    }
  }

  //* HandleChange event for the postcode which calls check psotcode & then randomly assigns the user
  handlePostcodeChange = event => {
    const formData = { ...this.state.formData, postcode: event.target.value }
    const errors = { ...this.state.errors, postcode: '' }
    this.setState({ formData, errors }, () => {
      this.getLocation()
    })
  }

  //* Submit profile info update
  handleSubmit = async event => {
    event.preventDefault()
    try {
      const res = await editProfile(this.state.formData)
      toast('Profile updated!')
      this.props.history.push(`/profile/${res.data.username}`)
    } catch (err) {
      this.setState({ errors: err.response.data })
    }
  }

  //* Delete item of clothing
  deleteArticle = async (_id) => {
    try {
      await deleteCloth(_id)
      toast('Item deleted')
      this.getEditDashboard()
    } catch (err) {
      toast('Couldnt delete item')
    }
  }

  render() {
    if (!this.state.formData.createdArticles) return null
    const { createdArticles } = this.state.formData

    return (
      <div className="Edit-profile">
        <div className="Edit-profile-form">
          <h1 className="title edit-profile-title">Edit your details </h1>
          <EditProfileForm
            errors={this.state.errors}
            onChange={this.handleChange}
            onSubmit={this.handleSubmit}
            onPostcodeChange={this.handlePostcodeChange}
            {...this.state.formData}
          />
        </div>
        <div className="Edit-profile-index">
          <div className="Edit-items-index">
            {createdArticles.map(item =>
              <EditClothCard
                deleteArticle={this.deleteArticle}
                {...item}
                key={`${item._id}1`}
              />)}
          </div>
        </div>
      </div>
    )
  }
}

export default EditProfile