//회원가입 폼 

import React,{useState} from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";


const SinUpBox = styled.div`
  width:230px;
  height:max-content;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;

    input{
      width:228px;
      height:44px;
      margin-bottom:22px;
      padding:10px;
      border:0;
      border-radius:2px;
    }
    button{
      width:228px;
      height:44px;
      background:${props => props.color || "#464BF2"};
      color:white;
      border:0;
      border-radius:2px;
      font-weight:bold;
      margin-bottom:22px;
    }
`;



const SignUp = () =>{

  const [inputValue,setInputValue] = useState({
    nickname:'',
    name:'',
    password:'',
    email:'',
  })

  const inputChangeHandler = (e) => {
    setInputValue({
      ...inputValue,
      [e.target.name] : e.target.value
      
    })
    console.log(e.target.name);
  }

  const doSignUp =  (event) =>{
    event.preventDefault();
    
    axios.post("http://localhost:5858/auth/signUp",
      {
        nickname : inputValue.nickname,
        password : inputValue.password,
        email : inputValue.email,
        name : inputValue.name
      }
    ).then((response)=>{
      console.log(response);
      swal("회원가입 성공","회원가입이 완료되었습니다 로그인 해주세요","success").then( ()=>{location.href="http://localhost:8000/"})
    }).catch((error)=>{
      console.log(error);
      swal("회원가입 실패","회원가입에 실패했습니다 입력정보를 다시 확인해주세요","warning").then(()=>{
      })
    })
  }

  return (
    <motion.div
      className="registerPage"
      initial={{opacity:0}}
      animate={{opacity:1,transition:"2s"}}
      exit={{opacity:0}}
    >
      <SinUpBox>
        <form>
          <input type="text" 
                name="name"
                placeholder="이름"
                onChange={inputChangeHandler}/>
          <input type="text" 
                name="nickname"
                placeholder="아이디"
                onChange={inputChangeHandler}/>
          <input type="password" 
                name="password"
                placeholder="비밀번호"
                onChange={inputChangeHandler}/>
          
          <input type="text"
                name="email"
                placeholder="이메일"
                onChange={inputChangeHandler}/>
          <button onClick={doSignUp}>가입하기</button>
        </form>
        <button><Link to ="/">로그인 페이지로 돌아가기</Link></button>
      </SinUpBox>
    </motion.div>
  )
}

export default SignUp;