import React from "react";
import styled from "styled-components";
import Logo from "../components/Logo";
import LoginForm from "../components/LoginForm";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import SignUp from "../components/SignUp";
import UserFind from "../components/UserFind";
import FindPass from "../components/FindPass";

const LoginBox = styled.div`
  width:100vw;
  height:100vh;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  gap:22px;
  background-color:#333;
`;

const LoginArea = () =>{
  return(
    <>
      <LoginBox>
        <Logo/>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginForm/>}></Route>
            <Route path="/signUp" element={<SignUp/>}></Route>
            <Route path="/userFind" element={<UserFind/>}></Route>
            <Route path="/findPass" element={<FindPass/>}></Route>
          </Routes>
        </BrowserRouter>
        
      </LoginBox>
    </>
  )
}
export default LoginArea;