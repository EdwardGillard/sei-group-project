import React from 'react'
import { Link } from 'react-router-dom'

const EditClothCard = ({ _id, title, image, deleteArticle }) => {

  return (
    <div className="My-items-card edit-items-card">
      <div className="img">
        <img src={image[0]} alt={title} loading="lazy" width="255" height="255" />
      </div>
      <div className="Card-text">
        <Link to={`/clothes/${_id}/edit`}
          id={_id}>
          <button className="Tiny-Buttons">Update</button>
        </Link>
        <button
          onClick={() => { if (window.confirm("Are you sure?")) deleteArticle(_id) }}
          className="Tiny-Buttons">Delete</button>
      </div>
    </div>
  )
}

export default EditClothCard