import React from "react";
import { Outlet } from "react-router-dom";
import Layout from ".";

export default function Root() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
