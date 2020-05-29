import React from 'react'
import { addClothes } from '../../lib/api'

import ClothesForm from './ClothesForm'

class ClothesAdd extends React.Component {
  state = {
    formData: {
      title: '',
      category: '',
      brand: '',
      genderCategory: '',
      size: '',
      color: [''],
      rentalPrice: '',
      image: ['']
    },
    errors: {}
  }

  //handleChange event for inputting values on form 
  handleChange = event => {
    const formData = { ...this.state.formData, [event.target.name]: event.target.value }
    const errors = { ...this.state.errors, [event.target.name]: '' }
    this.setState({ formData, errors })
  }

  //handle Multi change to deal with selecting different colours
  handleMultiChange = selected => {
    const selectedItems = selected ? selected.map(item => item.value) : []
    const formData = { ...this.state.formData, color: selectedItems }
    const errors = { ...this.state.errors, color: '' }
    this.setState({ formData, errors })
  }

  // function to allow user to upload multiple images or links to the clothing item
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


  // submits the add clothes form 
  handleSubmit = async event => {
    event.preventDefault()
    try {
      const res = await addClothes(this.state.formData)
      this.props.history.push(`/clothes/${res.data._id}`)
    } catch (err) {
      this.setState({ errors: err.response.data })
      console.log(err.response);
    }

  }

  render() {
    return (
      <>
        <div className="Page-head">
          <div className="Page-title">
            <h1>Add Clothes</h1>
          </div>
          <ClothesForm
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
      </>
    )
  }
}

export default ClothesAdd