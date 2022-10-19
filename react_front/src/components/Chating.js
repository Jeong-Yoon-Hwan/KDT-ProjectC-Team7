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
  
  window.onload = () =>{
    reloadMessage();
  }

  function reloadMessage(){
    let text = []; //? 메세지 내용
    let nickname = []; //? 유저닉네임
    let writeTime = []; //? 보낸시간
    
    axios.get("http://localhost:5858/chat",
      {
        headers :{
          Authorization : `Bearer ${localStorage.getItem("token")}`
        }
      }
    ).then((res)=>{
      console.log(res.data)
      //let value = res.data;
      
        for(let i=0;i<res.data.length;i++){
          text.push(res.data[i].text)
          nickname.push(res.data[i].nickname)
          writeTime.push(res.data[i].writeTime)
        }
        // console.log(text);
        // console.log(nickname);
        // console.log(writeTime);

      //* DB에 저장된 메시지의 개수만큼 반복하여 메시지 박스를 화면에 출력
        for(let i=0;i<text.length;i++){
          let chatBox = document.createElement("div")
          let chat = document.createElement("div")
          let message = document.createTextNode(text[i]);
          
          let nameBox = document.createElement("div")
          nameBox.textContent = nickname[i];
          chatBox.appendChild(nameBox)
          
          messageStyle(chatBox,chat,nameBox,nickname[i],localStorage.getItem('nickname'))
          
          chat.appendChild(message)
          chatBox.appendChild(chat);
          
          MessageBox.current.appendChild(chatBox)
        }
      
      }).catch((err)=>{
        console.log(err)
      })
  }

  //* 서버에서 보낸 메세지 받기
  function receiveMessage(event){
    
    
    //채팅 내용과 닉네임이 들어갈 박스
    const chatBox = document.createElement("div")

    // 채팅이 입력될 박스를 생성
    const chat = document.createElement("div")
    //메세지가 입력될요소를 생성
    const msg = JSON.parse(event.data); //msg에 data를 JSON객체로 받아옴.
    const message = document.createTextNode(msg.text)

    //* 이름이 표시될 박스
    const nameBox = document.createElement("div")
    nameBox.textContent = msg.nickname;

    chatBox.appendChild(nameBox)

    //* 메세지 타입이 "message" 일때
    if(msg.type==="message"){
      //* 채팅박스 스타일 지정 >> 일단 함수로 만들어놨음..
      //messageStyle(chat,msg.nickname,localStorage.getItem("nickname"));
      messageStyle(chatBox,chat,nameBox,msg.nickname,localStorage.getItem("nickname"));
    }else {
      alarmStyle(chat);
    }

    //메세지를 채팅박스에 추가
    chat.appendChild(message);

    //채팅박스에 chat 추가함
    MessageBox.current.appendChild(chat)
    chatBox.appendChild(chat);

    //채팅박스에 메세지를 추가함
    MessageBox.current.appendChild(chatBox)
  }
  ws.onmessage = receiveMessage //서버에 데이터가 전송되었을때 함수 실행
  
  const chat = useInput();


  //====================보내기 버튼 눌렀을때 채팅내용 담은 박스 생성====================================
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
      //!
      receiveMessage
    }).catch((error)=>{
      console.log(error)
    })

    //* 입력한 메시지 를 객제로 변환
    const msg = {
      type:"message",
      text:message,
      nickname: localStorage.getItem("nickname")
    }

    //* 객체형태로 웹소켓에 전송
    
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