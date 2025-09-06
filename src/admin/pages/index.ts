import { lazy } from 'react';

// Lazy loading des pages admin pour optimiser les performances
export const Dashboard = lazy(() => import('./Dashboard'));
export const LinksManager = lazy(() => import('./LinksManager'));
export const Analytics = lazy(() => import('./Analytics'));
export const Maintenance = lazy(() => import('./Maintenance'));
export const Login = lazy(() => import('./Login'));