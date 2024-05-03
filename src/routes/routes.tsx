import Trips from "../pages/trips/Trips";
import VendorManager from "../pages/vendors/VendorManager";
import { AddTrips } from "../pages/trips/components/AddTrip/AddTrips";
import { Index } from "../pages/index/Index";
import UserRegistration from "../pages/users/userRegistration/UserRegistration";
import EditUser from "../pages/users/userEdit/EditUser";
import { Settings } from "../pages/settings/Settings";
import Login from "../pages/users/login/login";

export enum Routes {
  HOME = "/",
  TRIPS = "/trips",
  TRIPS_ADD_TRIP = "/trips/add-trips",
  VENDORS = "/vendors",
  SETTINGS = "/settings",
  USERS_REGISTER = "/users/register",
  USERS_EDIT = "/users/register/:userId",
  LOGIN = "/login",
}

export const publicRoutes = [
  {
    name: "Home",
    index: true,
    element: <Index />,
  },
  {
    path: Routes.TRIPS,
    name: "trips",
    element: <Trips />,
  },
  {
    path: Routes.VENDORS,
    name: "vendors",
    element: <VendorManager />,
  },
  {
    path: Routes.TRIPS_ADD_TRIP,
    name: "add trips",
    element: <AddTrips />,
  },
  {
    path: Routes.USERS_REGISTER,
    element: <UserRegistration />
  },
  {
    path: Routes.USERS_EDIT,
    element: <EditUser />, 
  },
  {
    path: Routes.LOGIN,
    element: <Login />,
  },
];
export const privateRoutes = [
  {
    path:Routes.SETTINGS,
    name:"settings",
    element:<Settings />
  },
];

export const allRoutes = [...privateRoutes, ...publicRoutes];
