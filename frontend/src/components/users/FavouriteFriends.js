import React from 'react'
import { Link } from 'react-router-dom'

import { allUsersFavourites, deleteFriend } from '../../lib/api'
import { toast } from '../../lib/notifications'

class FavouriteFriends extends React.Component {
  state = {
    friends: null
  }

  async componentDidMount() {
    try {
      await this.getPosts()
    } catch (err) {
      this.props.history.push('/notfound')
    }
  }

  //* Function 
  getPosts = async () => {
    try {
      const res = await allUsersFavourites()
      this.setState({ friends: res.data.favUsers })
    } catch (err) {
      this.props.history.push('/notfound')
    }
  }

  //* Remove friends from favs
  removeFromFavs = async e => {
    try {
      await deleteFriend(e.target.value)
      toast('You removed a friend!')
      this.getPosts()
    } catch (err) {
      toast('Couldnt remove friend')
    }
  }

  render() {
    if (!this.state.friends) return <h1>Looks like the Ninjas dont like you</h1>
    const { friends } = this.state
    return (
      <>
        <div className="Fav-items">
          <div className="Page-head">
            <div className="Page-title">
              <h1>MY FRIENDS</h1>
            </div>
          </div>
          <div className="Favs">
            {friends.map(friend =>
              <div key={friend.username} className="m">
                <div className="Card">
                  <Link to={`/page/${friend.username}`}>
                    <div className="fav-img">
                      <img src={friend.profilePic} alt={friend.username} loading="lazy" width="255" height="255" />
                    </div>
                    <div className="Card-content">
                      <h4><strong>{friend.username}</strong></h4>
                    </div>
                  </Link>
                </div>
                <button className="fav-item-Button" onClick={this.removeFromFavs} value={friend._id}>Unfollow</button>
              </div>
            )}
          </div>
        </div>
      </>
    )
  }
}

export default FavouriteFriends