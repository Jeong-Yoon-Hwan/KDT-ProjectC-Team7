import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useInput from "../hooks/useInput";

const Trade = () =>{
  
  const [buyColor,setBuyColor] = useState("red")
  const [sellColor,setSellColor] = useState("")
  
  const [buy, setBuy] = useState(true);
  const [sell,setSell] = useState(false);

  const formHandle = (e) =>{
    console.log(e.target.value)
    if(e.target.value==="buy"){
      setBuy(true)
      setBuyColor("red")
      setSell(false)
      setSellColor("white")
    }else if(e.target.value==="sell"){
      setBuy(false)
      setBuyColor("white")
      setSell(true)
      setSellColor("red")
    }
  }
  
  // *useInput Hook 사용
  //const AccessKey = useInput();
  //const SecretKey = useInput();
  const Capital = useInput();
  
  const [CoinName,setCoinName] = useState("");
  const coinHandle = (e) =>{setCoinName(e.target.value)}

  
  const [volume,setVolumn] = useState("");
  const volumeHandle = (e) => {setVolumn(e.target.value);}

  
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

//! 매수
  const buyOrder = () =>{
    axios.post("http://localhost:5959/buy_order",
      {
        accessKey : localStorage.getItem("accessKey"),
        secretKey : localStorage.getItem("secretKey"),
        marketCode : localStorage.getItem("coinName"),
        price : Capital.value,
      },{
        headers: {
          "Content-Type": `application/json`,
        },
      }
    ).then((res)=>{
      console.log(res)
      swal({
        text: "입력하신 정보로 매수 하시겠습니까?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          swal("매수요청이 완료되었습니다.", {
            icon: "success",
          }).then(()=>{location.reload();});
        } else {
          swal("취소되었습니다.");
        }
      });
      
    }).catch((err)=>{
      console.log(err)
    })
  }

//! 매도
  const sellOrder = () =>{
    axios.post("http://localhost:5959/sell_order",
      {
        accessKey : localStorage.getItem("accessKey"),
        secretKey : localStorage.getItem("secretKey"),
        marketCode : localStorage.getItem("coinName"),
        volume : volume,
      }
    ).then((res)=>{
      console.log(res)
      
      swal({
        text: "입력하신 정보로 매도 하시겠습니까?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          swal("매도요청이 완료되었습니다.", {
            icon: "success",
          }).then(()=>{
            //location.reload();
          });
        } else {
          swal("취소되었습니다.");
        }
      });

    }).catch((err)=>{
      console.log(err)
    })
  }

  return(
    <Container>
      <Title>매매
      <button onClick={()=>{
        localStorage.removeItem("accessKey");
        localStorage.removeItem("secretKey");
        location.reload();
      }}>업비트 키 재입력</button>
      </Title>
    <ContentBox>
      
      <header>
        <Button2 value="buy" color={buyColor} onClick={formHandle}>매수</Button2>
        <Button2 value="sell" color={sellColor} onClick={formHandle}>매도</Button2>
      </header>
      {buy ? (
        //* 매수 폼
        <>
          <section>
          <input type="text" placeholder="코인명을 입력하세요" value={CoinName} onChange={coinHandle}/>
          <input type="text" placeholder="자본금을 입력하세요" value={Capital.value} onChange={Capital.onChange}/>
          </section>
          <footer>
            <Button onClick={buyOrder}>매수하기</Button>
            {/* <Button color="#E85A43" onClick={InputClear}>취소</Button> */}
          </footer>
        </>
      ):(
        //* 매도 폼
        <>
          <section>
          <input type="text" placeholder="코인명을 입력하세요" value={CoinName} onChange={coinHandle}/>
          <input type="text" placeholder="매도할 수량을 입력하세요" value={volume} onChange={volumeHandle}/>
          </section>
          <footer>
            <Button onClick={sellOrder}>매도하기</Button>
            {/* <Button color="#E85A43" onClick={InputClear}>취소</Button> */}
          </footer>
        </>
      )}
      
    </ContentBox> 
    </Container>   
  )
}

export default Trade;

const Container = styled.div`
  width:100%;
  height:100%;
`
const ContentBox = styled.div`
  width:30vw;
  min-width: 500px;
  height:25vh;
  min-height: 240px;
  border-radius: 2px;
  background-color: #333;
  box-shadow: 4px 4px 20px gray;
  padding:30px;
  display: flex;
  flex-direction: column;
  gap:10px;

  & > header {
    display: flex;
    gap:10px;
  }

  input {
    width:100%;
    height:40px;
    text-align: center;
    border-radius: 2px;
    border:none;
  }

  /* 키 입력 폼 */
  & > section{
    display: flex;
    flex-direction:column;
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
  cursor: pointer;
      :hover{
        background-color: gray;
      }
`

const Button2 = styled.button`
  width:100%;
  height:44px;
  background:${props => props.color || "white"};
  color:black;
  border:0;
  border-radius:2px;
  font-weight:bold;
  cursor: pointer;
      :hover{
        background-color: gray;
      }
`

const Title = styled.div`
  width:100%;
  height:max-content;
  padding:10px;
  border-left: 3px solid #464BF2;
  font-weight:bold;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;

  & > button{
      width:200px;
      height:15px;
      background:${props => props.color || "#464BF2"};
      color:white;
      border:0;
      border-radius:2px;
      font-weight:bold;
      cursor: pointer;
      :hover{
        background-color: gray;
      }
  }
`