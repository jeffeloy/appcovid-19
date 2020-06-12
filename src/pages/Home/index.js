import React from "react";
import { Container, Header, TextHeader, StatusBar } from "./styles";
function Home() {
  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor="#0f7778" />
      <Header>
        <TextHeader>COVID - 19</TextHeader>
        <TextHeader>LOGO</TextHeader>
      </Header>
    </Container>
  );
}

export default Home;
