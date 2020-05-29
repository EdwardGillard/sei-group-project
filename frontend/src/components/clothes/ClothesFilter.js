import React from 'react'
import Select from 'react-select'

const ClothesFilter = ({
  color,
  category,
  gender,
  sizes,
  handleCategoryFilter,
  handleSizeFilter,
  handleGenderFilter,
  handleColorFilter,
  categoryValue,
  colorValue,
  sizeValue,
  genderValue
}) => {
  return (
    <>
        <Select className="Clothes-select"
          options={category}
          placeholder={"Category"}
          onChange={handleCategoryFilter}
          name="category"
          value={categoryValue ? {label: categoryValue, value: categoryValue} : null}
        />
        <Select className="Clothes-select"
          options={color}
          placeholder={"Color"}
          onChange={handleColorFilter}
          value={colorValue ? {label: colorValue, value: colorValue} : null}
        />
        <Select className="Clothes-select"
          options={gender}
          placeholder={"Gender"}
          onChange={handleGenderFilter}
          value={genderValue ? {label: genderValue, value: genderValue} : null}
        />
        <Select className="Clothes-select"
          options={sizes}
          placeholder={"Size"}
          onChange={handleSizeFilter}
          value={sizeValue ? {label: sizeValue, value: sizeValue} : null}
        />
    </>
  )
}
export default ClothesFilter