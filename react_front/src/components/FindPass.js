import React,{useState} from "react";
import {Link} from "react-router-dom"
import axios from "axios";
import styled from "styled-components";


const FindPass = () => {

  const [password,setPassword] = useState("");
  const handlePassword = (e) => setPassword(e.target.value);

  const [password_check,setPassword_check] = useState("");
  const handlePassword_check = (e) => setPassword_check(e.target.value);
  

  //변경할 비밀번호 서버에 전송
  const findHandle = () =>{
    if(password === ""){
      swal("","비밀번호가 입력되지 않았습니다","warning");
      return false;
    }else if(password_check === ""){
      swal("","비밀번호 확인이 입력되지 않았습니다","warning");
      return false;
    }

    axios.put("http://localhost:5858/auth/updatePass",
      { 
        nickname : localStorage.getItem("nickname"),
        password : password_check
      }
    ).then((response)=>{
      console.log(response);
      swal("비밀번호 변경성공",`${localStorage.getItem("nickname")}님의 비밀번호가 변경되었습니다. 다시 로그인해주세요`,"success").then(()=>{
        localStorage.clear();
        location.href="http://localhost:8000";
      })
    }).catch((error)=>{
      console.log(error);
    })
  }

  return(
    <Container> 
      <input type="text" value={`아이디 : ${localStorage.getItem("nickname")}`} readOnly/>
      <input type="password" value={password} onChange={handlePassword} placeholder="변경할 비밀번호 입력"/>
      <input type="password" value={password_check} onChange={handlePassword_check} placeholder="변경할 비밀번호 확인"/>
      <Button onClick={findHandle}>비밀번호 변경하기</Button>
      <Button><Link to="/">로그인 화면으로 돌아가기</Link></Button>
    </Container>
  )
}
export default FindPass;

const Container = styled.div`
    display: flex;
    flex-direction: column;
  
  input {
    width:228px;
    height:44px;
    margin-bottom:22px;
    padding:10px;
    border:0;
    border-radius: 2px;
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
`
