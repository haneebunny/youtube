import React from "react";
import Header from "./header/Header";
import tw from "twin.macro";

const Container = tw.div`w-full`;

export default function Layout({ children }) {
  return (
    <Container>
      <Header />
      <div className="min-h-screen bg-slate-700">{children}</div>
    </Container>
  );
}
