import React, { useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  // Handle POST request
  const handlePostSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://test-django-app-uw0c.onrender.com/api/hello/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
      } else {
        setMessage(data.error || 'Something went wrong');
      }
    } catch (error) {
      setMessage('Error connecting to backend');
    }
  };

  // Handle GET request
  const handleGetRequest = async () => {
    try {
      const response = await fetch('https://test-django-app-uw0c.onrender.com/api/hello/', {
        method: 'GET',
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
      } else {
        setMessage('Failed to fetch GET response');
      }
    } catch (error) {
      setMessage('Error connecting to backend');
    }
  };

  return (
    <div className="App">
      <h1>React-Django Test</h1>
      
      {/* POST Form */}
      <div>
        <h3>POST Request</h3>
        <form onSubmit={handlePostSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
          <button type="submit">Send POST</button>
        </form>
      </div>

      {/* GET Button */}
      <div>
        <h3>GET Request</h3>
        <button onClick={handleGetRequest}>Send GET</button>
      </div>

      {/* Response Display */}
      <p>{message}</p>
    </div>
  );
}

export default App;