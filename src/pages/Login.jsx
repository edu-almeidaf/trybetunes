import React, { Component } from 'react';
import { createUser } from '../services/userAPI';

class Login extends Component {
  state = {
    disableButton: true,
    name: '',
  };

  handleSubmit = (event) => {
    event.preventDefault();
  };

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({
      name: value,
    }, this.verifyCharacters);
  };

  verifyCharacters = () => {
    const { name } = this.state;
    const MIN__LENGTH = 3;
    if (name.length < MIN__LENGTH) {
      this.setState({
        disableButton: true,
      });
    } else {
      this.setState({
        disableButton: false,
      });
    }
  };

  render() {
    const { disableButton, name } = this.state;
    return (
      <div data-testid="page-login">
        <form onSubmit={ this.handleSubmit }>
          <input
            type="text"
            placeholder="Digite seu nome"
            data-testid="login-name-input"
            onChange={ this.handleChange }
            value={ name }
          />
          <button
            type="submit"
            data-testid="login-submit-button"
            disabled={ disableButton }
            onClick={ createUser(name) }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
