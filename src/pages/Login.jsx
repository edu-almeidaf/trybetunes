import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

class Login extends Component {
  state = {
    disableButton: true,
    name: '',
    isLoading: false,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    const MIN__LENGTH = 3;
    const disableButton = value.length < MIN__LENGTH;
    this.setState({
      [name]: value,
      disableButton,
    });
  };

  handleClick = async (event) => {
    event.preventDefault();
    const { history } = this.props;
    const { name } = this.state;
    this.setState({
      isLoading: true,
    });
    await createUser({ name });
    this.setState({
      isLoading: false,
    });
    history.push('search');
  };

  render() {
    const { disableButton, name, isLoading } = this.state;
    return (
      <div data-testid="page-login">
        <form>
          <input
            type="text"
            placeholder="Digite seu nome"
            data-testid="login-name-input"
            onChange={ this.handleChange }
            value={ name }
            name="name"
          />
          <button
            type="submit"
            data-testid="login-submit-button"
            disabled={ disableButton }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </form>
        { isLoading && <Loading /> }
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
