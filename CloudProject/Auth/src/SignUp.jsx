import './Auth.css'
//import App from '../../Todo-App-Front/src/App'
import { useRef } from 'react';

import App from './App';
function SignUp()
{const usernameRef = useRef();
    const passwordRef = useRef();
    const emailRef = useRef();
    function Sign(){
        const requestOptions = {
            method: "POST",
           withCredentials: true,
            headers: { "Content-Type": "application/json",
                       "Access-Control-Allow-Origin":" http://20.93.250.40:5173/",
                       "Access-Control-Allow-Credentials": "true"
                       },
            body: JSON.stringify({
                username: usernameRef.current.value,

                email: emailRef.current.value,
                password: passwordRef.current.value,
               
            }),
        
          };
         fetch("http://20.62.217.130/auth/signup",requestOptions)
        .then((response)=>response.json())
      .then((data)=>{console.log(data);
     

    })
    }
  return (
   <>
   <App></App>
   <p className="typewriter">To access to the application ! Please Sign Up to your Account !</p>
   <div className="signbx">
   <div className="row mb-3">
   <div className="col-md-6">
   <input id="name" placeholder="Name" type="text" className="form-control " name="name"  required ref={usernameRef}></input>
   </div>
   </div>
   <div className="row mb-3">

<div className="col-md-6">
    <input id="email" placeholder="Email Address" type="email" className="form-control " name="email"  required ref={emailRef}></input>
</div>
</div>         

<div className="row mb-3">

<div className="col-md-6">
<input id="password" placeholder="Password" type="password" className="form-control" name="password" required ref={passwordRef}></input>
</div>
</div>
<div className="row mb-0">
                            <div className="col-md-6 offset-md-4">
                                <button onClick={Sign} type="submit" className="btn btn-primary register ">
                                    Register
                                </button>
                            </div>
                        </div>
</div>

   </>
  )
}
export default SignUp;