import React, { useState } from "react";
import axios from "axios";

function Login({togglePage}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const[forgotPassword,setForgotpassword] = useState(false);
  const[resetEmail,setResetemail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        email,
        password,
      });
      console.log(response.data);
      setMessage('Login successful');
      setError('');
    } catch (error) {
      console.log(error);
      setError('Invalid credentials');
      setMessage('');
    }
  };

  const handleForgotPassword = async (event) =>{
    event.preventDefault();
    try{
        const response = await axios.post('http://localhost:3000/auth/forgot-password',{
            email:resetEmail
        });
        console.log(response.data)
        setMessage('Password reset link sent');
        setError('');
    }catch(error){
        console.log(error);
        setError('Error sending password link');
        setMessage('')
    }
  };



  return (
    <div>
      <h2>Login</h2>
      {error && <h3 style={{ color: 'red' }}>{error}</h3>}
      {message && <h3 style={{ color: 'green' }}>{message}</h3>}
      {!forgotPassword ?(
        <form id="login" onSubmit={handleSubmit}>
        <p>Email</p>
        <input
          required
          type="email"
          id="email-login"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p>Password</p>
        <input
          required
          type="password"
          id="password-login"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      ):(
        <form id="forgotPassword" onSubmit={handleForgotPassword}>
            <p>Enter your email to reset your password</p>
            <input
            required
            type="email"
            id="email-reset"
            name="email"
            value={resetEmail}
            onChange={(e)=>setResetemail(e.target.value)}
            />
            <button type="submit">Send reset link</button>

        </form>
      )}
      <p>
        {forgotPassword ?(
            <button onClick={()=>setForgotpassword(false)}>Back to login</button>
        ):(
            <>
            <button onClick={()=>setForgotpassword(true)}>Forgot password?</button>
            <br/>
            Dont have an account <button onClick={togglePage}>Signup</button>
            </>
        )

        }
      </p>
    </div>
  );
}

export default Login;
