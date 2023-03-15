import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  state = {
    isLoading: true,
    userProfile: {},
  };

  componentDidMount() {
    this.getSavedUser();
  }

  getSavedUser = async () => {
    const userProfile = await getUser();
    this.setState({
      userProfile,
      isLoading: false,
    });
  };

  render() {
    const { isLoading, userProfile } = this.state;
    const { name, email, description, image } = userProfile;
    return (
      <div data-testid="page-profile">
        <Header />
        {
          isLoading
            ? <Loading />
            : (
              <div>
                <h2>{ name }</h2>
                <p>{ email }</p>
                <p>{ description }</p>
                <img
                  src={ image }
                  alt={ name }
                  data-testid="profile-image"
                />
                <Link to="/profile/edit">
                  Editar perfil
                </Link>
              </div>
            )
        }
      </div>
    );
  }
}

export default Profile;
