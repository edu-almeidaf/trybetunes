import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  state = {
    name: '',
    isLoading: true,
  };

  componentDidMount() {
    this.fetchGetUser();
  }

  fetchGetUser = async () => {
    const userInformations = await getUser();
    this.setState({
      name: userInformations.name,
      isLoading: false,
    });
  };

  render() {
    const { name, isLoading } = this.state;
    return (
      <header data-testid="header-component">
        {
          isLoading
            ? <Loading />
            : <h1 data-testid="header-user-name">{ name }</h1>
        }
        <Link to="/search" data-testid="link-to-search">Pesquisar</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
        <Link to="/profile" data-testid="link-to-profile">Meu Perfil</Link>
      </header>
    );
  }
}

export default Header;
