import React,{useState} from "react";
import {Link} from "react-router-dom"
import styled from "styled-components";
import axios from "axios";
import useInput from "../hooks/useInput";
import swal from "sweetalert";


function UserUpdate({ setModalOpen }) {
    const closeModal = () =>{
      setModalOpen(false);
    }
    
    //const nickname = localStorage.getItem("nickname");
    const password = useInput();
    const password_check = useInput();
    const email = useInput();

    function onSubmit(event){
      event.preventDefault();

      if(password.value==="" && pwDisable === false){ 
        swal("","변경할 비밀번호가 입력되지 않았습니다","warning");
        return false;
      }else if(password_check.value === "" && pwDisable === false){
        swal("","변경할 비밀번호 확인이 입력되지 않았습니다","warning");
        return false;
      }else if(email.value==="" && emailDisable === false){
        swal("","변경할 이메일이 입력되지 않았습니다","warning")
        return false;
      }
      axios.put('http://localhost:5858/auth/updateUser',
        {
          nickname : localStorage.getItem("nickname"),
          password : password_check.value,
          email : email.value
        },
        {
          headers :{
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      ).then((response)=>{
        swal("회원정보 수정완료",`${localStorage.getItem("nickname")} 님의 회원정보가 수정되었습니다. 다시 로그인해주세요`,"success").then(()=>{
          console.log(response);
          localStorage.clear();
          location.reload();
          setModalOpen(false);
        });
        
      }).catch((error)=>{
        console.log(error);
      })
    }
    
    //체크박스 상태 관리
    const [pwDisable,setPwDisable] = useState(false);
    const [emailDisable,setEmailDisable] = useState(false);
    
    const checkPw = () =>{
      pwDisable ? setPwDisable(false) : setPwDisable(true);
    }
    const checkEmail = () =>{
      emailDisable ? setEmailDisable(false) : setEmailDisable(true);
    }
    return(
      
      <Container>
        <header>
          <div>회원정보 수정</div>
        </header>
        <main>
        <InputBox>
          <label>ID</label>
          <input 
            type="text"
            name="nickname"
            value = {localStorage.getItem("nickname")}
            readOnly
          />
        </InputBox>
        <InputBox>
        
          <label>PW
           <div><input onClick={checkPw} type="checkbox"/> *기존 비밀번호 사용하기* </div>  
          </label>
          <input 
            type="password"
            name="password"
            placeholder="변경할 비밀번호 입력"
            value={password.value}
            onChange={password.onChange}
            disabled={pwDisable}
            
          />  
          <input
            type="password"
            name="password_check"
            placeholder="변경할 비밀번호 확인"
            value={password_check.value}
            onChange={password_check.onChange}
            disabled={pwDisable}
          />
        </InputBox>
        <InputBox>
          <label>Email
            <div><input onClick={checkEmail} type="checkbox"/> *기존 이메일 사용하기* </div>  
          </label>
          <input
            type="email"
            name="email"
            placeholder="이메일 입력"
            value={email.value}
            onChange={email.onChange}
            disabled = {emailDisable}
          />
        </InputBox>
        </main>
        <footer>
            <button onClick={onSubmit}>확인</button>
            <button onClick={closeModal}>취소</button>
        </footer>
      
      </Container>
    )
}

export default UserUpdate;

const Container = styled.div`
  color:white;
  width:349px;
  height:500px;
  border: 0;
  z-index: 999;
  position : absolute;
  top:50%;  
  left:50%;
  transform: translate(-50%,-50%);
  background-color: rgba(51,51,51,0.85);
  border-radius: 8px;
  
  //* 헤더
  & > header {
    display:flex;
    justify-content: center;
    align-items: center;
    width:100%;
    height:10%;
  }

  //* 메인
  & > main {
    width:100%;
    //background-color: #333;
  }

  & > footer {
    display: flex;
    justify-content: center;
    align-items: center;
    width:100%;
    height:50px;
    gap:10px;
    padding:15px;

    & > button {
      width:100%;
      height:40px;
      background:#464BF2;
      color:white;
      border:0;
      border-radius:2px;
      font-weight:bold;
    }
  }
  
`
const InputBox = styled.div`
  width:100%;
  height:max-content;
  display:flex;
  flex-direction: column;
  gap:10px;
  padding:15px;

  & > label {
    display: flex;
    gap:10px;
    & > div{
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 12px;
      gap:3px;
    }
  }
  & > input {
    width:100%;
    height:50px;
    padding:10px;
    border:0;
    border-radius: 2px;
  }

  & > input[type="checkbox"]{
    width:20px;
    height:20px;
  }
`