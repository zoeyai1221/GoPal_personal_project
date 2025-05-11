import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { User, AuthState } from '../types';
import { AuthAPI } from '../api/auth';

interface AuthContextType {
  authState: AuthState;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  loading: boolean;
}

const defaultState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
  loading: true
};

const AuthContext = createContext<AuthContextType>({
  authState: defaultState,
  login: async () => false,
  register: async () => false,
  logout: async () => {},
  loading: true
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>(defaultState);
  const [loading, setLoading] = useState<boolean>(true);

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setAuthState({
          isAuthenticated: false,
          user: null,
          token: null,
          loading: false
        });
        setLoading(false);
        return;
      }

      try {
        // TODO: Implement token verification
        // For now, we'll just assume the token is valid and get the user profile
        const response = await fetch('/api/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setAuthState({
            isAuthenticated: true,
            user: data.data,
            token,
            loading: false
          });
        } else {
          // Token is invalid, clear it
          localStorage.removeItem('token');
          setAuthState({
            isAuthenticated: false,
            user: null,
            token: null,
            loading: false
          });
        }
      } catch (error) {
        console.error('Auth check error:', error);
        localStorage.removeItem('token');
        setAuthState({
          isAuthenticated: false,
          user: null,
          token: null,
          loading: false
        });
      }
      
      setLoading(false);
    };

    checkAuth();
  }, []);

  /**
   * Login user with email and password
   */
  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    try {
      const response = await AuthAPI.login({ email, password });
      
      if (response.success && response.data) {
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        
        setAuthState({
          isAuthenticated: true,
          user,
          token,
          loading: false
        });
        
        setLoading(false);
        return true;
      } else {
        setLoading(false);
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoading(false);
      return false;
    }
  };

  /**
   * Register a new user
   */
  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    try {
      const response = await AuthAPI.register({ name, email, password });
      
      if (response.success && response.data) {
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        
        setAuthState({
          isAuthenticated: true,
          user,
          token,
          loading: false
        });
        
        setLoading(false);
        return true;
      } else {
        setLoading(false);
        return false;
      }
    } catch (error) {
      console.error('Registration error:', error);
      setLoading(false);
      return false;
    }
  };

  /**
   * Logout user
   */
  const logout = async (): Promise<void> => {
    setLoading(true);
    
    try {
      await AuthAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      
      setAuthState({
        isAuthenticated: false,
        user: null,
        token: null,
        loading: false
      });
      
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ authState, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
