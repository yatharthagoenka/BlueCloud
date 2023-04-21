import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* ****Pages***** */
const Home = Loadable(lazy(() => import('../views/home/Home')))
const Dashboard = Loadable(lazy(() => import('../views/dashboard/Dashboard')))
const Files = Loadable(lazy(() => import('../views/dashboard/Files')))
const Profile = Loadable(lazy(() => import('../views/dashboard/Profile')))
const Settings = Loadable(lazy(() => import('../views/dashboard/Settings')))
const Error = Loadable(lazy(() => import('../views/authentication/Error')));
const Register = Loadable(lazy(() => import('../views/authentication/Register')));
const Login = Loadable(lazy(() => import('../views/authentication/Login')));

const Router = [
  {
    path: '/',
    element: <BlankLayout />,
    children: [
      // { path: '/user', element: <Navigate to="/user/dashboard" /> },
      { path: '/', exact: true, element: <Home /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/user',
    element: <FullLayout />,
    children: [
      { path: '/user', element: <Navigate to="/user/dashboard" /> },
      { path: '/user/dashboard', exact: true, element: <Dashboard /> },
      { path: '/user/files', exact: true, element: <Files /> },
      { path: '/user/profile', exact: true, element: <Profile /> },
      { path: '/user/settings', exact: true, element: <Settings /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/auth',
    element: <BlankLayout />,
    children: [
      { path: '404', element: <Error /> },
      { path: '/auth', element: <Navigate to="/user/dashboard" /> },
      { path: '/auth/register', element: <Register /> },
      { path: '/auth/login', element: <Login /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;
