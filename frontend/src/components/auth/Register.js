import React from 'react'

import RegisterForm from './RegisterForm'
import { registerUser } from '../../lib/api'
import { getPostcodeInfo } from '../../lib/ext_api'
import { avatarArr } from '../common/Images'

class Register extends React.Component {
  state = {
    formData: {
      username: '',
      profilePic: '',
      email: '',
      postcode: '',
      password: '',
      passwordConfirmation: '',
    },
    errors: {}
  }

  //* handleChange event for inputting values on form 
  handleChange = event => {
    const formData = { ...this.state.formData, [event.target.name]: event.target.value }
    const errors = { ...this.state.errors, [event.target.name]: '' }
    this.setState({ formData, errors })
  }

  //* handleChange event for the postcode which calls check psotcode & then randomly assigns the user
  handlePostcodeChange = event => {
    const formData = { ...this.state.formData, postcode: event.target.value }
    const errors = { ...this.state.errors, postcode: '' }
    this.setState({ formData, errors }, () => {
      this.getLocation()
      this.assignAvatar()
    })
  }

  // * Function to check whether postcode exists in postcode API 
  getLocation = async () => {
    try {
      const postcode = this.state.formData.postcode
      await getPostcodeInfo(postcode)
    } catch (err) {
      const errors = { ...this.state.errors, postcode: err.response.data.error }
      this.setState({ errors })
    }
  }

  //* Randomly assign the user an avatar profile picture 
  assignAvatar = () => {
    const avatar = avatarArr[Math.floor(Math.random() * avatarArr.length)]
    const formData = { ...this.state.formData, profilePic: avatar }
    this.setState({ formData })
  }

  //* handleSubmit event for submitting the registration form
  handleSubmit = async event => {
    event.preventDefault()
    try {
      await registerUser(this.state.formData)
      this.props.history.push('/login')
    } catch (err) {
      this.setState({ errors: err.response.data })
    }
  }

  render() {

    return (
      <>
          <RegisterForm
            handlePostcodeChange={this.handlePostcodeChange}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            errors={this.state.errors}
            {...this.state.formData}
          />
      </>
    )
  }
}

export default Register