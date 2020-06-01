import React from 'react'
import { Link } from 'react-router-dom'

const RegisterForm = ({ handlePostcodeChange, handleChange, handleSubmit, username, email, postcode, password, passwordConfirmation, errors }) => {

  return (
    <div>
      <div className="Registration-title">
        <h1>REGISTER</h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="box-reg"
      >
        <p>Already have an Account? <Link to="/login">Login Here</Link></p>
        <div className="field">
          <label className="label">Username</label>
          <div className="control">
            <input
              className={`input ${errors.username ? 'is-danger' : ''}`}
              type="text"
              placeholder="Enter Username here"
              name="username"
              value={username}
              onChange={handleChange}
            />
          </div>
          {errors.username && <small className="help is-danger">{errors.username}</small>}
        </div>
        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input
              className={`input ${errors.email ? 'is-danger' : ''}`}
              type="text"
              placeholder="Enter email here"
              name="email"
              value={email}
              onChange={handleChange}
            />
          </div>
          {errors.email && <small className="help is-danger">{errors.email}</small>}
        </div>
        <div className="field">
          <label className="label">Postcode</label>
          <div className="control">
            <input
              className={`input ${errors.postcode ? 'is-danger' : ''}`}
              type="text"
              placeholder="Please add your postcode"
              name="postcode"
              value={postcode}
              onChange={handlePostcodeChange}
            />
          </div>
          {errors.postcode && <small className="help is-danger">{errors.postcode}</small>}
        </div>
        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input
              className={`input ${errors.password ? 'is-danger' : ''}`}
              type="password"
              placeholder="Enter password here"
              name="password"
              value={password}
              onChange={handleChange}
            />
          </div>
          {errors.password && <small className="help is-danger">{errors.password}</small>}
        </div>
        <div className="field">
          <label className="label">Confirm Password</label>
          <div className="control">
            <input
              className={`input ${errors.passwordConfirmation ? 'is-danger' : ''}`}
              type="password"
              placeholder="Confirm password here"
              name="passwordConfirmation"
              value={passwordConfirmation}
              onChange={handleChange}
            />
          </div>
          {errors.passwordConfirmation && <small className="help is-danger">{errors.passwordConfirmation}</small>}
        </div>
        <div className="field">
          <button type="submit" className="button is-warning is-medium is-light">Register</button>
        </div>
      </form>
    </div>
  )
}

export default RegisterForm