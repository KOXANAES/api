import Account from "../components/Account/Acc";
import Root from "../components/Root/Root";
import Statictics from "../components/Statistics/Statictics";
import Table from "../components/Table/Table";

import { TABLE_ROUTE, ROOT_ROUTE, STATS_ROUTE, ACC_ROUTE } from "./Consts";

export const AuthRoutes = [
  {
    path: TABLE_ROUTE,
    Component: Table
  },
  {
    path: STATS_ROUTE,
    Component: Statictics
  },
  {
    path: ACC_ROUTE,
    Component: Account
  },
]

export const PublicRoutes = [ 
  {
    path: ROOT_ROUTE,
    Component: Root
  },
]