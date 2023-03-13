import React, { Component } from 'react';
import AlbumSearch from '../components/AlbumSearch';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  state = {
    buttonDisable: true,
    artistName: '',
    isLoading: false,
    albumLoading: false,
    artistTitle: '',
    artistAlbum: [],
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

  handleClick = async (event) => {
    event.preventDefault();
    const { artistName } = this.state;
    this.setState({
      isLoading: true,
      artistName: '',
    });
    const artistAlbum = await searchAlbumsAPI(artistName);
    this.setState({
      isLoading: false,
      artistTitle: artistName,
      artistAlbum,
      albumLoading: true,
    });
  };

  render() {
    const {
      buttonDisable,
      artistName,
      isLoading,
      albumLoading,
      artistTitle,
      artistAlbum } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {
          isLoading
            ? <Loading />
            : (
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
                  onClick={ this.handleClick }
                >
                  Pesquisar
                </button>
              </form>
            )
        }
        {
          albumLoading && (
            <AlbumSearch
              artistTitle={ artistTitle }
              artistAlbum={ artistAlbum }
            />
          )
        }
      </div>
    );
  }
}

export default Search;
