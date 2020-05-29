import React from 'react'

const MessageCard = ({ user, owner, text, createdAt, reply, _id, sendReply, replyModal, replyChange, response }) => {
  const edited = createdAt.split('T')
  const date = edited[0]
  const time = edited[1].split('.')[0]
  const personOne = user.username.charAt(0).toUpperCase() + user.username.slice(1)
  const personTwo = owner.username.charAt(0).toUpperCase() + owner.username.slice(1)

  return (
    <>
      <div>
        <div className="Message">
          <div className="Message-top">
            <img src={user.profilePic} alt={user.username} />
            <div className="Message-top-right">
              <h4><a href={`/page/${user.username}`}>{personOne}</a> - <a href={`/page/${owner.username}`}>{personTwo}</a></h4>
            </div>
            <img src={owner.profilePic} alt={owner.username} />
          </div>
          <div className="Message-text">
            <h5><strong>{personOne}</strong>: {date} {time}</h5>
            <p>{text}</p>
          </div>
          <div className="Message-reply">
            {response.map((res, i) =>
              <div key={i}>
                <h5><strong>{res.user.username.charAt(0).toUpperCase() + res.user.username.slice(1)}</strong>: {date} {time}</h5>
                <p>{res.text}</p>
                <div className="Message-content">
                </div>
              </div>)}
            <button value={_id} onClick={reply} className="Tiny-Buttons">Reply</button>
          </div>
        </div>
        <div className="Message-reply-delete">
          <div className={replyModal ? "modal is-active" : "modal"}>
            <div className="field">
              <form onSubmit={sendReply}>
                <div className="control">
                  <textarea
                    onChange={replyChange}
                    name="text"
                    className="textarea is-medium is-primary"
                    placeholder="Message..."></textarea>
                </div>
                <button className="button is-info">SEND</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MessageCard