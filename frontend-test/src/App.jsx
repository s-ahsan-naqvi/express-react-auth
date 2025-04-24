import { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [token, setToken] = useState('');
  const [sample, setSample] = useState('sample ----> hello');

  const handleGetData = async () => {
    try {
      const data = await fetch("http://localhost:3030/api/data", {
        headers: {
          "Authorization": token
        }
      });
      const res = await data.json();
      setSample(res.data);
    } catch (er) {
      console.log(er);
      alert("Unauthorized Action");
    }
  }

  const handleSignIn = async () => {
    try {
      const response = await axios.post('http://localhost:3030/api/signin', {
        username,
        password,
      });

      const { token } = response.data;
      setToken(token);
      console.log('Sign In successful. Token:', token);
    } catch (error) {
      console.error('Sign In failed:', error.message);
      alert(error.message);
    }
  };

  const handleSignUp = async () => {
    try {
      const response = await axios.post('http://localhost:3030/api/signup', {
        username,
        password,
        role,
      });

      const { token } = response.data;
      setToken(token);
      console.log('Sign Up successful. Token:', token);
    } catch (error) {
      console.error('Sign Up failed:', error.message);
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-title">React Auth Demo</h1>

      <div className="form-section">
        <h2 className="form-title">Sign In</h2>
        <form className="form">
          <label className="form-label">
            Username:
            <input className="form-input" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
          <label className="form-label">
            Password:
            <input className="form-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <button className="form-button" type="button" onClick={handleSignIn}>
            Sign In
          </button>
        </form>
      </div>

      <div className="form-section">
        <h2 className="form-title">Sign Up</h2>
        <form className="form">
          <label className="form-label">
            Username:
            <input className="form-input" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
          <label className="form-label">
            Password:
            <input className="form-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <label className="form-label">
            Role:
            <input className="form-input" type="text" value={role} onChange={(e) => setRole(e.target.value)} />
          </label>
          <button className="form-button" type="button" onClick={handleSignUp}>
            Sign Up
          </button>
        </form>
      </div>

      {token && (
        <div className="token-section">
          <h2 className="token-title">Token</h2>
          <p className="token-text">{token}</p>
        </div>
      )}

      <div className="sample-section">
        <h1 className="sample-text">{sample}</h1>
        <button className="sample-button" onClick={handleGetData}>Get sample protected resource</button>
      </div>
    </div>
  );
}

export default App;
