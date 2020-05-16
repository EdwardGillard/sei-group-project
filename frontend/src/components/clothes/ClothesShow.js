import React from 'react'

import { singleCloth, getProfile } from '../../lib/api'

import SingleClothCard from './SingleClothCard'

class ClothesShow extends React.Component {

  state = {cloth: null, user: null}

  // * GET each clothing item on mount via Id
  async componentDidMount() {
    const clothId = this.props.match.params.id
    try {
      const res = await singleCloth(clothId)
      const user = await getProfile()
      this.setState({cloth: res.data, user: user.data})
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    if (!this.state.cloth) return <h1>Even more Ninjas are working on this</h1>
    const {cloth, user} = this.state
    console.log(cloth)
    console.log(user)
    return (
      <>
        <section className="hero is-light">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                Item show page
              </h1>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <div className="columns">
              <SingleClothCard 
              {...cloth}
              {...user}
              />
            </div>
          </div>
        </section>
      </>
    )
  }
}

export default ClothesShow