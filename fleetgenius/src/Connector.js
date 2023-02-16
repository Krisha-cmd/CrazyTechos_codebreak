/*import React from 'react';
import './App.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'; 
import 'firebase/database';
import config from './config';
import { Login } from './login';


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
            <button onClick={this.handleLogout}>Logout</button>
          </div>
        ) : (
          <div>
            <Login/>
          </div>
        )}
      </div>
    );
  }
}

export default Connector;*/

import React from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const config = {
  // Your Firebase config goes here
};

class SignIn extends React.Component {
  state = {
    email: '',
    password: '',
    user: null,
    error: null
  }

  componentDidMount() {
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user: user });
      } else {
        this.setState({ user: null });
      }
    });
  }

  handleEmailChange = (e) => {
    this.setState({ email: e.target.value });
  }

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  }

  handleSignIn = () => {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((userCredential) => {
        // User signed in successfully
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        // Handle errors
        const errorCode = error.code;
        const errorMessage = error.message;
        this.setState({ error: errorMessage });
        console.error(errorCode, errorMessage);
      });
  }

  handleSignOut = () => {
    firebase.auth().signOut()
      .then(() => {
        // User signed out successfully
        console.log('User signed out');
      })
      .catch((error) => {
        // Handle errors
        console.error(error);
      });
  }

  render() {
    if (this.state.user) {
      // User is signed in
      return (
        <div>
          <p>Welcome, {this.state.user.displayName}!</p>
          <button onClick={this.handleSignOut}>Sign Out</button>
        </div>
      );
    } else {
      // User is signed out
      return (
        <div>
          <input type="email" value={this.state.email} onChange={this.handleEmailChange} />
          <input type="password" value={this.state.password} onChange={this.handlePasswordChange} />
          <button onClick={this.handleSignIn}>Sign In</button>
          {this.state.error && <p>{this.state.error}</p>}
        </div>
      );
    }
  }
}

export default SignIn;
