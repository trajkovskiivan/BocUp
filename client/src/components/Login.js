import React, {Component} from 'react';
import {connect} from 'react-redux'
import {signIn, signOut} from '../actions';


class Login extends Component {

  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      // console.log('Library loaded')
      // init returns a promise
      window.gapi.client.init({
        clientId: "",
        scope: 'email'
      }).then(() => {
        console.log('Init complete');
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

  renderAuthButton = () => {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className='ui red google button'>
          <i className='google icon' />
         Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignInClick} className='ui blue google button'>
          <i className='google icon' />
         Sign In with Google
        </button>
      );
    }
  };


  render() {
    return (
      <div>
        GoogleAuth
        {this.renderAuthButton()}
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn
  }
}

export default connect(mapStateToProps, {signIn, signOut})(Login);