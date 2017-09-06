import React, { Component } from 'react';
import { connect } from 'react-redux';

//checks to see if user is authenticated
export default function(ComposedComponent) {
  class Authentication extends Component {
    static contextTypes = {
      router: React.PropTypes.object
    }
    //if the user isnt authenticated send them back to the homepage
    componentWillMount() {
      if (!this.props.authenticated) {
        this.context.router.push('/');
      }
    }
    //if the user isnt authenticated send them back to the homepage
    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.context.router.push('/');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }
// bind authenticated property from state object to component
  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
  }

  return connect(mapStateToProps)(Authentication);
}
