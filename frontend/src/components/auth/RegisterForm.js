import React from 'react'

const RegisterForm = ({handleChange, handleSubmit, username, email, postcode, password, passwordConfirmation, errors }) => {


  return (
    <>
            <form 
            onSubmit={handleSubmit}
            className="box"
            >
              <div className="field">
                <label className="label">Username</label>
                <div className="control">
                  <input 
                  className={`input ${errors.username ? 'is-danger': '' }`} 
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
                  onChange={handleChange}
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
              <button type="submit" className="button is-fullwidth is-primary">Register</button>
              </div>
            </form>
    </>
  )
}

export default RegisterForm