import React from "react";
import { Header, StyledOcticon, UnderlineNav } from "@primer/components";
import { RocketIcon } from "@primer/octicons-react";
import { Switch, Route, NavLink } from "react-router-dom";
import { Docs } from "./pages";
import styled from "styled-components";

const Banner = styled.header`
  background: linear-gradient(180deg, #ffffff00 60%, #fff),
    linear-gradient(70deg, #d8ecff 32%, #dcffe4);
  text-align: center;
  padding: 40px 16px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 32px;
  font-weight: 300;
`;

const Wrapper = styled.section`
  max-width: 840px;
  margin: 0 auto;
  padding: 0 16px;
`;

const App = () => {
  return (
    <>
      <Header>
        <Header.Item>
          <Header.Link href="/" fontSize={2}>
            <StyledOcticon icon={RocketIcon} size={28} mr={2} />
            <span>GitHub Deployments</span>
          </Header.Link>
        </Header.Item>
      </Header>
      <Banner>
        <Title>Instantly remove, view and manage deployments.</Title>
      </Banner>
      <Wrapper>
        <UnderlineNav aria-label="main" mb={5}>
          <UnderlineNav.Link exact to="/" as={NavLink}>
            Home
          </UnderlineNav.Link>
          <UnderlineNav.Link to="/docs" as={NavLink}>
            Documentation
          </UnderlineNav.Link>
        </UnderlineNav>
        <Switch>
          <Route exact path="/docs">
            <Docs />
          </Route>
          <Route path="/">Home</Route>
        </Switch>
      </Wrapper>
    </>
  );
};

export default App;
