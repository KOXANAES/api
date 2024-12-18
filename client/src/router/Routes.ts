import Account from "../components/Account/Acc";
import Table from "../components/Table/Table";

import Tech from "../components/Tech/Tech";

import About from "../components/Tech/About/About";
import Support from "../components/Tech/Support/Support";

import { TABLE_ROUTE, TECH_ROUTE, ACC_ROUTE, ABOUT_ROUTE, SUPPORT_ROUTE } from "./Consts";

export const AuthRoutes = [
  {
    path: TABLE_ROUTE,
    Component: Table
  },
  {
    path: ACC_ROUTE,
    Component: Account
  },
  {
    path: TECH_ROUTE,
    Component: Tech
  },
]

export const TechRoutes = [
  {
    path: ABOUT_ROUTE,
    Component: About
  },
  {
    path: SUPPORT_ROUTE,
    Component: Support
  },
]