import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';

/* ***Layouts**** */
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* ****Pages***** */
const Home = Loadable(lazy(() => import('../views/home/Home')))

const Router = [
  {
    path: '/',
    element: <BlankLayout />,
    children: [
      { path: '/', exact: true, element: <Home /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  }
];

export default Router;
