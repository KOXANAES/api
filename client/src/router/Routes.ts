import Account from "../components/Account/Acc";
import Root from "../components/Root/Root";
import Table from "../components/Table/Table";

import { TABLE_ROUTE, ROOT_ROUTE, ACC_ROUTE } from "./Consts";

export const AuthRoutes = [
  {
    path: TABLE_ROUTE,
    Component: Table
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