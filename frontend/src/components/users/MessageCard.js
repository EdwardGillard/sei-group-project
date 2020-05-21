import React from 'react'
import { Link } from 'react-router-dom'

const MessageCard = ({ user, text, createdAt, reply, _id, sendReply, replyModal, replyChange, response }) => {
  const edited = createdAt.split('T')
  const date = edited[0]
  const time = edited[1].split('.')[0]
  // const resCreatAt = response.map(res => res.createdAt)
  // const resEdited = resCreatAt.map(res => res.split('T'))
  // const resDate = resEdited.map(res => res[0])
  // const resTime = resEdited.map(res => res[1].split('.')[0])

  return (
    <>
      <div>

        <div className="Message">
          <div className="Message-top">
            <img src={user.profilePic} alt={user.username} />

            <div className="Message-top-right">
              <Link to={`/page/${user.username}`}><h4>From {user.username}</h4></Link>
              <h5>{`${date} at ${time}`}:</h5>
            </div>

          </div>

          <div className="Message-text">
            <p>{text}</p>
            <hr />
          </div>
          <div className="Message-reply">
            {response.map((res, i) =>
              <div key={i}>
                <h5>reply: {res.createdAt.split('T')}</h5>
                <p>{res.text}</p><hr />
              </div>)}
          </div>

        </div>

        <div className="Message-content">
          {response.map((res, i) => <p key={i} >{res.text}</p>)}
        </div>
        <div className="Message-reply-delete">
          <button value={_id} onClick={reply} className="Reply-btn">Reply</button>
          <div className={replyModal ? "modal is-active" : "modal"}>
            <div className="field">
              <form onSubmit={sendReply}>
                <div className="control">
                  <textarea onChange={replyChange} name="text" className="textarea is-medium is-primary" placeholder="Message..."></textarea>
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