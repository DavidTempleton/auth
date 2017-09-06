import React, { Component } from 'react';
import Header from './header';

//renders a background for the app and set the header component to be displayed
export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    );
  }
}
