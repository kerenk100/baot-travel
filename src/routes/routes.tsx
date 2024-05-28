import Trips from "../pages/trips/Trips";
import TripsList from "../pages/trips/TripsList";
import VendorManager from "../pages/vendors/VendorManager";
import { AddTrips } from "../pages/trips/components/AddTrip/AddTrips";
import { Index } from "../pages/index/Index";
import UserRegistration from "../pages/users/userRegistration/UserRegistration";
import { Settings } from "../pages/settings/Settings";
import WishList from "../pages/wishlist/WishList"; // Import the WishList component

import Login from "../pages/users/login/login";
import ViewTrip from "../pages/trips/viewTrip/ViewTrip";
import PartnerSearch from "../pages/users/partnerSearch/PartnerSearch";

export enum Routes {
  HOME = "/",
  TRIPS = "/trips",
  TRIP = "/trips/:tripId",
  TRIPS_ADD_TRIP = "/trips/add-trips",
  VENDORS = "/vendors",
  SETTINGS = "/settings",
  USERS_REGISTER = "/users/register",
  LOGIN = "/login",
  PARTNER_SEARCH = "/users/partners-search",
  USERS_EDIT = "/users/:userId",
  WISHLIST = "/wishlist", // Add the WISHLIST route

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
    path: Routes.TRIP,
    name:"trip",
    element:<ViewTrip />
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
    path: Routes.PARTNER_SEARCH,
    element: <PartnerSearch />
  },
  {
    path: Routes.USERS_EDIT,
    element: <UserRegistration />, 
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
