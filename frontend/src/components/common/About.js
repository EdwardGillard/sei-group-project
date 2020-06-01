import React from 'react'
import { isAuthenticated } from '../../lib/auth'

class About extends React.Component {

  render() {
    return (
      <>
        <div className="About-us-wrapper">
          <div>
            <div className="About-page-main">
              <div className="Page-head">
                <div className="Page-title">
                  <h1 className="about-title">About KEBB</h1>
                </div>
                <div className="Page-subtitle">
                  <h2>A place to borrow, lend & be inspired.</h2>
                </div>
              </div>
              <div className="About column-center">
                <div className="Join-us Title">
                  {!isAuthenticated() && <p><a href="/register">Join us now </a> and see where your new wardrobe could take you!</p>}
                </div>
                <div className="About-row">
                  <div className="Our-mission column-center">
                    <h3 className="Title">Our Mission</h3>
                    <h4 className="Subtitle">
                      In a world where fast fashion is destroying the planet we are on a mission to <span className="bold">connect people</span> and strive for a more <span className="bold">sustainable future</span>. KEBB gives you the chance to <span className="bold">let others enjoy your clothes</span> as much as you do.</h4>
                  </div>
                  <div className="How-it-works column-center">
                    <h3 className="Title">How it works</h3>
                    <ul className="Subtitle">
                      <li>Browse through all the items uploaded online</li>
                      <li>See something you like? Drop the owner a direct message requesting to borrow</li>
                      <li>Upload your on clothes & start making money on your wardobe.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default About