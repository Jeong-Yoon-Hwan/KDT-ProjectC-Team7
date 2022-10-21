import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useInput from "../hooks/useInput";

const AutoTrade = () =>{

  // *useInput Hook 사용
  const AccessKey = useInput();
  const SecretKey = useInput();
  const Capital = useInput();
  
  const [CoinName,setCoinName] = useState("");
  const coinHandle = (e) =>{setCoinName(e.target.value)}

  //코인명 입력시 coinCheck함수 실행시켜서 마켓코드를얻음
  useEffect(()=>{
    coinCheck();
    
    //console.log(CoinName)
  },[CoinName])
  
  //*한글로 입력한 코인으로 마켓코드 조회
  function coinCheck(){
    axios.post("http://localhost:5858/trade/wantName",
      {
        name : CoinName
      }
    ).then((res)=>{
      console.log(res.data)
      localStorage.setItem("coinName",res.data)
    }).catch((err)=>{
      //console.log(err);
    })
  }

  function InputClear(){
    setCoinName("");
    
  }

  return(
    <Container>
      <section>
          <input type="text" placeholder="AccessKey를 입력하세요" value={AccessKey.value} onChange={AccessKey.onChange}/>
          <input type="text" placeholder="SecretKey를 입력하세요" value={SecretKey.value} onChange={SecretKey.onChange}/>
      </section>
      <section>
          <input type="text" placeholder="코인명을 입력하세요" value={CoinName} onChange={coinHandle}/>
          <input type="text" placeholder="자본금을 입력하세요" value={Capital.value} onChange={Capital.onChange}/>
      </section>
      <footer>
        <Button>저장</Button>
        <Button color="#E85A43" onClick={InputClear}>취소</Button>
      </footer>
    </Container>    
  )
}

export default AutoTrade;


const Container = styled.div`
  width:30vw;
  min-width: 500px;
  height:inherit;
  min-height: 240px;
  border-radius: 2px;
  background-color: #333333;
  box-shadow: 4px 4px 20px gray;
  padding:30px;
  display: flex;
  flex-direction: column;
  gap:10px;

  input {
    width:100%;
    height:40px;
    text-align: center;
    border-radius: 2px;
    border:none;
  }

  /* 키 입력 폼 */
  & > section:nth-child(1){
    display: flex;
    flex-direction:column;
    gap:10px;
    
  }

  /* 코인명, 자본금 입력폼 */
  & > section:nth-child(2){
    display: flex;
    gap:10px;
  }

  & > footer {
    display: flex;
    gap: 10px;
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