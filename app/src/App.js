import algoliasearch from 'algoliasearch';
import Header from './Header';
import React, { Component } from 'react';
import './App.css';


var client = algoliasearch("P0Y1SRPNG9", "5eef9f098e82a0700de450e701c7ab26");
var algolia = client.initIndex('recipes');


class Recipe extends Component {
  render() {
    const title = {__html: this.props.hit._highlightResult.title.value}
    return (
      <div className="recipe" dangerouslySetInnerHTML={title} />
    );
  }
}

class App extends Component {
  
  constructor() {
    super();
    this.state = {
      query: '',
      lastQuery: null,
      hits: [],
    };
  }

  handleChange() {
    const query = document.getElementById('searchfield').value;
    if (query !== this.state.query) {
      this.setState({lastQuery: query});
      algolia.search(query, (err, content) => {
        if (query === this.state.lastQuery) {
          console.log(content.hits);
          this.setState({query: query, hits: content.hits});
        }
      });
    }
  }

  render() {
    return (
      <main>
        <Header query={this.state.query} onChange={() => this.handleChange()} />
        <aside id="refines"></aside>
        <article id="searchresults">
          { this.state.hits.map((hit, i) => <Recipe hit={hit} key={i} />)}
        </article>
      </main>
    );
  }
}

export default App;
