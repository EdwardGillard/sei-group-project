import React from 'react'

import { editPost, getSinglePost } from '../../lib/api'

class PostEdit extends React.Component {
  state = {
    dataInput: {
      title: '',
      text: '',
      photo: ''
    }
  }

  async componentDidMount() {
    const id = this.props.match.params.id
    try {
      const res = await getSinglePost(id)
      this.setState({ dataInput: res.data })
    } catch (err) {
      this.props.history.push('/notfound')
    }
  }

  handleChange = e => {
    const dataInput = { ...this.state.dataInput, [e.target.name]: e.target.value }
    this.setState({ dataInput })
  }

  handleSubmit = async e => {
    e.preventDefault()
    try {
      const id = this.state.dataInput._id
      const res = await editPost(id, this.state.dataInput)
      this.props.history.push(`/posts/${res.data._id}`)
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <div className="Posts-edit">
        <form className="Post-edit-form"
          onSubmit={this.handleSubmit} >
          <h3>Edit your post</h3>
          <input className="Post-input-edit"
            name="title"
            value={this.state.dataInput.title}
            placeholder="Title"
            onChange={this.handleChange}
          />
          <textarea className="Post-input-edit"
            name="text"
            rows="15"
            value={this.state.dataInput.text}
            placeholder="Text"
            onChange={this.handleChange}
          />
          <input className="Post-input-edit"
            name="photo"
            value={this.state.dataInput.photo}
            placeholder="URL of Image"
            onChange={this.handleChange}
          />
          <button className="Button">Submit Post</button>
        </form>
      </div>
    )
  }
}

export default PostEdit