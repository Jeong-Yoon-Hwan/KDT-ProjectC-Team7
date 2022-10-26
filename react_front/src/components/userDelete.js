import React,{useState} from "react";
import styled from "styled-components";
import axios from "axios";
import swal from "sweetalert";
import { motion } from "framer-motion"

const UserDelete = ({setUserDeleteOpen}) =>{
  const closeModal = () =>{
    setUserDeleteOpen(false);
  }

  const [nickname,setNickname] = useState("");
  const handleNickname = (e) => setNickname(e.target.value);

  const [password,setPassword] = useState("");
  const handlePassword = (e) => setPassword(e.target.value);

  const onSubmit = () =>{
    
    axios.delete("http://localhost:5858/auth/resign",
    {
      data : {
        nickname : nickname,
        password : password
      },
      headers :{
        Authorization : `Bearer ${localStorage.getItem("token")}`
      }
    }
    ).then((response)=>{
      swal("회원탈퇴","회원탈퇴가 완료되었습니다","success").then(()=>{
        console.log(response);
        setUserDeleteOpen(false);
        localStorage.clear();
        location.reload();
      })
      
    }).catch((error)=>{
      swal("회원탈퇴 실패","아이디와 비밀번호를 다시 확인해주세요","warning").then(()=>{
        console.log(error);
      })
      
    })
  }
  return(
  <motion.div className="registerPage" initial={{opacity:0}} animate={{opacity:1,transition:"2s"}} exit={{opacity:0,transition:"2s"}}>
    <Container>
      <header>회원탈퇴</header>
      <main>
        <input type="text" placeholder="아이디 입력"
          value={nickname}
          onChange={handleNickname}
        />
        <input type="password" placeholder="비밀번호 입력"
          value={password}
          onChange={handlePassword}
        />
        <button onClick={onSubmit}>탈퇴하기</button>
        <button onClick={closeModal}>취소</button>
      </main>
    </Container>
  </motion.div>
  )
}

export default UserDelete;

const Container = styled.div`
  color:white;
  width:349px;
  height:max-content;
  padding:20px;
  border: 0;
  z-index: 999;
  position : absolute;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
  //background-color: rgba(51,51,51,0.85);
  background-color: #333;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap:10px;

  & > header {
    display:flex;
    justify-content: center;
    align-items: center;
    width:100%;
    height:10%;
  }

  & > main {
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap:10px;
    & > input {
    width:100%;
    height:50px;
    padding:10px;
    border:0;
    border-radius: 2px;
    }
    & > button {
      width:100%;
      height:40px;
      background:#464BF2;
      color:white;
      border:0;
      border-radius:2px;
      font-weight:bold;
      cursor: pointer;
      :hover{
        background-color: gray;
      }
    }
  }
  
`