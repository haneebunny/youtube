import React from "react";
import Header from "./header/Header";
import tw from "twin.macro";

const Container = tw.div`w-full`;

export default function Layout({ children }) {
  return (
    <Container>
      <Header />
      <div className="h-full min-h-screen bg-gray-800">{children}</div>
    </Container>
  );
}
