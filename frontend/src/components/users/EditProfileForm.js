import React from 'react'

const EditProfileForm = ({ onPostcodeChange, onChange, onSubmit, username, postcode, password, passwordConfirmation, errors }) => {

  return (
    <div className="edit-profile-form">
      <section className="section">
        <div className="container">
          <div className="columns">
            <form onSubmit={onSubmit}>
              <div className="field" >
                <label className="label">Username</label>
                <div className="control">
                  <input
                    className={`input ${errors.username ? 'is-danger' : ''}`}
                    type="text"
                    placeholder="Update Username here"
                    name="username"
                    value={username}
                    onChange={onChange}
                  />
                </div>
              </div>
              <div className="field" >
                <label className="label">Postcode</label>
                <div className="control">
                  <input
                    className={`input ${errors.postcode ? 'is-danger' : ''}`}
                    type="text"
                    placeholder="Update Postcode here"
                    name="postcode"
                    value={postcode}
                    onChange={onPostcodeChange}
                  />
                </div>
              </div>
              <div className="field">
                <button type="submit"
                  className="fav-item-Button">
                  Update Profile Information
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default EditProfileForm