import Loadable from 'components/controls/Loadable';
import MainLayout from 'layout/MainLayout';
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const LandingPage = Loadable(lazy(() => import('../pages/LandingPage')));
const AthletePage = Loadable(lazy(() => import('../pages/AthletePage')));

const MainRoutes: RouteObject = {
  path: '/',
  element: <MainLayout />,
  children: [
    { path: '/', element: <LandingPage /> },
    { path: 'athlete/:id', element: <AthletePage /> },
  ],
};

export default MainRoutes;
