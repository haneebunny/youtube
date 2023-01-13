import React from "react";
import Header from "./header/Header";
import tw from "twin.macro";

const Container = tw.div`w-full`;

export default function Layout({ children }) {
  return (
    <Container className="mx-auto flex flex-row bg-neutral-900">
      <div className="mx-auto w-full max-w-7xl">
        <Header />
        <div className="h-full min-h-screen">{children}</div>
      </div>
    </Container>
  );
}
