import { createContext, useContext, useEffect, useReducer, useRef } from 'react';
import PropTypes from 'prop-types';
import axios from "axios";

const HANDLERS = {
  INITIALIZE: 'INITIALIZE',
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT'
};

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      ...(
        // if payload (user) is provided, then is authenticated
        user
          ? ({
            isAuthenticated: true,
            isLoading: false,
            user
          })
          : ({
            isLoading: false
          })
      )
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null
    };
  }
};

const reducer = (state, action) => (
  handlers[action.type] ? handlers[action.type](state, action) : state
);

// The role of this context is to propagate authentication state through the App tree.

export const AuthContext = createContext({ undefined });

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);

  const initialize = async () => {
    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    let isAuthenticated = false;

    try {
      isAuthenticated = window.sessionStorage.getItem('authenticated') === 'true';
    } catch (err) {
      console.error(err);
    }
  
    if (isAuthenticated) {
      const user = JSON.parse(window.sessionStorage.getItem('user'));
      dispatch({
        type: HANDLERS.INITIALIZE,
        payload: user
      });
    } else {
      dispatch({
        type: HANDLERS.INITIALIZE
      });
    }
  };

  useEffect(
    () => {
      initialize();
    },[]
  );

  const signIn = async (username, password) => {
    await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}` + "auth/login", {
        username,
        password
      })
      .then(response => {
        if (response.data.token) {
          window.sessionStorage.setItem('authenticated', 'true');
          const user = {
            id: response.data.user._id,
            username: response.data.user.username,
            name: response.data.user.name,
            email: response.data.user.email,
            token: response.data.token
          };
          window.sessionStorage.setItem('user', JSON.stringify(user));
          dispatch({
            type: HANDLERS.SIGN_IN,
            payload: user
          });
        }
        else{
          throw new Error('Please check your email and password');
        }
      });
  };

  const signUp = async (username, email, password) => {
    await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + "auth/register", {
      username:username,
      email:email,
      password:password
    }).then(response => {
      if (response.data.token) {
        window.sessionStorage.setItem('authenticated', 'true');
          const user = {
            id: response.data.user._id,
            username: response.data.user.username,
            name: response.data.user.name,
            email: response.data.user.email,
            token: response.data.token
          };
          window.sessionStorage.setItem('user', JSON.stringify(user));
          dispatch({
            type: HANDLERS.SIGN_IN,
            payload: user
          });
      }
      else{
        throw new Error('Invalid request. Please try again!');
      }
    });
  };

  const signOut = () => {
    dispatch({
      type: HANDLERS.SIGN_OUT
    });
    window.sessionStorage.setItem('authenticated', 'false');
    window.sessionStorage.setItem('user', null);
  };

  const deleteAccount = async (userID, password, authToken) => {
    await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + 'user/delete', {password}, {
      headers: {
        Authorization: `Bearer ${authToken}`
      },
      params:{
        userID
      },
      data: {
        password
      }
    }).then(response => {
        dispatch({
          type: HANDLERS.SIGN_OUT,
        });
        window.sessionStorage.setItem('authenticated', 'false');
        window.sessionStorage.setItem('user', null);
      }).catch(error =>{
        throw new Error(error);
      })
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signUp,
        signOut,
        deleteAccount
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
