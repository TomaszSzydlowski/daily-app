import React, { useEffect } from 'react';
import authService from '../../services/authService';
import { Redirect } from 'react-router-dom';

export function Logout() {
  useEffect(() => {
    authService.logout();
  }, []);

  return <Redirect to="/login/" />;
}
