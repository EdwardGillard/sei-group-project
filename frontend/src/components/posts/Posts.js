import React from 'react'

import PostCards from '../posts/PostsCards'
import { getAllPosts, createPost } from '../../lib/api'
import { toast } from '../../lib/notifications'
import { isAuthenticated } from '../../lib/auth'

class Posts extends React.Component {

  state = {
    posts: null,
    input: {
      title: '',
      text: '',
      photo: ''
    }
  }

  async componentDidMount() {
    try {
      this.pageSetup()
    } catch (err) {
      this.props.history.push('/notfound')
    }
  }

  //* Set up page outside of component did mount so it can be called again.
  pageSetup = async () => {
    try {
      const res = await getAllPosts()
      const postReverse = await res.data.reverse()
      this.setState({ posts: postReverse })
    } catch (err) {
      this.props.history.push('/notfound')
    }
  }

  //* Handles changes on inputs for post
  handleChange = e => {
    const input = { ...this.state.input, [e.target.name]: e.target.value }
    this.setState({ input })
  }

  //* Submit post.
  handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await createPost(this.state.input)
      this.setState({ commentsArray: res.data.comments, input: { ...this.state.input, title: '', text: '', photo: '' } })
      toast('Submitted post!')
      await this.pageSetup()
    } catch (err) {
      toast('Couldnt upload your post')
    }
  }

  render() {
    if (!this.state.posts) return null
    return (
      <div className="Posts-index-Main">
        <div className="Clothes-Index-Header">
          <div className="Page-head">
            <div className="Page-title">
              <h1>POSTS</h1>
            </div>
          </div>
        </div>
        <div className="Posts">
          {isAuthenticated() && <form className="Post-form"
            onSubmit={this.handleSubmit} >
            <h3>Add a post now!</h3>
            <input className="Post-input-title"
              name="title"
              value={this.state.input.title}
              placeholder="Title"
              onChange={this.handleChange}
            />
            <textarea className="Post-input-text"
              name="text"
              rows="15"
              value={this.state.input.text}
              placeholder="Text"
              onChange={this.handleChange}
            />
            <input className="Post-input-title"
              name="photo"
              value={this.state.input.photo}
              placeholder="URL of Image"
              onChange={this.handleChange}
            />
            <button className="Button">Submit Post</button>
          </form>}
          <div className="Post-cards">
            {this.state.posts.map(post => (
              <PostCards
                key={post._id}
                {...post}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }
}
export default Posts