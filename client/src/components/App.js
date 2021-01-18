import React, {Component} from 'react';
import {connect} from 'react-redux';
import {signIn, signOut} from '../actions'



import Login from './login/Login';
import Chat from './chat/Chat';

import './App.css';


document.querySelector("body").addEventListener("contextmenu", (e) => {
  e.preventDefault()
})

class App extends Component {

  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      // console.log('Library loaded')
      // init returns a promise
      window.gapi.client.init({
        clientId: "",
        scope: 'email'
      }).then(() => {
        // console.log('Init complete');
        this.auth = window.gapi.auth2.getAuthInstance();
        // this.setState({isSignedIn: this.auth.isSignedIn.get()});
        this.onAuthChange(this.auth.isSignedIn.get());
        this.auth.isSignedIn.listen(this.onAuthChange);
      });
    });
  };

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };


  render() {
    return (
      <React.Fragment>
        {this.props.isSignedIn ? <Chat onSignOutClick={this.onSignOutClick} userData={this.auth.currentUser} /> : <Login onSignInClick={this.onSignInClick} />}
      </React.Fragment >
    );
  }

}

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    isSignedIn: state.auth.isSignedIn
  }
}

export default connect(mapStateToProps, {signIn, signOut})(App);
