/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { RouteItem, UserPermissions } from "./types";
import Login from "./views/Login";
import MyBooks from "./views/MyBooks";
import Dashboard from "./views/Dashboard";

const routes: RouteItem[] = [
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
    isSidebarItem: false,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "fa fa-home",
    component: Dashboard,
    layout: "/admin",
    isSidebarItem: true,
    allow: [UserPermissions.admin],
  },
  {
    path: "/my-books",
    name: "My Books",
    icon: "ni ni-circle-08",
    component: MyBooks,
    layout: "/admin",
    isSidebarItem: true,
    allow: [UserPermissions.admin],
  },
  
];
export default routes;
