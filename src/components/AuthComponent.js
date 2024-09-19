```javascript
import React, { useState, useEffect } from 'react';
import { getAuthStatus, login, logout } from '../services/authService';

const AuthComponent = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAuthStatus() {
      try {
        const authStatus = await getAuthStatus();
        setIsAuthenticated(authStatus);
      } catch (error) {
        console.error('Failed to fetch authentication status:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchAuthStatus();
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await login();
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>You are logged in.</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <p>You are not logged in.</p>
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
};

export default AuthComponent;
```