import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  state = {
    buttonDisable: true,
    artistName: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    const MIN__LENGTH = 2;
    const buttonDisable = value.length < MIN__LENGTH;
    this.setState({
      [name]: value,
      buttonDisable,
    });
  };

  render() {
    const { buttonDisable, artistName } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            name="artistName"
            value={ artistName }
            data-testid="search-artist-input"
            placeholder="Pesquise um artista"
            onChange={ this.handleChange }
          />
          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ buttonDisable }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
