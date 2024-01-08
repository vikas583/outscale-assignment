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
import React, { useEffect, useRef } from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import BackToTop from "../components/BackToTop";
import { useCurrentUser } from "../hooks/useCurrentUser";
import routes from "../routes";
import { RouteItem } from "../types.js";
import { checkRoles } from "../utils/checkRoles";
import Sidebar from "../components/Sidebar/Sidebar";
import { Container } from "reactstrap";
import AdminFooter from "../components/Footers/AdminFooter";
import AdminNavbar from "../components/Navbars/AdminNavbar";

const Admin: React.FC = () => {
  const { data, isLoading } = useCurrentUser();
  const router = useHistory();
  const mainContent = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    if (!isLoading && !data) {
      router.replace("/auth/login");
    }
  }, [data, isLoading, router]);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    if (document.scrollingElement) {
      document.scrollingElement.scrollTop = 0;
    }
    if (mainContent.current) {
      mainContent.current.scrollTop = 0;
    }
  }, [location]);

  const getRoutes = (routes: RouteItem[]) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        // if (prop.allow && !checkRoles(data!.roles, prop.allow)) {
        //   return null;
        // }
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  const allowedRoutes: RouteItem[] = routes
    .filter((r) => r.isSidebarItem)
    .filter((r) => {
      if (!r.allow) {
        return true;
      }
      return checkRoles(data?.roles || [], r.allow);
    });

  if (!data) {
    return null;
  }

  return (
    <>
      <Sidebar routes={allowedRoutes} />
      <div className="main-content" ref={mainContent}>
        <AdminNavbar />
        <Switch>{getRoutes(routes)}</Switch>
        <Container fluid>
          <AdminFooter />
        </Container>
        <BackToTop />
      </div>
    </>
  );
};

export default Admin;
