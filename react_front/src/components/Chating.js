import React,{useRef,useState} from "react"
import styled from "styled-components"
import axios from "axios"
import useInput from "../hooks/useInput";
import messageStyle from "../common/chatMessageStyle";
import alarmStyle from "../common/alarmMessageStyle";


const ws = new WebSocket("ws://localhost:3001");


const Chating = () => {
  const inputRef = useRef();
  const clearInput = () =>{
    inputRef.current.value="";
  }

  const MessageBox = useRef("");  //! 메세지가 표시되는 박스
  const AlarmBox = useRef("");    //! 알림이 표시되는 박스
  
  //* 서버에서 보낸 메세지 받기
  function receiveMessage(event){
    // 채팅이 입력될 박스를 생성
    const chat = document.createElement("div")
    //메세지가 입력될요소를 생성
    const msg = JSON.parse(event.data); //msg에 data를 JSON객체로 받아옴.
    const message = document.createTextNode(msg.text)

    //* 메세지 타입이 "message" 일때
    if(msg.type==="message"){
      //* 채팅박스 스타일 지정 >> 일단 함수로 만들어놨음..
      messageStyle(chat,msg.nickname,localStorage.getItem("nickname"));
    }else {
      alarmStyle(chat);
    }
    
    //메세지를 채팅박스에 추가
    chat.appendChild(message);

    //채팅박스에 chat 추가함
    MessageBox.current.appendChild(chat)
    
  }
  ws.onmessage = receiveMessage //서버에 데이터가 전송되었을때 함수 실행
  
  const chat = useInput();

  //보내기 버튼 눌렀을때 채팅내용 담은 박스 생성
  const onSubmit = () =>{  
    //인풋에 입력한 값을 message로 전송
    const message = chat.value;

    axios.post("http://localhost:5858/chat",
      {
        nickname : localStorage.getItem("nickname"),
        text : chat.value        
      }

    ).then((response)=>{
      console.log(response)
    }).catch((error)=>{
      console.log(error)
    })

    const msg = {
      type:"message",
      text:message,
      nickname: localStorage.getItem("nickname")
    }
    ws.send(JSON.stringify(msg));

    const inputValue = document.getElementById("chat");
    
    if(inputValue.value===""){
      alert("채팅 안치셨어요");
      clearInput();
    }else{
    }
    clearInput();
  }
//엔터키를 눌렀을때 submit 입력
  const onEnter = (e) =>{
    if(e.key === "Enter"){
      onSubmit();
      clearInput();
    }
  }

  return(
    
    <MainBox>
      <main id="chatBox">
        <div ref={AlarmBox}></div>
        <div ref={MessageBox}></div>
      </main>
      <section>
        <input 
          id="chat"
          type="text"
          name="chat"
          value={chat.value}
          onChange={chat.onChange}
          onKeyUp={onEnter}
          ref={inputRef}
        />
        <button onClick={onSubmit}>보내기</button>
        {/* <button></button> */}
        
      </section>
    </MainBox>
    
  )
}




export default Chating;





const Alarm = styled.div`
  width:100%;
  height:25px;
  background-color: gray;
`
const MainBox = styled.div`
  width:inherit ;
  height:90vh;
  
  //메인채팅창//
  & > main {
    position:relative;
    width: inherit;
    height:calc(100% - 50px);
    background-color:#f1f1f1;
    display:flex;
    flex-direction:column;
    justify-content:end;
    overflow:hidden;

      //전체 채팅박스
      & > div {
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:end; 
      }
  }

//채팅 입력칸
  & > section{
    width:inherit;
    height:50px;
    background-color:white;
    box-shadow: 0 -4px 4px #f1f1f1;
    display:flex;
    align-items:center;
    justify-content:end;

      & > input {
        border:0;
        padding:10px;
        outline:none;
        width:90%;
        height:inherit;
      }

      & > button {
        width:80px;
        height:50px;
        background-color:#464BF2;
        color:white;
        border:0;
        border-radius:2px;
        font-weight:bold;
      }
  }
`