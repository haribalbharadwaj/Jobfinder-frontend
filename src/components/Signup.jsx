import React, { useState } from 'react';
import axios from 'axios';

function Signup({togglePage}) {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/signup', {
        username: userName,
        email: email,
        password: password,
        mobile: mobile,
      });

      console.log(response.data.message);
      alert('User created successfully!');
      setUserName('');
      setEmail('');
      setPassword('');
      setMobile('');
      setError('');
    } catch (error) {
      console.error(error.response?.data || 'An error occurred');
      setError(error.response?.data?.message || 'An unknown error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='App'>
      <h2>Signup</h2>
      {error && <h3 style={{ color: 'red' }}>{error}</h3>}
      <form id='form' onSubmit={handleSubmit}>
        <p>Username</p>
        <input
          required
          type='text'
          id='username-input'
          name='username'
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <p>Email</p>
        <input
          required
          type='email'
          id='email-input'
          name='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p>Password</p>
        <input
          required
          type='password'
          id='password-input'
          name='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p>Mobile</p>
        <input
          required
          type='text'
          id='mobile-input'
          name='mobile'
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
        <br/><br/>
        <button type='submit' disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
      <p>
        Already have an account? <button onClick={togglePage}>Login</button>
      </p>
    </div>
  );
}

export default Signup;
