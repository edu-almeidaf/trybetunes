import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  state = {
    name: '',
    isLoading: true,
  };

  componentDidMount() {
    // this.setState({
    //   name: ,
    // });
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
            : <h1 data-testid="header-user-name">{ `Olá ${name}` }</h1>
        }
      </header>
    );
  }
}

export default Header;
