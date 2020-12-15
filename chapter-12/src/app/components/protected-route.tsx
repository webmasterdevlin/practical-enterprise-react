import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';

import { saveClaimsAction } from 'features/auth/authSlice';
import { ClaimsType } from 'models/claims-type';

const ProtectedRoute = props => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');

  if (!token) {
    localStorage.clear();
    return <Redirect to={{ pathname: '/login' }} />;
  }

  const decoded: ClaimsType = jwt_decode(token);
  const expiresAt = decoded.exp * 1000;
  const dateNow = Date.now();
  const isValid = dateNow <= expiresAt;
  dispatch(saveClaimsAction(decoded));

  return isValid ? (
    <Route {...props} />
  ) : (
    <Redirect to={{ pathname: '/login' }} />
  );
};

export default ProtectedRoute;
