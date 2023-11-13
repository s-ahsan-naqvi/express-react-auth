import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [token, setToken] = useState('');
  const [sample, setSample] = useState('sampe ----> helo');

  const handleGetData = async () => {
    try {
      const data = await fetch("http://localhost:3030/data");
      const res = await data.json()

      setSample(res.message);

    } catch(er){
      console.log(er);
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
    <div className="App">
      <h1>React Auth Demo</h1>
      <div>
        <h2>Sign In</h2>
        <form>
          <label>
            Username:
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
          <br />
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <br />
          <button type="button" onClick={handleSignIn}>
            Sign In
          </button>
        </form>
      </div>
      <div>
        <h2>Sign Up</h2>
        <form>
          <label>
            Username:
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
          <br />
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <br />
          <label>
            Role:
            <input type="text" value={role} onChange={(e) => setRole(e.target.value)} />
          </label>
          <br />
          <button type="button" onClick={handleSignUp}>
            Sign Up
          </button>
        </form>
      </div>
      {token && (
        <div>
          <h2>Token</h2>
          <p>{token}</p>
        </div>
      )}
      <div>
        
        <h1>{sample}</h1>
        <button onClick={handleGetData}>Get sample</button>
      </div>
    </div>
  );
}

export default App;