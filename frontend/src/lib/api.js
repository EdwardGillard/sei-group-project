import axios from 'axios'

import { getToken } from './auth'
const kebb_url = '/api'
//* function to add the headers to the secure routes 
const withHeaders = () => {
  return {
    headers: { Authorization: `Bearer ${getToken()}` }
  }
}

//---------------------------------- CLOTHING REQUESTS --------------------------------------


// * Function to get all clothing Items
export const showAllClothes = () => {
  return axios.get(`${kebb_url}/clothes`)
}

//* user POST clothes article function
export const addClothes = formData => {
  return axios.post(`${kebb_url}/clothes`, formData, withHeaders())
}

//* DELETE item of clothing
export const deleteCloth = id => {
  return axios.delete(`${kebb_url}/clothes/${id}`, withHeaders())
}

// * Function to get single clothing item
export const singleCloth = id => {
  return axios.get(`${kebb_url}/clothes/${id}`)
}

//* Function to edit clothing item
export const editCloth = (id, data) => {
  return axios.put(`${kebb_url}/clothes/${id}`, data, withHeaders())
}

//* comment on single clothing item
export const addCommentCloth = (id, data) => {
  return axios.post(`${kebb_url}/clothes/${id}/comments`, data, withHeaders())
}

//* delete comment on single clothing item
export const deleteCommentCloth = (clothesid, commentid) => {
  return axios.delete(`${kebb_url}/clothes/${commentid}/comments/${clothesid}`, withHeaders())
}


//------------------------------------USER REQUESTS--------------------------------------------


// * login user POST function
export const loginUser = formData => {
  return axios.post(`${kebb_url}/login`, formData)
}

// * REGISTER user POST function
export const registerUser = formData => {
  return axios.post(`${kebb_url}/register`, formData)
}

//* GET user for PROFILE page 
export const getProfile = () => {
  return axios.get(`${kebb_url}/profile`, withHeaders())
}

//* PUT request to edit user PROFILE Page
export const editProfile = user => {
  return axios.put(`${kebb_url}/profile`, user, withHeaders())
}

//* DELETE request to delete user profile
export const deleteProfile = () => {
  return axios.delete(`${kebb_url}/deleteUser`, withHeaders())
}

// * GET to show specific user (no need to be logged in)
export const getUserProfile = username => {
  return axios.get(`${kebb_url}/profile/${username}`)
}


//------------------------------------PIN REQUESTS--------------------------------------------


//* POST for user to add pin to their map 
export const postPin = formData => {
  return axios.post(`${kebb_url}/pins`, formData, withHeaders())
}

//* DELETE for user to remove pin from their map.
export const removePin = id => {
  return axios.delete(`${kebb_url}/pins/${id}`, withHeaders())
}


//------------------------------------FAVOURITES REQUESTS--------------------------------------------


// * GET all users favourites
export const allUsersFavourites = () => {
  return axios.get(`${kebb_url}/favourites`, withHeaders())
}

// * POST Favourites to users favourite
export const postFavorite = data => {
  return axios.post(`${kebb_url}/favourites/article`, data, withHeaders())
}

//* DELETE Favourites from articleFavs
export const deleteArticleFromFavs = id => {
  return axios.delete(`${kebb_url}/favourites/article/${id}`, withHeaders())
}

// * POST user to Friends favourite
export const postFavoriteFriend = data => {
  return axios.post(`${kebb_url}/favourites/friends`, data, withHeaders())
}

//* DELETE user fav
export const deleteFriend = id => {
  return axios.delete(`${kebb_url}/favourite/friend/${id}`, withHeaders())
}

// * POST post to users favourites
export const postFavoritePost = data => {
  return axios.post(`${kebb_url}/favourites/posts`, data, withHeaders())
}

//* DELETE post from users favs
export const deletePostFromFavs = id => {
  return axios.delete(`${kebb_url}/favourites/posts/${id}`, withHeaders())
}


//------------------------------------COMMENT REQUESTS--------------------------------------------


//*POST comment on USER
export const commentOnUser = (id, data) => {
  return axios.post(`${kebb_url}/profile/comments/${id}`, data, withHeaders())
}

//* DELETE Comment on USER
export const DeleteCommentOnUser = (id, commentid) => {
  return axios.delete(`${kebb_url}/profile/${id}/comments/${commentid}`, withHeaders())
}


//------------------------------------POSTS--------------------------------------------


//* Get all POSTS
export const getAllPosts = () => {
  return axios.get(`${kebb_url}/posts`)
}

//* Create a POST
export const createPost = data => {
  return axios.post(`${kebb_url}/posts`, data, withHeaders())
}

//* Get single POST
export const getSinglePost = id => {
  return axios.get(`${kebb_url}/posts/${id}`)
}

//* Edit a post
export const editPost = (id, data) => {
  return axios.put(`${kebb_url}/posts/${id}`, data, withHeaders())
}

//* Delete a post
export const deleteAPost = id => {
  return axios.delete(`${kebb_url}/posts/${id}`, withHeaders())
}

//* Comment on a post
export const commentOnPost = (id, data) => {
  return axios.post(`${kebb_url}/posts/${id}/comments`, data, withHeaders())
}

//* Delete Comment on post
export const DeleteCommentOnPost = (id, commentid) => {
  return axios.delete(`${kebb_url}/posts/${id}/comments/${commentid}`, withHeaders())
}


//------------------------------------MESSAGES--------------------------------------------


// * Send message to user on Show page
export const sendMessage = (id, message) => {
  return axios.post(`${kebb_url}/${id}/messages`, message, withHeaders())
}

// * Function for inbox messages
export const inboxMessage = () => {
  return axios.get(`${kebb_url}/profile/messages/received`, withHeaders())
}

// * Function to reply to messages
export const replyMessage = (id, message) => {
  return axios.post(`${kebb_url}/messages/${id}`, message, withHeaders())
}


//------------------------------------RATINGS--------------------------------------------


// * Rate a user
export const rateUser = (id, rating) => {
  return axios.post(`${kebb_url}/profile/${id}/rating`, rating, withHeaders())
}

//* Rate clothes
export const rateClothes = (id, rating) => {
  return axios.post(`${kebb_url}/clothes/${id}/rating`, rating, withHeaders())
}