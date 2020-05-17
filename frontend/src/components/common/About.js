import React from 'react'

import { isAuthenticated } from '../../lib/auth'

class About extends React.Component {
  
  
  // * function to push the user to the register page 
    handleClick= () => {
      this.props.history.push('/register')
    }

render () {
  return (
    <>
      <section className="hero is-light">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">
              KEBB Clothes
      </h1>
            <h2 className="subtitle">
              A place to borrow, lend & be inspired.
      </h2>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <h1 className="title">Section</h1>
          <h2 className="subtitle">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus rutrum arcu a lectus aliquam aliquet. Aenean vel porta orci. Pellentesque nunc neque, sollicitudin non lorem quis, vestibulum luctus libero. Nunc vitae semper enim. Nunc vel orci ipsum. Proin odio leo, facilisis ut ante id, congue rhoncus purus. Nam tristique eleifend libero elementum tincidunt. Pellentesque gravida nisl et neque elementum, sed tempus nulla rhoncus. Duis varius aliquam ante vehicula imperdiet. Vestibulum ut posuere massa. In at varius massa. Nam mollis ornare massa ultrices eleifend. Phasellus tristique condimentum elit, in commodo justo. Quisque at augue leo.
      </h2>
        </div>
        <section className="section">
        <div className="container">
          <p>Image to go here</p>
          {/* image to go here */}
        </div>
        <div className="container">
          {!isAuthenticated() &&
        <button className="button is fullwidth"
              onClick={this.handleClick}
              >Join Us Now</button>}
              </div>
      </section>
      </section>
    </>
  )
}
}

export default About