import Trips from "../pages/trips/Trips";
import VendorManager from "../pages/vendors/VendorManager";
import { AddTrips } from "../pages/trips/components/AddTrip/AddTrips";
import { Index } from "../pages/index/Index";
import UserRegistration from "../components/userRegistration/UserRegistration";
import EditUser from "../components/userEdit/EditUser";

export enum Routes {
  HOME = "/",
  TRIPS = "/trips",
  TRIPS_ADD_TRIP = "/trips/add-trips",
  VENDORS = "/vendors",
  SETTINGS = "/settings",
  USERS_REGISTER = "/users/register",
  USERS_EDIT = "/users/register/:userId"
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
];
export const privateRoutes = [
  {
    path: Routes.SETTINGS,
    name: "settings",
    element: <div>Settings page</div>,
  },
];

export const allRoutes = [...privateRoutes, ...publicRoutes];
