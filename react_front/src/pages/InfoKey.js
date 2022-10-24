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
    
      axios.post("http://localhost:5858/trade/account",
        {
          accessKey : accessKey,
          secretKey : secretKey
        },
        {
          headers :{
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      ).then((response)=>{
        console.log(response.data)
        
        //* 로컬스토리지에 데이터 저장 
        localStorage.setItem("total",JSON.stringify(response.data[0]))

        let assetArr = []
        for(let i=1;i<response.data.length; i++){
          assetArr.push(response.data[i])
        }
        for(let i=1;i<assetArr.length;i++){
          localStorage.setItem("AssetList",JSON.stringify(assetArr))
        }


        alert("저장")
      }).catch((error)=>{
        console.log(error)
      })
    
    //localStorage.setItem("accessKey",accessKey)
    //localStorage.setItem("secretKey",secretKey)
    
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