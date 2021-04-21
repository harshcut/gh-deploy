import React from "react";
import { Header, StyledOcticon } from "@primer/components";
import { RocketIcon } from "@primer/octicons-react";
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
    </>
  );
};

export default App;
