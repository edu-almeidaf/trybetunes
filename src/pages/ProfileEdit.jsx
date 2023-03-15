import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends Component {
  state = {
    isLoading: true,
    name: '',
    email: '',
    description: '',
    image: '',
  };

  componentDidMount() {
    this.getSavedUser();
  }

  getSavedUser = async () => {
    const userProfile = await getUser();
    const { name, description, image, email } = userProfile;
    this.setState({
      name, email, description, image, isLoading: false,
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleClick = async (event) => {
    event.preventDefault();
    const { history } = this.props;
    const { name, description, image, email } = this.state;
    this.setState({
      isLoading: true,
    });
    await updateUser({ name, description, image, email });
    this.setState({
      isLoading: false,
    });
    history.push('/profile');
  };

  render() {
    const {
      isLoading,
      name,
      email,
      description,
      image,
    } = this.state;
    const buttonEnabled = name.length > 0
    && email.length > 0
    && image.length > 0
    && description.length > 0;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {
          isLoading
            ? <Loading />
            : (
              <form>

                <label>
                  Nome:
                  <input
                    name="name"
                    type="text"
                    data-testid="edit-input-name"
                    onChange={ this.handleChange }
                    value={ name }
                  />
                </label>

                <label>
                  Email:
                  <input
                    name="email"
                    type="email"
                    required
                    data-testid="edit-input-email"
                    onChange={ this.handleChange }
                    value={ email }
                  />
                </label>

                <label>
                  Descrição:
                  <textarea
                    name="description"
                    data-testid="edit-input-description"
                    cols="30"
                    rows="10"
                    onChange={ this.handleChange }
                    value={ description }
                  />
                </label>

                <label>
                  URL da imagem:
                  <input
                    name="image"
                    type="text"
                    data-testid="edit-input-image"
                    onChange={ this.handleChange }
                    value={ image }
                  />
                </label>

                <button
                  type="submit"
                  data-testid="edit-button-save"
                  disabled={ !buttonEnabled }
                  onClick={ this.handleClick }
                >
                  Salvar alterações
                </button>
              </form>
            )
        }
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProfileEdit;
