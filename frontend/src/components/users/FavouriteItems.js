import React from 'react'

import { Link } from 'react-router-dom'
import { allUsersFavourites, deleteArticleFromFavs } from '../../lib/api'
import { toast } from '../../lib/notifications'

class FavouriteItem extends React.Component {
  state = { items: null }

  async componentDidMount() {
    try {
      await this.getPosts()
    } catch (err) {
      this.props.history.push('/notfound')
    }
  }

  getPosts = async () => {
    try {
      const res = await allUsersFavourites()
      this.setState({ items: res.data.favArticles })
    } catch (err) {
      this.props.history.push('/notfound')
    }
  }

  removeFromFavs = async e => {
    try {
      await deleteArticleFromFavs(e.target.value)
      toast('Removed post from favs')
      this.getPosts()
    } catch (err) {
      toast('Couldnt remove post from favs')
    }
  }

  render() {
    if (!this.state.items) return <h1>The Ninjas went to get you some Pizza</h1>
    const { items } = this.state
    return (
      <>
        <div className="Fav-items">
          <div className="Page-head">
            <div className="Page-title">
              <h1>MY FAVOURITE ITEMS</h1>
            </div>
          </div>
          <div className="Favs">
            {items.map(item =>
              <div key={item._id} className='m'>
                <div className="Card">
                  <Link to={`/clothes/${item._id}`}>
                    <div className="fav-img">
                      <img src={item.image[0]} alt={item.title} loading="lazy" width="255" height="255" />
                    </div>
                    <div className="Card-content">
                      <h4><strong>{item.title}</strong></h4>
                      <h5><strong>Rental Price:</strong> {`£${item.rentalPrice}`}</h5>
                    </div>
                  </Link>
                </div>
                <button className="fav-item-Button" onClick={this.removeFromFavs} value={item._id}>Delete from favourites</button>
              </div>
            )}
          </div>
        </div>
      </>
    )
  }
}

export default FavouriteItem