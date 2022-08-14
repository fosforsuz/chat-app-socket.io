import React, { useEffect } from "react";
import styled from "styled-components";
import { Button, FormControl, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { message } from "antd";
import axios from "axios";
import { loginRoute } from "../utils/APIRoutes";
import { useNavigate } from "react-router-dom";

const schema = yup.object({
  email: yup.string().email().required("Required Field!"),
  password: yup.string().min(6).required("Required Field!"),
});

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, []);

  const submitForm = async (register) => {
    const { email, password } = register;
    console.log(`in validation ${loginRoute}`);
    const { data } = await axios.post(loginRoute, {
      email,
      password,
    });
    if (data.status === false) {
      message.error("Login Failed!");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      message.success("Login success!");
      localStorage.setItem("chat-app-user", JSON.stringify(data.user));
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  };

  return (
    <FormContainer>
      <FormElement>
        <form onClick={handleSubmit(submitForm)}>
          <FormControl>
            <TextField
              id="filled-error-helper-text"
              type="email"
              label="Email"
              variant="filled"
              style={{ margin: "10px" }}
              error={!!errors.email}
              helperText={errors.email?.message}
              {...register("email")}
            />
            <TextField
              id="filled-error-helper-text"
              type="password"
              label="Password"
              variant="filled"
              style={{ margin: "10px" }}
              error={!!errors.password}
              helperText={errors.password?.message}
              {...register("password")}
            />
            <Button
              variant="contained"
              style={{ margin: "10px" }}
              color="primary"
            >
              Create New User
            </Button>
            <span>
              Do not have an account <Link to="/register">Register</Link>
            </span>
          </FormControl>
        </form>
      </FormElement>
    </FormContainer>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: #131324;
`;

const FormElement = styled.div`
  background-color: #eeeeeee9;
  height: 60vh;
  width: 20vw;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
`;

export default Register;
