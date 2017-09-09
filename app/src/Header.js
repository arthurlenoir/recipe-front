import React, { Component } from 'react';
//import './App.css';


class Header extends Component {
  render() {
    return (
      <header>
        <a href="/" id="logo">Recipes: {this.props.query}</a>
        <input type="text" value={this.props.initial} onKeyUp={() => this.props.onChange()} autoComplete="off" name="search" id="searchfield" placeholder="search for recipes" />
      </header>
    );
  }
}

export default Header;
