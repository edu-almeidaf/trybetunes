import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  state = {
    favorite: false,
    isLoading: false,
  };

  componentDidMount() {
    this.getSavedSongs();
  }

  fetchSongs = async () => {
    const { favorite } = this.state;
    const { music } = this.props;
    if (favorite) {
      this.setState({ isLoading: true });
      await addSong(music);
      this.setState({ isLoading: false });
    } else {
      await removeSong(music);
    }
  };

  handleChange = ({ target }) => {
    const value = target.checked;
    this.setState({
      favorite: value,
    }, this.fetchSongs);
  };

  getSavedSongs = async () => {
    const getSongs = await getFavoriteSongs();
    console.log(getSongs);
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { favorite, isLoading } = this.state;
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
  music: PropTypes.shape({}).isRequired,
}.isRequired;

export default MusicCard;
