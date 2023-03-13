import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class AlbumCard extends Component {
  render() {
    const { image, albumName, artistName, collectionId } = this.props;
    return (
      <div className="albumCard">
        <img src={ image } alt={ albumName } />
        <h3>{ albumName }</h3>
        <p>{ artistName }</p>
        <Link
          to={ `album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          Detalhes
        </Link>
      </div>
    );
  }
}

AlbumCard.propTypes = {
  image: PropTypes.string.isRequired,
  albumName: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
  collectionId: PropTypes.number.isRequired,
};

export default AlbumCard;
