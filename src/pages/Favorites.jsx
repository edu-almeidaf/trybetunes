import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  state = {
    savedSongs: [],
    isLoadingPage: true,
    // isLoading: false,
    isFavorite: true,
  };

  componentDidMount() {
    this.getSongs();
    this.setState({
      isLoadingPage: false,
    });
  }

  // componentDidUpdate() {
  //   this.getSongs();
  // }

  getSongs = async () => {
    const savedSongs = await getFavoriteSongs();
    this.setState({
      savedSongs,
    });
  };

  removeSavedSong = (trackId) => {
    this.setState((prevState) => ({
      savedSongs: prevState.savedSongs.filter((song) => song.trackId !== trackId),
    }));
  };

  render() {
    const { savedSongs, isFavorite, isLoadingPage } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {
          isLoadingPage
            ? <Loading />
            : (
              savedSongs.map((music) => (
                <MusicCard
                  key={ music.trackId }
                  trackName={ music.trackName }
                  previewUrl={ music.previewUrl }
                  trackId={ music.trackId }
                  music={ music }
                  isFavorite={ isFavorite }
                  removeSavedSong={ this.removeSavedSong }
                />
              ))
            )
        }
      </div>
    );
  }
}

export default Favorites;
