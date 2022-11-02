import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./home";

export default function Routes() {
  return (
    <>
      <BrowserRouter>
        <RouteWrapper
          exact={true}
          path="/"
          component={Home}
          layout={DefaultLayout}
        />
      </BrowserRouter>
    </>
  );
}

function RouteWrapper({
  component: Component,
  layout: Layout,
  auth,
  ...rest
}: any) {
  return (
    <Route
      {...rest}
      render={(props: any) => (
        <Layout {...props}>
          <Component {...props} />
        </Layout>
      )}
    />
  );
}

const DefaultLayout = ({ children, match }: any) => <>{children}</>;
