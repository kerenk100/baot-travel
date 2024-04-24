import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { AddTrips } from './pages/trips/components/AddTrip/AddTrips.tsx';
import { Trips } from './pages/trips/Trips.tsx';
import VendorManager from './VendorManager.tsx';
import UserRegistration from './components/userRegistration/UserRegistration.tsx';
import EditUser from './components/userEdit/EditUser.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path:"/trips",
    element:<Trips />
  },
  {
    path:"/vendors",
    element:<VendorManager />
  },
  {
    path: "/trips/add-trips",
    element: <AddTrips />,
  },
  {
    path: "/users/register",
    element: <UserRegistration />
  },
  {
    path: '/edit/:userId',
    element: <EditUser match={{ params: { userId: '' } }} />, 
  },


]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
