import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import pic from '../image/login.png';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  let navigate = useNavigate();
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false); // Track if the user is in registration mode

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };
 
// LOGIN FORM SUBMISSION
  const handleLogin = async (e) => {
        e.preventDefault();

    setEmailError('');
    setPasswordError('');
 
    if (!email) {
        setEmailError('Email is required');
        return;
      }
      if (!isValidEmail(email)) {
        setEmailError('Invalid email format');
        return;
      }
      if (!password) {
        setPasswordError('Password is required');
        return;
      }
      try {
        // Simulate a backend API call
        const response = await axios.post('http://localhost:9090/login', {
          email: email,
          password: password,
        });
  
        if (response.data === 'Login Successfully') {
          toast.success(response.data, { 
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light", });
          navigate('/home');
        } else {
          toast.error(response.data, {position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",});
        }
      } catch (error) {
        console.error('Error while logging in:', error);
      }

  }

//   REGISTER FORM SUBMISSION
  const handleRegister = async (e) => {
    e.preventDefault();

        // Reset previous error messages
        setEmailError('');
        setPasswordError('');
    setConfirmPasswordError('');

        // Validate email and password
        if (!email) {
            setEmailError('Email is required');
            return;
        }

        if (!isValidEmail(email)) {
            setEmailError('Invalid email format');
            return;
        }

        if (!password) {
            setPasswordError('Password is required');
            return;
        }

    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      return;
    }
 
    try {
        //Simulate a backend API call
      const response = await axios.post('http://localhost:9090/register', {
        email: email,
        password: password,
      });
      if (response.data == true) {
        toast.success("Registered Successfully", {  
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",});
            setIsRegistering(false);
        //navigate('/');
      } else {
        toast.error(" ERROR ", { position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",});
      }
    } catch (error) {
      console.error('Error while logging in:', error);
    }
    };

  // function to validate email format
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    return (
        <>
      <div className='container-fluid base'>
        <div className='container'>
          <div className='row parent'>
            <div className='col-md-6 card1'>
              <img src={pic} alt='Image not found' width='300px' height='200px' />
              <h5>Hey! Welcome</h5>
              <h6>Please Verify Your Identity</h6>
        </div>
            <div className='col-md-6 card2'>
              {isRegistering ? (
                <>
                  <h6 className='form-heading'>
                    <span> Register Page </span>{' '}
                  </h6>
                  <form onSubmit={handleRegister} className='form-container'>
                    {/* Registration Form */}
                    <div className='form-group'>
                      <input
                        className='email'
                        placeholder='Enter your Email'
                        type='email'
                        id='email'
                        value={email}
                        onChange={handleEmailChange}
                    />
                      {emailError && <div className='error'>{emailError}</div>}
                </div>
                    <div className='form-group'>
                    <input
                        type='password'
                        id='password'
                        placeholder='Enter your Password'
                        value={password}
                        onChange={handlePasswordChange}
                    />
                      {passwordError && <div className='error'>{passwordError}</div>}
                </div>
                    <div className='form-group'>
                      <input
                        type='password'
                        id='confirmPassword'
                        placeholder='Confirm your Password'
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                      />
                      {confirmPasswordError && <div className='error'>{confirmPasswordError}</div>}
                    </div>
                    <div className='btn-group button-container'>
                      <button className='button1' type='submit'>
                        Register
                      </button>
                      <button className='button2' type='button' onClick={() => setIsRegistering(false)}>
                        Back to Login
                      </button>
                    </div>
            </form>
                </>
              ) : (
                <>
                  {/* Login Form */}
                  <h6 className='form-heading'>
                    <span> Login Page </span>{' '}
                  </h6>
                  <form onSubmit={handleLogin} className='form-container'>
                    <div className='form-group'>
                      <input
                        className='email'
                        placeholder='Enter your Email'
                        type='email'
                        id='email'
                        value={email}
                        onChange={handleEmailChange}
                      />
                      {emailError && <div className='error'>{emailError}</div>}
                    </div>
                    <div className='form-group'>
                      <input
                        type='password'
                        id='password'
                        placeholder='Enter your Password'
                        value={password}
                        onChange={handlePasswordChange}
                      />
                      {passwordError && <div className='error'>{passwordError}</div>}
                    </div>
                    <div className='btn-group button-container'>
                      <button className='button1' type='submit'>
                        Login
                      </button>
                      <button className='button2' type='button' onClick={() => setIsRegistering(true)}>
                        Register
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
        </div>
        </>
  );
}

export default Login;
