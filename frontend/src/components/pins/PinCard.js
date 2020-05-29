import React from 'react'

const PinCard = (props) => {
  if (!props.info) return null

  const { title, place, note, createdAt } = props.info
  const { deletePin } = props

  return (
    <div className="pincard">
      <h1 className="is-size-5"><strong>{title.toUpperCase()}</strong></h1>
      <h2 className="is-size-6">{place.charAt(0).toUpperCase() + place.slice(1)}</h2>
      <p >Notes: {note}</p>
      <p><small>Pin Saved on: {createdAt.slice(0, 10)}</small></p>
      <button
        className="Button"
        onClick={deletePin} >Remove Pin
      </button>
    </div>
  )
}

export default PinCard