import React from 'react'

import { Link, withRouter } from 'react-router-dom'
import { isAuthenticated, logout, getUsername } from '../../lib/auth'

class Navbar extends React.Component {
  state = {
    isOpen: false
  }

  handleToggle = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  handleLogout = () => {
    logout()
    this.props.history.push('/')
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setState({ isOpen: false })
    }
  }

  username = getUsername()

  render() {

    const { isOpen } = this.state

    return (
      <nav className="navbar Navbar" >
        <div className="container">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item Navbar-item" >Home</Link>
            <Link to="/about" className="navbar-item Navbar-item" >About Us</Link>
            <Link to="/clothes" className="navbar-item Navbar-item" >Latest Items</Link>
            <Link to="/posts" className="navbar-item Navbar-item">Posts</Link>
            <span onClick={this.handleToggle} className={`navbar-burger ${isOpen ? 'is-active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </div>
          <div className={`navbar-menu ${isOpen ? 'is-active' : ''}`}>
            <div className="navbar-end">
              {isAuthenticated() && <Link to={`/profile/${this.username}`} className="navbar-item Navbar-item">View Profile</Link>}
              {isAuthenticated() && <Link to={`/profile/${this.username}/map`} className="navbar-item Navbar-item">User Map</Link>}
              {!isAuthenticated() && <Link to="/register" className="navbar-item Navbar-item">Register</Link>}
              {!isAuthenticated() && <Link to="/login" className="navbar-item Navbar-item">Login</Link>}
              {isAuthenticated() && <span onClick={this.handleLogout} className="navbar-item Navbar-item">Logout</span>}
            </div>
          </div>
        </div>
      </nav>
    )
  }
}


export default withRouter(Navbar)