//로고

import React,{useEffect, useState} from "react";
import styled from "styled-components";
import "../../src/index.css"
import UserUpdate from "./userUpdate";
import UserDelete from "./userDelete";

const nickname = localStorage.getItem("nickname");


const Logo = () =>{
  const [modalOpen,setModalOpen] = useState(false); //useState로 모달창 flase
  const showModal = () =>{
    setModalOpen(true);
  }

  const logOut = () =>{
    localStorage.clear();
    location.href="http://localhost:8000/"
  }

  const [userDeleteOpen,setUserDeleteOpen] = useState(false);
  const userDelete = () =>{
    setUserDeleteOpen(true);
  }
    return( 
      <LogoBox>
        <h1 className="logo-font">Happy Bot & Chat</h1>
        {localStorage.getItem("token") ? (
          <Button color="none">{nickname}님
          <ul>
            <li onClick={showModal}>회원정보 수정</li>
            <li onClick={userDelete}>회원탈퇴</li>
            <li onClick={logOut}>로그아웃</li>
            
          </ul>
        </Button>
        ):null}
        
        { modalOpen && <UserUpdate setModalOpen={setModalOpen} />}
        { userDeleteOpen && <UserDelete setUserDeleteOpen={setUserDeleteOpen}/>}
      </LogoBox> 
  )
}

export default Logo;
const LogoBox = styled.div`
  width:100%;
  height:10vh;
  display:flex;
  flex-direction:row;
  justify-content:center;
  align-items:center;
`;

const Button = styled.div`
  position:absolute;
  right:0;
  display:flex;
  width:max-content;
  height:max-content;
  padding:10px;
  background:${props => props.color || "#464BF2"};
  color:white;
  border:0;
  border-radius:2px;
  font-weight:bold;
  align-self:start;
  position:absolute;
  right:0;
  cursor:pointer;
  justify-content:center;
  align-items:center;
  font-size:13px;

  & > ul {
    border-radius:5px;
    display:none;
    width:max-content;
    height:max-content;
    background-color:gray;
    padding:10px;
    justify-content:end;
    align-items:end;
    margin-top:5px;
    &>li:hover{
      color:#333;
    }
  }

  :hover{
    display:flex;
    flex-direction:column;
    justify-content:end;
    align-items:end;
      ul{
        display:flex;
        flex-direction:column;
      }
  }
`