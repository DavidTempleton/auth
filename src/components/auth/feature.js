import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

//basic component for main screen
class Feature extends Component {
  componentWillMount() {
    this.props.fetchMessage();
  }

  render() {
    return <div>{this.props.message}</div>
  }
}
// bind message property from state object to component
function mapStateToProps(state) {
  return { message: state.auth.message };
}

export default connect(mapStateToProps, actions)(Feature);
