import React from "react";
import Header from "./Header";
import { Global, css } from "@emotion/react";
import Head from "next/head";

const Layout = (props) => {
  return (
    <>
    

     
      <Header />

      <main>{props.children}</main>
    </>
  );
};

export default Layout;
