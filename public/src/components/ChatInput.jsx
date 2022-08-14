import React, { useState } from "react";
import styled from "styled-components";
import SendIcon from "@mui/icons-material/Send";
import { Button } from "@mui/material";

function ChatInput({ handleMessage }) {
  const [message, setMessage] = useState("");

  const sendChat = (event) => {
    event.preventDefault();
    if (message.length > 0) {
      handleMessage(message);
      setMsg("");
    }
  };

  return (
    <Contaienr>
      <div className="container">
        <form className="input" onSubmit={(event) => sendChat(event)}>
          <input
            type="text"
            placeholder="type message here"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
          <Button variant="contained" endIcon={<SendIcon />}></Button>
        </form>
      </div>
    </Contaienr>
  );
}

const Contaienr = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  background-color: #080420;
  padding: 0 2rem;
  .container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
  }
  .input {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;

      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
  }
`;

export default ChatInput;
