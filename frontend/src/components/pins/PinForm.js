import React from 'react'


const PinForm = ({ modalStatus, handleChange, handleSubmit, toggleModal, errors, form }) => {

  return (
    <div className="pin-form">
      <div
        className={modalStatus ? "modal is-active" : "modal"}
      >
        <div className="modal-background"></div>
        <div className="modal-content is-centered">
          <form
            onSubmit={handleSubmit}
            className="column is-6 is-offset-3"
          >
            <div className="field">
              <label className="label">Title</label>
              <div className="control">
                <input
                  className={`input ${errors.title ? 'is-danger' : ''}`}
                  type="text"
                  placeholder="What was it you found here?"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                />
              </div>
              <small className="help is-light">Title is required</small>
            </div>
            <div className="field">
              <label className="label">Shop Name</label>
              <div className="control">
                <input
                  className={`input ${errors.place ? 'is-danger' : ''}`}
                  type="text"
                  placeholder="Where?"
                  name="place"
                  value={form.place}
                  onChange={handleChange}
                />
              </div>
              <small className="help is-light">Location details are required</small>
            </div>
            <div className="field">
              <label className="label">Notes</label>
              <div className="control">
                <textarea
                  className="textarea"
                  rows="3"
                  type="text"
                  placeholder="Notes"
                  name="note"
                  value={form.note}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="field">
              <button
                className="Button"
                type="submit"
              >Save</button>
            </div>
          </form>
          <button
            className="modal-close is-large"
            onClick={toggleModal}
            aria-label="close">
          </button>
        </div>
      </div>
    </div>
  )
}

export default PinForm