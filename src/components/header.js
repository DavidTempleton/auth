import React, { Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

//header presist throughout the app on every component page
class Header extends Component {
  //renderLinks is a helper function that cleans up the returned component
  renderLinks() {
    //if user is authenticated then show logout button on header
    if(this.props.authenticated) {
      //show link to logout
      return (
        <li className='nav-item'>
          <Link className='nav-link' to='/signout'>Sign Out</Link>
        </li>
      );
    } else {
      //if user is authenticated then show signin or signup button on header
      return [
        <li className='nav-item' key={1}>
          <Link className='nav-link' to='/signin'>Sign In</Link>
        </li>,
        <li className='nav-item' key={2}>
          <Link className='nav-link' to='/signup'>Sign Up</Link>
        </li>
      ];
    }
    <li className='nav-item'>
      Sign in
    </li>
  }
  //returned component for header that calls renderLinks() to help
  render() {
    return(
      <nav className='navbar navbar-light'>
        <Link to='/' className='navbar-brand'>TicketR</Link>
        <ul className='nav navbar-nav'>
          {this.renderLinks()}
        </ul>
      </nav>
    );
  }
}
// bind authenticated property from state object to component
function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

//allows component to keep up with its state and props
export default connect(mapStateToProps)(Header);
