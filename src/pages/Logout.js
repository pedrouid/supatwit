import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { authLogout } from '../reducers/_auth';

class Logout extends Component {
  componentWillMount() {
    this.props.authLogout();
  }
  render = () => null;
}

Logout.propTypes = {
  authLogout: PropTypes.func.isRequired
};

export default connect(null, { authLogout })(Logout);
