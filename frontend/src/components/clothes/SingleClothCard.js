import React from 'react'

import { Slide } from 'react-slideshow-image'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../../lib/auth'

import Comments from '../common/Comments'
import StarRating from '../common/StarRating'

// * Properties of slide tag
const properties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  arrows: true,
  pauseOnHover: true,
  onChange: (oldIndex, newIndex) => {
  }
}


const SingleClothCard = ({ deleteComment, rentalPrice, handleContactSubmit, handleContactChange, contactModalOpen, toggleContact, commentsArray, title, clothId, profilePic, username, images, image, onFirstClick, onSecondClick, onClick, handleCommentSubmit, handleCommentChange, rating, commentText, brand, color, category, genderCategory, size, createdArticles }) => {
  const slideImages = [image[0], image[1], image[2]]
  const userName = username.charAt(0).toUpperCase() + username.slice(1)
  return (
    <>
      <section className="section">
        <div className="slide-container">
          <Slide {...properties}>
            <div className="each-slide">
              <div style={{ 'backgroundImage': `url(${slideImages[0]})` }}>
                <span></span>
              </div>
            </div>
            <div className="each-slide">
              <div style={{ 'backgroundImage': `url(${slideImages[1]})` }}>
                <span></span>
              </div>
            </div>
            <div className="each-slide">
              <div style={{ 'backgroundImage': `url(${slideImages[2]})` }}>
                <span></span>
              </div>
            </div>
          </Slide>
        </div>

        {isAuthenticated() && <button name="item" value={clothId} onClick={onClick} className="fav-item-Button">Add to Favourites</button>}
        <br />
        {isAuthenticated() && <form onSubmit={handleCommentSubmit}>
          <div>
            <div className="label for comments">
              <p> Add a comment on {title} </p>
            </div>
            <textarea
              className="textarea is-small is-info"
              type="textArea"
              maxLength="250"
              name="text"
              onChange={handleCommentChange}
              value={commentText}
              placeholder="Add your comment"
            ></textarea>
          </div>
          <br />
          <div>
            <button className="fav-item-Button">Submit Comment</button>
          </div>
        </form>}
        <div>
          {commentsArray.map(comment => (
            <Comments
              key={comment._id}
              comment={comment}
              deleteComment={deleteComment}
            />
          ))}
        </div>
      </section>
      <section className="section">
        <Link to={`/page/${username}`}>
          <div className="container">
            <figure className="media-left">
              <p className="image is-64x64">
                <img src={profilePic} alt={username} />
              </p>
            </figure>
            <p><strong>{userName}</strong></p>
          </div>
        </Link>
        <StarRating
          rating={rating}
          editing={false}
        />
        <div>
          <hr />
          <p><strong>Brand: </strong> {brand}</p>
          <p><strong>{category}: </strong> {genderCategory}</p>
          <p><strong>Color:</strong> {color.map(col => <span>{col}, </span>)}</p>
          <p><strong>Size: </strong> {size}</p>
          <p><strong>Rental price: </strong> £{rentalPrice}</p>
        </div>
        <hr />
        <div className="show-buttons">
          {!isAuthenticated() ? <div className="columns">
            <Link to="/login">SIGN IN</Link>
            <p className="or"> OR </p>
            <Link to="/register">JOIN KEBB</Link>
          </div> : <button onClick={toggleContact} className="fav-item-Button">CONTACT USER</button>}
        </div>
        <div className={contactModalOpen ? "modal is-active" : "modal"}>
          <div className="field">
            <form onSubmit={handleContactSubmit}>
              <div className="control">
                <textarea name="text" onChange={handleContactChange} className="textarea is-medium is-primary" placeholder="Message..."></textarea>
              </div>
              <button className="fav-item-Button">SEND</button>
            </form>
          </div>
        </div>
        <hr />
        <p>Other items posted by {userName}</p> <br />
        <div className="Other-items-index">
          {createdArticles.map(art => (
            <a href={`/clothes/${art._id}`}>
              <div className="My-items-card">
                <div className="img">
                  <img src={art.image[0]} alt={art.title} loading="lazy" width="255" height="255" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>
    </>
  )
}

export default SingleClothCard