import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import styles from './LoginSignup.module.css';
import { GenericApiContext } from '../../context/GenericApiContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { Toast, ToastContainer } from 'react-bootstrap';



const LoginSignup = () => {

  let navigate = useNavigate();
  const location = useLocation();

  const [isLogin, setIsLogin] = useState(false);
  const [loginResponseData, setLoginResponseData] = useState(null);
  const [loginPassword, setLoginPassword] = useState()
  const [loginEmail, setLoginEmail] = useState("");
  const [signUpName, setSignUpName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpReEnterPassword, setSignUpReEnterPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassToast, setShowPassToast] = useState(false);
  const [showFailToast, setShowFailToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [apiLoading, setApiLoading] = useState(false)


  const context = useContext(GenericApiContext);

  const from = location.state?.from?.pathname || "/home";

  const loginUser = (e) => {
    e.preventDefault();
    const requestBody = {
      email: loginEmail,
      password: loginPassword,
      login_by: "email",
      user_type: "customer",
    };

    const url = 'auth/login'

    context.getPostData(url, requestBody);
  };


  const signUpUser = (e) => {
    e.preventDefault();
    const requestBody = {
      name: signUpName,
      email_or_phone: signUpEmail,
      password: signUpPassword,
      passowrd_confirmation: signUpReEnterPassword,
      register_by: "email"
    }

    const url = 'auth/signup'

    context.getPostData(url, requestBody);
  };

  const handleLogin = (param) => {
    if (param.data.result) {
      sessionStorage.setItem('loginDetails', JSON.stringify(param.data));
      setToastMessage(param.data.message)
      setShowPassToast(true);
      const timer = setTimeout(() => {
        navigate(from, { replace: true });
      }, 1000);

      return () => clearTimeout(timer);
    }else{
      if(param.data.message[0]){
        setToastMessage(param.data.message[0])
      }else{
        setToastMessage(param.data.message)
      }
      setShowFailToast(true);
    }
  }

  const handleLoginEmail = (event) => {
    setLoginEmail(event.target.value)
  }
  const handleLoginPassWord = (event) => {
    setLoginPassword(event.target.value)
  }
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };
  const handleSignUpName = (event) => {
    setSignUpName(event.target.value);
  }
  const handleSignUpEmail = (event) => {
    setSignUpEmail(event.target.value);
  }
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setSignUpPassword(value);

    if (signUpReEnterPassword && value !== signUpReEnterPassword) {
      setError('Passwords do not match!');
    } else {
      setError('');
    }
  };
  const handleReEnterPasswordChange = (e) => {
    const value = e.target.value;
    setSignUpReEnterPassword(value);

    if (signUpPassword && value !== signUpPassword) {
      setError('Passwords do not match!');
    } else {
      setError('');
    }
  };

  useEffect(() => {
    if (context.postResultData) {
      setLoginResponseData(context.postResultData)
      handleLogin(context.postResultData)
    }
  }, [context.postResultData])

  useEffect(() => {
    context.checkIfLoggedIn();
    if (context.ifLoggedin) {
      navigate('/home')
    }
  }, [context.ifLoggedin])




  return (
    <div className={styles.auth_container}>
      <div className='container'>
        <div className={styles.auth_box + ` ` + `${isLogin ? styles.show_login : styles.show_signup}`}>
          <div className={styles.form_wrapper}>
            {isLogin ? (
              <form>
                <div className={styles.login_form}>
                  <h2>Login</h2>
                  <input type="email" placeholder="Email" value={loginEmail} onChange={handleLoginEmail} required />
                  <input type="password" placeholder="Password" value={loginPassword} onChange={handleLoginPassWord} required />
                  <button className={styles.button_style} onClick={loginUser}>{context.loading ? 'Loading...' : 'Login'}</button>
                  <p onClick={toggleForm}>Don't have an account? Sign up</p>
                </div>
              </form>
            ) : (
              <>
                <form >
                  <div className={styles.login_form + ' ' + styles.signup_form}>
                    <h2>Sign Up</h2>
                    <input type="text" placeholder="Full Name" value={signUpName} onChange={handleSignUpName} required />
                    <input type="email" placeholder="Email" value={signUpEmail} onChange={handleSignUpEmail} required />
                    <input type="password" placeholder="Password" value={signUpPassword} onChange={handlePasswordChange} required />
                    <input type="password" placeholder="Re-enter Password" value={signUpReEnterPassword} onChange={handleReEnterPasswordChange} required />
                    {
                      error && (<span className={styles.password_warning}>
                        * Enter Same Password *
                      </span>)
                    }

                    <button className={styles.button_style} onClick={signUpUser}>Sign Up</button>
                    <p onClick={toggleForm}>Already have an account? Login</p>
                  </div>

                </form>

              </>
            )}
          </div>
        </div>
      </div>
      <ToastContainer position="top-end">
        <Toast
          show={showPassToast}
          onClose={() => setShowPassToast(false)}
          delay={3000}
          autohide
          bg="success"
          style={{ marginTop: "20px" }}
        >
          <Toast.Body style={{ color: 'white' }}>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
      <ToastContainer position="top-end">
        <Toast
          show={showFailToast}
          onClose={() => setShowFailToast(false)}
          delay={3000}
          autohide
          bg="danger"
          style={{ marginTop: "20px" }}
        >
          <Toast.Body style={{ color: 'white' }}>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  )
};


export default LoginSignup;
