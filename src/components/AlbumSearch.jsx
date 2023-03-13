import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AlbumCard from './AlbumCard';

class AlbumSearch extends Component {
  render() {
    const { artistTitle, artistAlbum } = this.props;
    if (artistAlbum.length === 0) return <h2>Nenhum álbum foi encontrado</h2>;
    return (
      <section className="albumsSearch">
        <h2>{ `Resultado de álbuns de: ${artistTitle}` }</h2>
        {
          artistAlbum.map((album) => (
            <AlbumCard
              key={ album.collectionId }
              image={ album.artworkUrl100 }
              albumName={ album.collectionName }
              artistName={ album.artistName }
              collectionId={ album.collectionId }
            />
          ))
        }
      </section>
    );
  }
}

AlbumSearch.propTypes = {
  artistTitle: PropTypes.string.isRequired,
  artistAlbum: PropTypes.arrayOf(PropTypes.shape({
    artistId: PropTypes.number.isRequired,
    artistName: PropTypes.string.isRequired,
    collectionId: PropTypes.number.isRequired,
    collectionName: PropTypes.string.isRequired,
    collectionPrice: PropTypes.number,
    artworkUrl100: PropTypes.string.isRequired,
    releaseDate: PropTypes.string.isRequired,
    trackCount: PropTypes.number.isRequired,
  }).isRequired).isRequired,
};

export default AlbumSearch;
