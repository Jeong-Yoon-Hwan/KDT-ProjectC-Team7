//아이디 비밀번호 찾기

import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom";
import { motion } from "framer-motion"
import { useState } from "react";
import axios from "axios";


const UserFind = () =>{

  //이름 이메일 상태값 관리
  const [name,setName] = useState("");
  const handleName = (e)=> setName(e.target.value);

  const [email,setEmail] = useState("");
  const handleEmail = (e) => setEmail(e.target.value);
  console.log(name)

  function handleSubmit(event){
    event.preventDefault();

    //이름과 이메일을 입력하여 회원정보 찾기
    if(name === "" || email === ""){
      alert("이름과 이메일이 입력되지 않았습니다")
      return false;
    }

    axios.post("http://localhost:5858/auth/findPass",
      {
        name : name,
        email : email,
      }
    ).then((response)=>{
      console.log(response)
      localStorage.setItem("nickname",response.data.nickname);
      location.href="http://localhost:8000/findPass";
    }).catch((error)=>{
      console.log(error);
    })
  }

  return(
    <motion.div
      className="registerPage"
      initial={{opacity:0}}
      animate={{opacity:1,transition:"2s"}}
      exit={{opacity:0}}
    >
    <FindForm>
      <input type="text" name="name" placeholder="이름"
        value={name}
        onChange={handleName}
      />
      <input type="text" name="email" placeholder="이메일"
        value={email}
        onChange={handleEmail}
      />
      <p>* 이름과 이메일을 입력하세요 *  </p><br></br>
      <Button onClick={handleSubmit}>확인</Button>
      <Button><Link to="/">로그인 화면으로 돌아가기</Link></Button>
    </FindForm>
    </motion.div>
  )
}

export default UserFind;


const FindForm = styled.div`
  width:230px;
  height:max-content;
    & > input {
      width:228px;
      height:44px;
      margin-bottom:22px;
      padding:10px;
      border:0;
      border-radius: 2px;
    }
    & > p {
      color:white ;
      font-size:12px;
      text-align:center;
    }
    
    
`
const Button = styled.button`
  width:228px;
  height:44px;
  background:${props => props.color || "#464BF2"};
  color:white;
  border:0;
  border-radius:2px;
  font-weight:bold;
  margin-bottom:22px;  
  cursor: pointer;
      :hover {
        background-color: gray;
      }
`