import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import currentPrices from "../common/currentPrice";
import Trade from "../components/Trade";

const Info = () =>{
 
  //! 투자내역 데이터 수신
  function purchaseData(){
    axios.post("http://localhost:5858/trade/account",
      {
        accessKey : localStorage.getItem("accessKey"),
        secretKey : localStorage.getItem("secretKey")
      },
      {
        headers :{
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
    ).then((response)=>{
      console.log(response.data)
      //* 로컬스토리지에 데이터 저장 
      localStorage.setItem("total",JSON.stringify(response.data[0]))
      let assetArr = []
      for(let i=1;i<response.data.length; i++){
        assetArr.push(response.data[i])
      }
      for(let i=1;i<assetArr.length;i++){
        localStorage.setItem("AssetList",JSON.stringify(assetArr))
      }
      //console.log(assetArr);
    }).catch((error)=>{
      console.log(error)
    })
  }
  purchaseData();

  const KRW = JSON.parse(localStorage.getItem("total"))

  const getAssetList = localStorage.getItem("AssetList");
  const AssetList = JSON.parse(getAssetList);
 // console.log(AssetList[1])
  
  //!총 매수가격 구하기 대작전       (보유수량  X  매수평균가)
  const buyList = [];
  
  for(let i=0;i<AssetList.length;i++){
    console.log(AssetList[i].avg_buy_price * AssetList[i].balance)
    buyList.push(AssetList[i].avg_buy_price * AssetList[i].balance)
  }
  //console.log(buyList)
  
  const totalBuy = buyList.reduce((sum,currValue) =>{
    return Math.ceil(sum + currValue);
  })
  //총 매수금액
  //console.log(totalBuy)
  
//!총 보유자산 구하기 대작전
  const totalAsset =(totalBuy+parseInt(KRW.balance))

  const marketCode = AssetList.map((value)=>{
    return "KRW-"+value.currency;
  })
  //console.log(marketCode)
  currentPrices(marketCode);
  
  //* 현재가 구하기
  const getCurrentPrice = localStorage.getItem("current_price");
  
  //console.log(JSON.parse(getCurrentPrice))
  //* 현재가 
  const currentPrice = JSON.parse(getCurrentPrice);
  //console.log(currentPrice[1])
  
  
//!평가금액 구하기 대작전
  const trade_price = []; //평가금액 리스트
  for(let i=0;i<AssetList.length;i++){
    console.log(`${currentPrice[i].market}의 평가금액:`+AssetList[i].balance * currentPrice[i].trade_price)
    trade_price.push(AssetList[i].balance * currentPrice[i].trade_price)
  }
  //console.log(trade_price)
  const total_trade_price = trade_price.reduce((sum,currValue)=>{
    return Math.ceil(sum+currValue);
  })
  //console.log(total_trade_price)
  //!총평가 손익 구하기 대작전      (평가금액 - 매수금액)
  console.log(total_trade_price - totalBuy)
  const total_loss = (total_trade_price - totalBuy) //* 총평가 손익 
  
  //! 수익률 구하기 대작전
  console.log(total_loss / totalBuy) // 수익률
  const revenue = ((total_loss / totalBuy) * 100).toFixed(2) //*수익률

//! 코인명, 거래수량, 매수평균가, 매수금액, 평가금액, 평가손익  순서대로 저장
  function infoList(coinName,count,buyAvg,buyPrice,tradePrice,lossPrice){
    this.coinName = coinName;
    this.count = count;
    this.buyAvg = buyAvg;
    this.buyPrice = buyPrice;
    this.tradePrice = tradePrice;
    this.lossPrice = lossPrice;
  }
  //배열에 저장
  const infoArr  = [];
  
  for(let i=0;i<AssetList.length;i++){
    let info = new infoList(
      AssetList[i].currency,
      AssetList[i].balance,
      Math.ceil(AssetList[i].avg_buy_price),
      Math.ceil(buyList[i]),
      Math.ceil(trade_price[i]),
      Math.ceil(parseInt(trade_price[i])-parseInt(buyList[i]))
    )
    infoArr.push(info)
  }
  console.log(infoArr);
  return(
    <Container>
      <section>
        <header>
          <Title>
            보유자산 & 매매
            <button onClick={()=>{
              localStorage.removeItem("accessKey");
              localStorage.removeItem("secretKey");
              location.href="http://localhost:8000/infokey";
            }}>업비트 키 재입력</button>
          </Title>
          
        </header>
        <ContentBox>
          {/* 왼쪽 보유 KRW 부분 */}
          <section>
            {/* 보유KRW */}
            <div>
              {/* 위쪽 */}
              <article>
                  <div>보유 KRW</div>
                  <div>{Math.ceil(KRW.balance)}</div>
              </article>
                {/* 아래쪽 */}
              <article>
                  <div>
                    <h4>총매수</h4>
                    <p>{totalBuy}</p>
                  </div>
                  <div>
                    <h4>총평가</h4>
                    <p>{total_trade_price}</p>
                  </div>
              </article>
            </div>
            {/* 총 보유자산 */}
            <div>
              <article>
                  <div>총 보유자산</div>
                  <div>{totalAsset}</div>
              </article>
              <article>
                  <div>
                      <h4>평가손익</h4>
                      {total_loss < 0 ? (
                        <p style={{color:"#464BF2"}}>{total_loss}</p>
                      ):(
                        <p style={{color:"#E85A43"}}>{total_loss}</p>
                      )}
                      
                  </div>
                  <div>
                    <h4>수익률</h4>
                      {revenue < 0 ? (
                        <p style={{color:"#464BF2"}}>{revenue}</p>
                      ):(
                        <p style={{color:"#E85A43"}}>{revenue}</p>
                      )}
                  </div>
              </article>
            </div>
          </section>
    {/* 오른쪽 총 보유자산 부분 */}
    <Trade></Trade>    
        </ContentBox>
        <ListBox>
          <header><Title>보유자산 리스트</Title></header>
          <section>
          <div className="table-wrapper">
              <div className="column-title">
                <div style={{width:"4 %",textAlign:"start",fontSize:"15px"}}>보유자산</div>
                <div style={{width:"20%",textAlign:"center",fontSize:"15px"}}>거래수량</div>
                <div style={{width:"10%",textAlign:"center",fontSize:"15px"}}>매수평균가</div>
                <div style={{width:"10%",textAlign:"center",fontSize:"15px"}}>매수금액</div>
                <div style={{width:"10%",textAlign:"center",fontSize:"15px"}}>평가금액</div>
                <div style={{width:"10%",textAlign:"center",fontSize:"15px"}}>평가손익</div>
              </div>
              {
                //coins에 저장된 배열값을 map으로 반복
                infoArr.map((value,idx)=>(
                  <div key={idx} className="column-item">
                    <div style={{width:"4%"}}>{value.coinName}</div>
                    <div style={{width:"20%",textAlign:"right"}}>{value.count}&nbsp;<span style={{fontSize:"12px"}}>{value.coinName}</span></div>
                    <div style={{width:"10%",textAlign:"right"}}>{value.buyAvg}&nbsp;<span style={{fontSize:"12px"}}>KRW</span></div>
                    <div style={{width:"10%",textAlign:"right"}}>{value.buyPrice}&nbsp;<span style={{fontSize:"12px"}}>KRW</span></div>
                    <div style={{width:"10%",textAlign:"right",fontWeight:"bold",background:""}}>{value.tradePrice}&nbsp;<span style={{fontSize:"12px"}}>KRW</span></div>
                    {/* 금액이 음수일떄는 파란색으로 출력 */}
                    {value.lossPrice < 0 ? (
                      <div style={{width:"10%",textAlign:"right",color:"#464BF2"}}>{value.lossPrice}&nbsp;<span style={{fontSize:"12px"}}>KRW</span></div>
                    ):(
                      <div style={{width:"10%",textAlign:"right",color:"#E85A43"}}>{value.lossPrice}&nbsp;<span style={{fontSize:"12px"}}>KRW</span></div>
                    )}
                    
                  </div>
                ))
              }
            </div>
          </section>
        </ListBox>
      </section>
      
    </Container>
  )
}
export default Info;

const Container = styled.div`
display: flex;
justify-content: center;

  width:80vw;
  //min-width: 1020px;
  height:80vh;
 
  //background-color: beige;
  & > section{
    display:flex;
    flex-direction: column;
    gap:30px;
    
    
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

  & > button{
      width:228px;
      height:20px;
      background:${props => props.color || "#464BF2"};
      color:white;
      border:0;
      border-radius:2px;
      font-weight:bold;
  }
`

const ContentBox = styled.div`
  width:100%;
  height:25vh;
  min-height: 240px;
  background-color: white;
  display: flex;
  justify-content: space-between;

  /* 보유자산 왼쪽 박스 */
  & > section{
    padding:20px;
    width:30vw;
    min-width: 500px;
    height:100%;
    background-color: white;
    display: flex;
    gap:20px;
    box-shadow: 4px 4px 20px gray;
    border-radius: 2px;
    
    /* 보유 KRW */
    & > div{
      display: flex;
      flex-direction:column;
      gap:50px;
      width:50%;
      height:inherit;
      padding-top:20px;
      //background-color: white;
      
      
      /* 위쪽 >> 보유 KRW */
      & > article:nth-child(1){
        border-right: 2px solid gray;
        display: flex;
        flex-direction: column;
        gap:10px;
        & > div:nth-child(1){
          font-size: 18px;
        }
        & > div:nth-child(2){
          font-size: 30px;
        }
      }

      /* 아래쪽 총매수 총평가 */
      & > article:nth-child(2) {
        display: flex;
        flex-direction:column;
        gap:10px;
        
        & > div {
          padding-right:10px;
          display: flex;
          justify-content: space-between;
          gap:10px;
        }
      }
    }

  }

  
/* 차트 부분*/
  & > section:nth-child(2){
    width:30vw;
    height:inherit;
   // background-color: gray;
  }
`


const ListBox = styled.div`
  width:100%;
  height:30vh;
  display: flex;
  flex-direction: column;
  gap:15px;
  
  & > section{
    width:100%;
    height:inherit;
    //background-color: beige;

    .table-wrapper{
      display: grid;
      grid-template-columns: 8 1fr;
      overflow-y: scroll;
      ::-webkit-scrollbar {
        display:none /* Chrome , Safari , Opera */
      }
      
    }
    .column-title{
      display: flex;
      justify-content:space-between;
      gap:20px;
      padding:.8rem;
      align-items: center;
      background-color: #D9D9D9;
      font-weight: bold;
      position:sticky;
      top:-15px;
      border-radius: 2px;
    }
    .column-item{
      display:flex;
      justify-content: space-between;
      padding:.8rem;
      border-radius: 2px;
      border-bottom: 1px solid lightgray;
     // border:1px solid black;
      
      
      & > div{
        
      }
    }

    /* .column-item:nth-child(odd){
      background-color: #e0e0e0;
    } */
  }
`

     
    
