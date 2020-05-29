import React from 'react'

import { Link } from 'react-router-dom'

const UserClothCard = ({ _id, title, image}) => {
  return (
    <Link to={`/clothes/${_id}`}>
      <div className="My-items-card">
        <div className="img">
          <img src={image[0]} alt={title} loading="lazy" width="255" height="255" />
        </div>
        <div className="Card-text">
          <p className="Title">{title}</p>
        </div>
      </div>
    </Link>
  )
}

export default UserClothCard