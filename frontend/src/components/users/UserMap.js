import React from 'react'

import Map from './Map'
import PinForm from '../pins/PinForm'

import { postPin, getProfile, removePin } from '../../lib/api'

import 'mapbox-gl/dist/mapbox-gl.css'
import { toast } from '../../lib/notifications'

class UserMap extends React.Component {
  state = {
    user: null,
    formData: {
      title: '',
      place: '',
      note: ''
    },
    modalOpen: false,
    errors: {}
  }

  // * Function to GET the users details
  async componentDidMount() {
    try {
      await this.loadMap()
    } catch (err) {
      this.props.history.push('/notfound')
    }
  }

  //* Load the map outside of CDM to allow to recall.
  loadMap = async () => {
    try {
      const res = await getProfile()
      this.setState({ user: res.data })
    } catch (err) {
      this.props.history.push('/notfound')
    }
  }

  //* add a location
  addLocation = (latitude, longitude) => {
    this.setState(prevState => ({
      formData: {
        ...prevState.formData,
        latitude: latitude,
        longitude: longitude
      }
    }))
  }

  //* Function for written input in the pin form
  handleChange = event => {
    const formData = { ...this.state.formData, [event.target.name]: event.target.value }
    const errors = { ...this.state.errors, [event.target.name]: '' }
    this.setState({ formData, errors })
  }

  //* Function to toggle the modal pin form open or close when user drops pin
  toggleModal = () => {
    this.setState({ modalOpen: !this.state.modalOpen })
  }

  //* HandleSubmit event for submitting the registration form
  handleSubmit = async event => {
    event.preventDefault()
    try {
      await postPin(this.state.formData)
      this.loadMap()
      this.toggleModal()
      this.setState({ formData: { ...this.state.formData, title: '', place: '', note: '' } })
    } catch (err) {
      this.setState({ errors: err.response.data })
    }
  }

  //* HandleDelete on the pin
  deletePin = async id => {
    try {
      await removePin(id)
      this.loadMap()
      toast('Pin removed')
    } catch (err) {
      toast('Couldnt remove pin')
    }
  }

  numberOfPins = () => {
    return this.state.user.pins.length
  }

  render() {
    if (!this.state.user) return null

    return (
      <>
        <div className="Map-page">
          <div className="Page-head">
            <div className="Page-title">
              <h1>SAVED PINS</h1>
            </div>
            <div className="Page-subtitle">
              <h2>Add & save locations to remember later</h2>
            </div>
          </div>
          <div className="pin-details">
            {/* Map for user to view locations & drop pins */}
            <div className="map-page">
              <div className="Map">
                <Map
                  onChange={this.handleChange}
                  onClick={this.toggleModal}
                  pins={this.state.user.pins}
                  location={this.addLocation}
                  onClickDelete={this.deletePin}
                  name="location" />
              </div>
              {/* PinForm will pop up if a user decides to drop a pin on thr map */}
              <PinForm
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                toggleModal={this.toggleModal}
                errors={this.state.errors}
                numberOfPins={this.numberOfPins}
                modalStatus={this.state.modalOpen}
                form={this.state.formData}
              />
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default UserMap

