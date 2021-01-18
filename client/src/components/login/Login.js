import React from 'react';

import './Login.scss';
import googleIcon from './google-icon.svg'

const Login = (props) => {

  return (
    <div className="login-body">

      <div className="login-container">

        <div className='login-content'>

          <div className="login-app-name">
            <h1 className="unselectable">BocUp</h1>
          </div>

          <button onClick={props.onSignInClick} className="unselectable" >
            <img src={googleIcon} alt="googleIcon" />
          </button>
          <h3 className="unselectable">LogIn</h3>



        </div>


      </div>

    </div>
  );

};



export default Login;