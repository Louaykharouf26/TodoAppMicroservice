import './Auth.css';
import App from './App';
import { useRef, useState } from 'react';
import SideBar from './Sidebar_AfterLogin';

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const loggedIn = localStorage.getItem('email') !== null;
  const [userData, setUserData] = useState(null);

  async function log(e) {
    e.preventDefault();

    try {
      const requestOptions = {
        method: 'POST',
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: emailRef.current.value,
          password: passwordRef.current.value,
        }),
      };

      const response = await fetch('http://20.62.217.130/auth/login', requestOptions);
      const data = await response.json();

      if (response.ok) {
       
        setUserData(data);
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('email', data.email);

        // Redirect to Todo-App microfrontend with the token
        window.location.href = `http://20.126.227.186:5174/todo?email=${data.email}`;
      } else {
        console.error('Login failed:', data.error);
    
      }
    } catch (error) {
      console.error('Error during login:', error);
    
    }
  }

  return (
    <>
      {loggedIn ? <SideBar /> : <App />}
      <p className="typewriter">To access the application, please Sign In to your Account!</p>
      <div className="signbx">
        <div className="row mb-3">
          <div className="col-md-6">
            <input id="email" placeholder="Email Address" type="email" className="form-control" name="email" required ref={emailRef} />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <input id="password" placeholder="Password" type="password" className="form-control" name="password" required ref={passwordRef} />
          </div>
        </div>

        <div className="row mb-0">
          <div className="col-md-6 offset-md-4">
            <button onClick={log} type="submit" className="btn btn-primary register">
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
