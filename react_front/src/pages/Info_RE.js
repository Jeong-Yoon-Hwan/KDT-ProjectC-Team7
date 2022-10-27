import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import currentPrice from "../common/currentPrice";
import calculation from "../common/calculation";
import Upbit_total from "../components/Upbit_total";
import Trade from "../components/Trade";
import Loading from "../components/Loading"
import InfoKey from "../pages/InfoKey";


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
response.data.forEach(item=>{
  assetArr.push(item)
})
}).catch((err)=>{
console.log(err)
})


let infoArr = [];
const assetArr = []; //! 가상화폐 자산정보 전체를 담는 배열.

const init = {
KRW :"",
AssetList : [],   //! 보유 자산 목록을 담는 배열.
buyList : [],   //! 매수가격을 담는 배열
totalBuy : "",  //! 총 매수가격을 담는 배열
marketCode : "", //! 마켓코드를 담는 변수
totalAsset : [],  //! 총 보유자산을 담는 배열
trade_price : [], //! 평가금액을 담는 배열
total_trade_price :"", //! 총 평가금액을 담는 변수
total_loss : [],    //! 총 평가손익을 담는 변수
revenue : [],    //! 수익률을 담는 변수
current : [], //! 현재가 정보를 담는 배열
currentList : [] //!현재가 목록
}
//const marketCode = ""; 

//* 비동기 통신이 끝나고 난후 실행하기 위해서 setTimeout 사용
setTimeout(()=>{
console.log("--가상화폐 전체 자산정보")
console.log(assetArr)

init.KRW = assetArr[0];

//? 두번째 배열부터 보유자산목록 정보라서 두번째부터 배열에 담았음
for(let i=1;i<assetArr.length;i++){
  init.AssetList.push(assetArr[i])
}

console.log("매수가격") //? 매수가격을 변수에 담았음.
init.AssetList.forEach(item=>{
  init.buyList.push(calculation.multiply(item.avg_buy_price,item.balance))
})
console.log(init.buyList);

console.log("총 매수가격") //? 총 매수가격을 변수에 담음
init.totalBuy = Math.ceil(calculation.arraySum(init.buyList))
console.log(init.totalBuy)

console.log("총 보유자산") //? 총 보유자산(보유가상화폐+KRW보유)을 변수에 담음
init.totalAsset = Math.ceil(init.totalBuy + parseInt(assetArr[0].balance))
console.log(init.totalAsset)

console.log("마켓코드") //? 마켓코드를 배열로 변수에 담음.
init.marketCode = init.AssetList.map((item)=>{
  return "KRW-"+item.currency;
})
console.log(init.marketCode)

console.log("현재가구하기") //? currentPrice 함수에 마켓코드를 넣고 현재가를 구해서 담음
currentPrice(init.marketCode)

//! 현재가 구하는 함수가 비동기라서 관련 데이터식은 1초뒤에 실행하도록 함
    setTimeout(()=>{
      
      init.current = JSON.parse(localStorage.getItem("current_price"))
      for(const key in init.current){
        init.currentList.push(init.current[key].trade_price)
      }

      console.log(init.currentList)

      console.log("평가금액 리스트 ")  //? 평가금액 리스트를 담음
      for(let i=0;i<init.AssetList.length;i++){
        init.trade_price.push(Math.ceil(calculation.multiply(init.AssetList[i].balance,init.currentList[i])))      
      }
      console.log(init.trade_price)

      console.log("총 평가금액")
      init.total_trade_price = calculation.arraySum(init.trade_price)
      console.log(init.total_trade_price)

      console.log("총평가 손익 구하기(총평가금액 X 총 매수금액)")
      init.total_loss = (init.total_trade_price - init.totalBuy)
      console.log(init.total_loss)

      console.log("수익률 구하기 (총평가 손익 / 총 매수금액") 
      init.revenue = calculation.percent(init.total_loss,init.totalBuy)
      console.log(init.revenue)
      localStorage.setItem("revenue",init.revenue)

     
      for(let i=0;i<init.AssetList.length;i++){
        let info = new infoList(
          init.AssetList[i].currency,
          init.AssetList[i].balance,
          init.AssetList[i].avg_buy_price,
          init.buyList[i],
          init.trade_price[i],
          parseInt(init.trade_price[i])-parseInt(init.buyList[i])
        )
        infoArr.push(info)
        console.log(infoArr)
      }

    },1000)
  
}, 2000)


console.log(infoArr);


function infoList(coinName,count,buyAvg,buyPrice,tradePrice,lossPrice){
  this.coinName = coinName;
  this.count = count;
  this.buyAvg = buyAvg;
  this.buyPrice = buyPrice;
  this.tradePrice = tradePrice;
  this.lossPrice = lossPrice;
}

// setTimeout(()=>{
//   Info_RE();
// },4000)

const Info_RE = (props) =>{
if(localStorage.getItem("accessKey")===null){
  return(
    <InfoKey></InfoKey>
  )
}else{

  const [render,setRender] = useState(false)
  useEffect(()=>{
    let timer = setTimeout(()=>{
      setRender(true)
    },4000)
  })

  const upbitProps ={
    KRW : Math.ceil(init.KRW.balance),
    totalBuy : init.totalBuy,
    total_trade_price : init.total_trade_price,
    totalAsset : init.totalAsset,
    total_loss : init.total_loss,
    revenue : init.revenue,
  }

  
  if(render){
    return(
      <>
        <Container>
          {/* 보유자산 */}
          <Top>
            <Upbit_total {...upbitProps}>
            </Upbit_total>
            <Trade></Trade>
          </Top>
          <Bottom>
          <ListBox>
          
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
                    <div style={{width:"10%",textAlign:"right"}}>{Math.ceil(value.buyPrice)}&nbsp;<span style={{fontSize:"12px"}}>KRW</span></div>
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
          </Bottom>
        </Container>
        
      </>
    )
  }else{
    return(
      <Loading></Loading>
    )
  }
}
}

export default Info_RE;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap:20px;
`
const Top = styled.div`
  display: flex;
`
const Bottom = styled.div`
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







