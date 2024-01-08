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
import "@fortawesome/fontawesome-free/css/all.min.css";
import { StoreProvider } from 'easy-peasy';
import React from "react";
import ReactDOM from "react-dom";
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import "./assets/plugins/nucleo/css/nucleo.css";
import "./assets/scss/argon-dashboard-react.scss";
import { useCurrentUser } from "./hooks/useCurrentUser";
import AdminLayout from './layouts/Admin';
import AuthLayout from './layouts/Auth';
import videoModalStore from './stores/videoModalStore';
import './utils/firebaseInit';
import LoadingPage from './views/Loading';

Toastr.options = {
  positionClass: "toast-bottom-center"
}

const queryClient = new QueryClient()

const AppRouting = () => {
  const { isLoading } = useCurrentUser()
  return (
    <BrowserRouter>
      {
        isLoading ?
          <LoadingPage />
          :
          <Switch>
            <Route path="/admin" render={() => <AdminLayout />} />
            <Route path="/auth" render={() => <AuthLayout />} />
            <Redirect from="/" to="/auth/login" />
          </Switch>
      }
    </BrowserRouter>
  )
}

const App: React.FC = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <StoreProvider store={videoModalStore}>
          <AppRouting />
          <ReactQueryDevtools initialIsOpen={false} />
        </StoreProvider>
      </QueryClientProvider>
    </>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById("root")
);
