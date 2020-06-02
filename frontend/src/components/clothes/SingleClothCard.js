import React from 'react'

import { Slide } from 'react-slideshow-image'
import { Link } from 'react-router-dom'
import { isAuthenticated, isOwner } from '../../lib/auth'

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


const SingleClothCard = ({ deleteComment, rentalPrice, handleContactSubmit, handleContactChange, contactModalOpen, toggleContact, commentsArray, title, clothId, profilePic, images, username, image, onClick, handleCommentSubmit, handleCommentChange, rating, commentText, brand, color, category, genderCategory, size, createdArticles, articleRating, onStarClick, userid, val, message }) => {
  let slideImages = [image[0], image[1]]
  const userName = username.charAt(0).toUpperCase() + username.slice(1)
  return (
    <div className="show-master-div">
      <div className="show-left-column">
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
          </Slide>
        </div>
        <div className="hidden-image">
          <img src={image[0]} alt={title} />
        </div>
        <hr />
        <div className="show-comments-div">
          <div className="show-comments-input">
            {isAuthenticated() && <form onSubmit={handleCommentSubmit}>
                <textarea
                  type="textArea"
                  maxLength="150"
                  rows="6"
                  name="text"
                  onChange={handleCommentChange}
                  value={commentText}
                  placeholder="Add your comment"
                ></textarea>
              <br />
              <div>
                <button className="fav-item-Button">Submit Comment</button>
              </div>
            </form>}
          </div>
          <div className="comments-box-show">
              {commentsArray.map(comment => (
                <Comments
                  key={comment._id}
                  comment={comment}
                  deleteComment={deleteComment}
                />
              ))}
          </div>
        </div>
      </div>
      <div className="show-right-column">
        <div className="show-article-title">
          <h1>{title}</h1>
        </div>
        {isAuthenticated() && !isOwner(userid) && <div className="Show-rating-div">
          <p>Rate {title}:</p>
          <StarRating
            rating={val}
            onStarClick={onStarClick}
            editing={true}
          />
        </div>}
        <hr />
        <div className="show-main-content">
          <hr />
          <div className="right-hand-show-content">
            <div className="show-page-content">
              <p><strong>Brand: </strong> {brand}</p>
              <p><strong>{category}: </strong> {genderCategory}</p>
              <p><strong>Color:</strong> {color.map(col => <span>{col}, </span>)}</p>
              <p><strong>Size: </strong> {size}</p>
              <p><strong>Rental price: </strong> £{rentalPrice}</p>
              <StarRating
                rating={articleRating}
                editing={false}
              />
            </div>
            <div className="add-to-favs-but move-button">
              {isAuthenticated() && <button name="item" value={clothId} onClick={onClick} className="fav-item-Button add-to-favs-but">Add to Favourites</button>}
            </div>
          </div>
          <div className="show-page-user-content">
            <Link to={`/page/${username}`}>
              <div className="user-info-show">
                <img src={profilePic} alt={username} />
                <p><strong>{userName}</strong></p>
                <StarRating
                  rating={rating}
                  editing={false}
                />
              </div>
            </Link>
            <div className="show-buttons">
              {!isAuthenticated() &&
                <div className="columns">
                  <Link to="/login"><button className="Tiny-Buttons-Show"> Log In</button></Link>
                  <Link to="/register"><button className="Tiny-Buttons-Show">Join KEBB</button></Link>
                </div>}
              {!isOwner(userid) && isAuthenticated() && <button onClick={toggleContact} className="fav-item-Button">Contact user</button>}
            </div>
          </div>
        </div>
        <div className={contactModalOpen ? "modal is-active" : "modal"}>
          <div className="field">
            <form onSubmit={handleContactSubmit}>
              <div className="control">
                <textarea name="text" value={message} onChange={handleContactChange} className="textarea is-medium is-primary" placeholder="Message..."></textarea>
              </div>
              <button className="fav-item-Button">SEND</button>
            </form>
          </div>
        </div>
        <hr />
        <p>{userName}'s other clothes</p> <br />
        <div className="Other-items-index">
          {createdArticles.map(art => (
            <a key={art._id} href={`/clothes/${art._id}`}>
              <div className="My-items-card">
                <div className="img">
                  <img src={art.image[0]} alt={art.title} loading="lazy" width="255" height="255" />
                </div>
              </div>
            </a>
          ))}
        </div>
        <hr />
        <div className="show-comments-div all-comments-show">
          <div className="show-comments-input comment-form-show">
            {isAuthenticated() && <form onSubmit={handleCommentSubmit}>
                <textarea
                  type="textArea"
                  maxLength="150"
                  rows="6"
                  name="text"
                  onChange={handleCommentChange}
                  value={commentText}
                  placeholder="Add your comment"
                ></textarea>
              <br />
              <div>
                <button className="fav-item-Button">Submit Comment</button>
              </div>
            </form>}
          </div>
          <div className="comments-box-show">
              {commentsArray.map(comment => (
                <Comments
                  key={comment._id}
                  comment={comment}
                  deleteComment={deleteComment}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleClothCard