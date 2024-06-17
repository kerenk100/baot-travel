import VendorManager from "../pages/vendors/VendorManager";
import { AddTrips } from "../pages/trips/components/AddTrip/AddTrips";
import { Index } from "../pages/index/Index";
import UserRegistration from "../pages/users/userRegistration/UserRegistration";
import { Settings } from "../pages/settings/Settings";
import WishList from "../pages/wishlist/WishList"; // Import the WishList component

import Login from "../pages/users/login/login";
import ViewTrip from "../pages/trips/ViewTrip/ViewTrip";
import PartnerSearch from "../pages/users/partnerSearch/PartnerSearch";
import TripMap from "../pages/trips/components/TripMap/TripMap";
import TripsPage from "../pages/trips/TripsPage";

export enum Routes {
  HOME = "/",
  TRIPS = "/trips",
  TRIP = "/trips/:tripId",
  TRIPS_ADD_TRIP = "/trips/add-trips",
  TRIPS_TRIP_MAP = "/trips/:tripId/tripMap",
  VENDORS = "/vendors",
  SETTINGS = "/settings",
  USERS_REGISTER = "/users/register",
  LOGIN = "/login",
  PARTNER_SEARCH = "/users/partners-search",
  USERS_EDIT = "/users/:userId",
  WISHLIST = "/wishlist"
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
    element: <TripsPage />
  },
  {
    path: Routes.TRIPS_TRIP_MAP,
    name: "tripMap",
    element: <TripMap />
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
  {
    path: Routes.WISHLIST,
    name: "wishlist",
    element: <WishList />
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
