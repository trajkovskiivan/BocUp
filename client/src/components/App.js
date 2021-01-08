import React from 'react';
import {connect} from 'react-redux';
import Login from './Login';

const App = () => {
  return (
    <div>
      <Login />
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log(state)
}

export default connect(null)(App);