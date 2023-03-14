import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  state = {
    favorite: false,
    isLoading: false,
    isLoadingPage: true,
  };

  componentDidMount() {
    const { isFavorite } = this.props;
    this.setState({
      favorite: isFavorite,
      isLoadingPage: false,
    });
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

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { isLoading, favorite, isLoadingPage } = this.state;
    return (
      <div className="musicCard">
        {
          isLoadingPage
            ? <Loading />
            : (
              <>
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
              </>
            )
        }
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
