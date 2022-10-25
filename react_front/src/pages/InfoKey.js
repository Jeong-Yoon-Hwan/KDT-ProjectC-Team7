import React, { useEffect, useState } from "react";
import Info from "./Info";
import styled from "styled-components";
import axios from "axios";
import { SwitchLayoutGroupContext } from "framer-motion";
import { Link } from "react-router-dom";


const InfoKey = () =>{

  const [accessKey,setAccessKey] = useState("");
  const accessKeyHandle = (e) =>{
    setAccessKey(e.target.value)
  }
  const [secretKey,setSecretKey] = useState("");
  const secretKeyHandle = (e) =>{
    setSecretKey(e.target.value);
  } 
  useEffect(()=>{
    setAccessKey(accessKey)
    setSecretKey(secretKey)
    console.log(accessKey)
    console.log(secretKey)
  },[accessKey,secretKey])
  const onSubmit = () =>{
    
    localStorage.setItem("accessKey",accessKey)
    localStorage.setItem("secretKey",secretKey)
    alert("저장")
  }

  return(
    <Main>
    <Title>업비트 키 입력</Title>
    <Container>
      <div>
        <input type="text" onChange={accessKeyHandle} value={accessKey} placeholder={"AccessKey를 입력하세요"}/>
        <input type="text" onChange={secretKeyHandle} value={secretKey} placeholder={"SecretKey를 입력하세요"}/>
        <Button onClick={onSubmit}>저장</Button>
      </div>
    </Container>    
    </Main>
  )
}

export default InfoKey;

const Main = styled.div`
display:flex;
flex-direction:column;
gap:10px;
`

const Container = styled.div`
  width:30vw;
  min-width: 500px;
  height:200px;
  min-height: 240px;
  border-radius: 2px;
  background-color: #333333;
  box-shadow: 4px 4px 20px gray;
  padding:30px;
  display: flex;
  flex-direction: column;
  gap:10px;

  & > div{
    display: flex;
    flex-direction: column;
    gap:20px;
  }
  input {
    width:100%;
    height:40px;
    text-align: center;
    border-radius: 2px;
    border:none;
  }
  

`

const Button = styled.button`
  width:100%;
  height:44px;
  background:${props => props.color || "#464BF2"};
  color:white;
  border:0;
  border-radius:2px;
  font-weight:bold;
`
const Title = styled.div`
  width:100%;
  height:max-content;
  padding:10px;
  border-left: 3px solid #464BF2;
  font-weight:bold;
  display: flex;
  justify-content: space-between;
`