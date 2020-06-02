import React from 'react'

import { showAllClothes } from '../../lib/api'
import ClothCard from './ClothCard'
import ClothesFilter from './ClothesFilter'

class ClothesIndex extends React.Component {
  state = {
    clothes: null,
    filteredClothes: null,
    filteredCategories: null,
    searchClothes: '',
    filteredItemsToDisplay: [],
  }

  //* Function to GET all clothes and get data for filter functions
  async componentDidMount() {
    try {
      const res = await showAllClothes()
      const category = res.data.map((cat) => cat.category)
      const filteredCategory = category.filter(
        (cat, index) => category.indexOf(cat) === index
      )
      const color = res.data.map((col) => col.color)
      const colorArray = color.reduce((acc, col) => {
        return acc.concat(col)
      }, [])
      const filteredColor = colorArray.filter(
        (col, index) => colorArray.indexOf(col) === index
      )
      const gender = res.data.map((gen) => gen.genderCategory)
      const filteredGender = gender.filter(
        (gen, index) => gender.indexOf(gen) === index
      )
      const sizes = res.data.map((size) => size.size)
      const filteredSize = sizes.filter(
        (size, index) => sizes.indexOf(size) === index
      )
      this.setState({
        clothes: res.data,
        filteredClothes: res.data,
        categories: filteredCategory,
        colors: filteredColor,
        genders: filteredGender,
        sizes: filteredSize,
        filteredCategories: filteredCategory,
      })
    } catch (err) {
      this.props.history.push('/notfound')
    }
  }

  // * Function to handle search box input - user can search by category, title and username
  handleChange = (event) => {
    const { clothes } = this.state
    const searchClothes = event.target.value
    const filteredClothes = clothes.filter((cloth) => {
      const regex = RegExp(searchClothes, 'i')
      return (
        cloth.category.match(regex) ||
        cloth.title.match(regex) ||
        cloth.user.username.match(regex)
      )
    })
    this.setState({ searchClothes, filteredClothes })
  }
  // * Function to allow user to filter clothing items
  handleFilter = (e, field) => {
    this.setState({ [field]: e.value }, this.getFilteredItems)
  }
  getFilteredItems = () => {
    const {
      category,
      color,
      gender,
      size,
      clothes,
    } = this.state
    const resultOfFilteredItemsToDisplay = clothes.filter((item) => {
      if (!category && !color && !gender && !size) {
        return true
      }
      const categoryFilter = category ? item.category.includes(category) : true
      const colorFilter = color ? item.color.includes(color) : true
      const genderFilter = gender ? item.genderCategory.includes(gender) : true
      const sizeFilter = size ? item.size.includes(size) : true
      return categoryFilter && colorFilter && genderFilter && sizeFilter
    })
    this.setState({ filteredItemsToDisplay: resultOfFilteredItemsToDisplay })
  }
  // * Function to change each filter
  filterChange = (event) => {
    const { filteredClothes } = this.state
    const showFilter = event.target.value
    if (filteredClothes.length > 0) {
      const filteredCats = filteredClothes.filter((cloth) => {
        const regex = RegExp(showFilter, 'i')
        return (
          cloth.category.match(regex) ||
          cloth.color[0].match(regex) ||
          cloth.genderCategory.match(regex) ||
          cloth.size.match(regex)
        )
      })
      this.setState({ filteredClothes: filteredCats })
    } else {
      return 'unavailable'
    }
  }
  // * Function to reset filter
  resetFilter = () => {
    this.setState({
      filteredItemsToDisplay: '',
      filteredClothes: this.state.clothes,
      category: '',
      color: '',
      gender: '',
      size: '',
      searchClothes: ''
    })
  }
  render() {
    if (!this.state.filteredClothes)
      return <h1>Some Ninjas are working on this</h1>
    const {
      filteredClothes,
      colors,
      categories,
      genders,
      searchClothes,
      sizes,
      filteredItemsToDisplay,
      color,
      size,
      gender,
      category,
    } = this.state
    const anyFilterSet = color || gender || category || size
    // * Variable of category options
    const categoryOption = categories.map((cat) => {
      return { value: cat, label: cat }
    })
    // * Variable of color options
    const colorOption = colors.map((col) => {
      return { value: col, label: col }
    })
    // * Variable of Gender options
    const genderOption = genders.map((gen) => {
      return { value: gen, label: gen }
    })
    // * Variable of Size options
    const sizeOption = sizes.sort((a, b) => a - b).map((size) => {
      return { value: size, label: size }
    })
    return (
      <div>
        <div className="Clothes-Index-Header Main-Page-Index-Header">
          <div className="Page-head">
            <div className="Page-title ">
              <h1>CLOTHES</h1>
            </div>
          </div>
        </div>
        <div className="Main-Content-Index">
          <div className="Latest-filter">
            <div className="Clothes-filter-all">
              <ClothesFilter
                category={categoryOption}
                categoryValue={this.state.category || ''}
                colorValue={this.state.color || ''}
                genderValue={this.state.gender || ''}
                sizeValue={this.state.size || ''}
                color={colorOption}
                gender={genderOption}
                sizes={sizeOption}
                handleCategoryFilter={(e) => this.handleFilter(e, 'category')}
                handleColorFilter={(e) => this.handleFilter(e, 'color')}
                handleGenderFilter={(e) => this.handleFilter(e, 'gender')}
                handleSizeFilter={(e) => this.handleFilter(e, 'size')}
              />
              <form>
                <input
                  className="input"
                  type="text"
                  placeholder="Category, Name and User"
                  value={searchClothes || ''}
                  onChange={this.handleChange}
                />
              </form>
              <div className="reset-button">
                <button onClick={this.resetFilter} className="Button reset-button">Reset Filter</button>
              </div>
            </div>
          </div>
          <br />
          <div className="Clothes-index">
            {filteredItemsToDisplay.length > 0 ? (
              filteredItemsToDisplay.sort((a, b) => a.rentalPrice - b.rentalPrice).map((cloth) => (
                <ClothCard {...cloth} key={cloth._id} />
              ))
            ) : anyFilterSet ? (
              <p>No items found with your filters</p>
            ) : (
                  filteredClothes.sort((a, b) => a.rentalPrice - b.rentalPrice).map((cloth) => (
                    <ClothCard {...cloth} key={cloth._id} />
                  ))
                )}
          </div>
        </div >
      </div>
    )
  }
}
export default ClothesIndex