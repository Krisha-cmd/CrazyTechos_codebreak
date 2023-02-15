import React from 'react';
import './App.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'; 
import 'firebase/database';
import config from './config';

class Connector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      database: null,
      isConnected: false,
      myemail: '',
      mypswd: '',
      isLoggedIn: false,
      error: null,
    };
  }

  componentDidMount = async () => {
    firebase.initializeApp(config);

    this.setState({
      database: firebase.database(),
      auth: firebase.auth(),
    });
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.database !== nextState.database) {
      return false;
    }

    return true;
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleLogin = async () => {
    const { auth, myemail, mypswd } = this.state;

    try {
      const response = await auth.signInWithEmailAndPassword(myemail, mypswd);
      // Use response to update state or perform other actions
      console.log('Logged in successfully', response);
      this.setState({ isLoggedIn: true, error: null });
    } catch (error) {
      // Handle login errors
      console.error('Error logging in', error);
      this.setState({ isLoggedIn: false, error: error.message });
    }
  };

  handleLogout = async () => {
    const { auth } = this.state;

    try {
      await auth.signOut();
      this.setState({ isLoggedIn: false, error: null });
    } catch (error) {
      console.error('Error logging out', error);
      this.setState({ error: error.message });
    }
  };

  render() {
    const { isLoggedIn, error } = this.state;

    return (
      <div>
        {isLoggedIn ? (
          <div>
            <h2>You are logged in!</h2>
            <button onClick={this.handleLogout}>Logout</button>
          </div>
        ) : (
          <div>
            <input
              type="email"
              name="myemail"
              placeholder="Email"
              onChange={this.handleInputChange}
            />
            <input
              type="password"
              name="mypswd"
              placeholder="Password"
              onChange={this.handleInputChange}
            />
            <button onClick={this.handleLogin}>Login</button>
            {error && <p>{error}</p>}
          </div>
        )}
      </div>
    );
  }
}

export default Connector
