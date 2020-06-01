import React from 'react'

import { Link } from 'react-router-dom'

const LoginForm = ({ email, password, handleChange, handleSubmit, errors }) => {
  return (
    <div className="Login-form">
      <div className="Registration-title">
        <h1>Login</h1>
      </div>
      <form
        className="box-two"
        onSubmit={handleSubmit}
      >
        <p>Not signed up yet? <Link to="/register">Register here</Link></p>
        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input
              className={`input ${errors ? 'is-danger' : ''}`}
              type="text"
              placeholder="Enter Username here"
              name="email"
              value={email}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input
              className={`input ${errors ? 'is-danger' : ''}`}
              type="password"
              placeholder="Enter password"
              name="password"
              value={password}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="field">
          <button type="submit" className="button is-warning is-medium is-light">Login</button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm