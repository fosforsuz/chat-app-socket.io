import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import React from "react";

function Logout() {
  let navigate = useNavigate();

  const handleClick = async () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Button>
      <LogoutIcon fontSize="medium" color="primary" />
    </Button>
  );
}

const Button = styled.Button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0%.5rem;
  border-radius: 1rem;
  background-color: #9aa;
  cursor: pointer;
  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }
`;

export default Logout;
