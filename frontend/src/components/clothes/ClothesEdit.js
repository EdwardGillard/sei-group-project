import React from 'react'
import { singleCloth, editCloth } from '../../lib/api'
import ClothesEditForm from './ClothesEditForm'
import { toast } from '../../lib/notifications'

class ClothesEdit extends React.Component {
  state = {
    formData: {
      title: '',
      category: '',
      brand: '',
      genderCategory: '',
      size: '',
      color: [''],
      rentalPrice: '',
      image: []
    },
    errors: {}
  }

  async componentDidMount() {
    try {
      const clothId = this.props.match.params.id
      const res = await singleCloth(clothId)
      this.setState({ formData: res.data })
    } catch (err) {
      this.props.history.push('/notfound')
    }
  }

  //* HandleChange event for inputting values on form 
  handleChange = event => {
    const formData = { ...this.state.formData, [event.target.name]: event.target.value }
    const errors = { ...this.state.errors, [event.target.name]: '' }
    this.setState({ formData, errors })
  }

  //* Handle Multi change to deal with selecting different colours
  handleMultiChange = selected => {
    const selectedItems = selected ? selected.map(item => item.value) : []
    const formData = { ...this.state.formData, color: selectedItems }
    const errors = { ...this.state.errors, color: '' }
    this.setState({ formData, errors })
  }

  //* function to allow user to upload multiple images or links to the clothing item
  handleAddImage = () => {
    const formData = { ...this.state.formData, image: [...this.state.formData.image, ''] }
    const errors = { ...this.state.errors, image: '' }
    this.setState({ formData, errors })
  }

  handleImageChange = (event, i) => {
    const images = [...this.state.formData.image]
    const newImages = images.map((image, index) => {
      if (i === index) return event.target.value
      return image
    })
    const formData = { ...this.state.formData, image: newImages }
    const errors = { ...this.state.errors, image: '' }
    this.setState({ formData, errors })
  }


  //* Submits the add clothes form 
  handleSubmit = async event => {
    const clothId = this.props.match.params.id
    event.preventDefault()
    try {
      const res = await editCloth(clothId, this.state.formData)
      toast(`You edited '${this.state.formData.title}'`)
      this.props.history.push(`/clothes/${res.data._id}`)
    } catch (err) {
      this.setState({ errors: err.response.data })
    }
  }

  render() {
    if (!this.state.formData) return null

    return (
      <div className="Page-head-edit-form">
        <div className="Page-title-edit-form">
          <h1>Edit {this.state.formData.title}</h1>
        </div>
        <ClothesEditForm
          onChange={this.handleImageChange}
          onClick={this.handleAddImage}
          handleChange={this.handleChange}
          handleMultiChange={this.handleMultiChange}
          handleSubmit={this.handleSubmit}
          formData={this.state.formData}
          errors={this.state.errors}
          name="image"
        />
      </div>
    )
  }
}

export default ClothesEdit
