import React, { createContext, useState } from 'react';
import user from '../interfaces/user';

interface UserContextData {
  signed: boolean;
  token: string;
  user: user | undefined;
  setUser: (user: user | undefined) => void,
  setToken: (token: string) => void
}

export const UserContext = createContext<UserContextData>({
  user: undefined,
  signed: false,
  token: '',
  setUser: () => { },
  setToken: () => { },
});


export const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<user>();
  const [token, setToken] = useState('');

  const defaultContext = {
    user,
    signed: !!user,
    token,
    setToken,
    setUser
  }

  return (
    <UserContext.Provider value={defaultContext}>
      {children}
    </UserContext.Provider>
  )
}