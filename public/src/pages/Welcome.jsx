import React from "react";
import styled from "styled-components";

function Welcome({ currentUser }) {
  return (
    <Container>
      <h2>
        Welcome,<span>{currentUser.userName} </span>
      </h2>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
`;

export default Welcome;
