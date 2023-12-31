import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  state = {
    favorite: false,
    isLoading: false,
  };

  componentDidMount() {
    const { isFavorite } = this.props;
    this.setState({
      favorite: isFavorite,
    });
  }

  fetchSongs = async () => {
    const { favorite } = this.state;
    const { music, removeSavedSong, trackId } = this.props;
    this.setState({ isLoading: true });
    if (favorite) {
      await addSong(music);
    } else {
      await removeSong(music);
      removeSavedSong(trackId);
    }
    this.setState({ isLoading: false });
  };

  handleChange = ({ target }) => {
    const value = target.checked;
    this.setState({
      favorite: value,
    }, this.fetchSongs);
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { isLoading, favorite } = this.state;
    return (
      <div className="musicCard">
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
        </audio>
        <label>
          Favorita
          <input
            type="checkbox"
            name="favorite"
            data-testid={ `checkbox-music-${trackId}` }
            checked={ favorite }
            onChange={ this.handleChange }
          />
        </label>
        { isLoading && <Loading /> }
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
  trackId: PropTypes.number,
  isFavorite: PropTypes.bool.isRequired,
  music: PropTypes.shape({}).isRequired,
}.isRequired;

export default MusicCard;
