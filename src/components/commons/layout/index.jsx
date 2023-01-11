import React from "react";
import Header from "./header/Header";
import tw from "twin.macro";

const Container = tw.p`w-full`;

export default function Layout({ children }) {
  return (
    <Container>
      <Header />
      <div className="max-wmd mx-auto bg-slate-700">{children}</div>
    </Container>
  );
}
