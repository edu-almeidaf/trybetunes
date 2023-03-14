import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends Component {
  state = {
    arrayOfMusic: [],
    newArray: [],
    artistName: '',
    collectionName: '',
  };

  componentDidMount() {
    this.fetchMusic();
    this.getSavedSongs();
  }

  fetchMusic = async () => {
    const { match: { params: { id } } } = this.props;
    const albumMusics = await getMusics(id);
    const arrayOfMusic = albumMusics.filter((_album, index) => index !== 0);
    const { artistName } = albumMusics[0];
    const { collectionName } = albumMusics[0];
    this.setState({
      arrayOfMusic,
      artistName,
      collectionName,
    });
  };

  getSavedSongs = async () => {
    const savedSongs = await getFavoriteSongs();
    const { arrayOfMusic } = this.state;
    const newArray = arrayOfMusic.map((music) => {
      const isFavorite = savedSongs
        .some((savedSong) => savedSong.trackId === music.trackId);
      return { ...music, isFavorite };
    });
    this.setState({
      newArray,
    });
  };

  render() {
    const { newArray, artistName, collectionName } = this.state;
    return (
      <div data-testid="page-album">
        <Header />

        <h2 data-testid="artist-name">{ artistName }</h2>
        <h2 data-testid="album-name">{ collectionName }</h2>

        {
          newArray.map((music) => (
            <MusicCard
              key={ music.trackId }
              trackName={ music.trackName }
              previewUrl={ music.previewUrl }
              trackId={ music.trackId }
              music={ music }
              isFavorite={ music.isFavorite }
            />
          ))
        }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
