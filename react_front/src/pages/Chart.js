import axios from "axios";
import React,{useEffect, useState} from "react";
import styled from "styled-components";
import "../index.css";
import Graph from "../components/graph";

const Chart = () => {
    const refreshPage = () =>{
      window.location.reload();
    }

    //char의 상태값 체크박스로 변경
    const [chart,setChart] = useState(true);
    const chartHandle = () =>{
      if(chart === false){
        setChart(true);
      }else{
        setChart(false);
      }
    }

    const [loading,setLoading] = useState(true); //로딩 상태
    const [coins,setCoins] = useState([]); //코인 데이터 상태

    useEffect(()=>{
      axios.get("http://api.coinpaprika.com/v1/tickers?quotes=KRW")
      .then((response)=>{
        console.log(response.data.slice(0,100))
        setCoins(response.data.slice(0,100))
        setLoading(false);
      }).catch((error)=>{
        console.log(error);
      })
    },[])

    return(
      <Container>
        <header>
          <h1>실시간 가상화폐 순위</h1>
          <button onClick={ refreshPage }><span className="material-symbols-outlined">refresh</span></button>
          {/* <div><input onClick={chartHandle} type="checkbox" /><label>테이블</label></div> */}
        </header>
        {/* {//chart 상태가 true이면 테이블 false이면 그래프
          chart ? (
            <Graph></Graph>
          ) : ( */}
            <section>
        
          {
            loading ? <div className="loaingArea"><div className="img"></div></div> :
            (
            <div className="table-wrapper">
              <div className="column-title">
                <div style={{width:"4 %",textAlign:"start"}}>순위</div>
                <div style={{width:"20%",textAlign:"center"}}>종목</div>
                <div style={{width:"10%",textAlign:"center"}}>기호</div>
                <div style={{width:"10%",textAlign:"center"}}>가격(KRW)</div>
                <div style={{width:"10%",textAlign:"center"}}>총  시가</div>
                <div style={{width:"10%",textAlign:"center"}}>거래량(24H)</div>
                <div style={{width:"10%",textAlign:"center"}}>변동(24H)</div>
                <div style={{width:"10%",textAlign:"center"}}>변동(7D)</div>
              </div>

              {
                //coins에 저장된 배열값을 map으로 반복
                coins.map((coin,idx)=>(
                  <div key={idx} className="column-item">
                    <div style={{width:"4%"}}>{coin.rank}</div>
                    <div style={{width:"20%",textAlign:"center"}}>{coin.name}</div>
                    <div style={{width:"10%",textAlign:"center"}}>{coin.symbol}</div>
                    <div style={{width:"10%",textAlign:"center"}}>{(coin.quotes.KRW.price.toFixed(1)).toLocaleString()}</div>
                    <div style={{width:"10%",textAlign:"center"}}>{(coin.quotes.KRW.market_cap / 1000000000000).toFixed(3)}(T)</div>
                    <div style={{width:"10%",textAlign:"center"}}>{ (coin.quotes.KRW.volume_24h / 1000000000000).toFixed(3) }(T)</div>
                    <div style={{width:"10%",textAlign:"center"}}>{ coin.quotes.KRW.percent_change_24h.toFixed(2) }%</div>
                    <div style={{width:"10%",textAlign:"center"}}>{ coin.quotes.KRW.percent_change_7d.toFixed(2) }%</div>
                  </div>
                ))
              }
            </div>

            )
          }
        </section>

          {/* )  
        } */}
        
        
      </Container>
    )
  }

export default Chart;


const Container = styled.div` 

  width:100%;
  height:100%;
  background-color: white;
  overflow-y:scroll;
  -ms-overflow-style:none;
  padding:10px;
  

 
  & > header {
    display: flex;
    justify-content: center;
    align-items: center;
    margin:10px;
    gap:10px;
  }
  
  & > section {
    width:100%;
    height:100%;
    position:relative;
    .table-wrapper{
      display: grid;
      grid-template-columns: 8 1fr;
      
    }
    .column-title{
      display: flex;
      justify-content:space-between;
      gap:20px;
      padding:1rem;
      //  border:1px solid black;
      align-items: center;
      background-color: #464BF2;
      color:white;
      position:sticky;
      top:-15px;
      border-radius: 2px;
    }
    .column-item{
      display:flex;
      justify-content: space-between;
      padding:1rem;
      border-radius: 2px;
     // border:1px solid black;
      & > div{
        
      }
    }

    .column-item:nth-child(odd){
      background-color: #e0e0e0;
    }
    
  }
  //로딩
  .img {
    position: relative;
    width: 70px;
    height: 70px;
    margin: 10px;
    border: 6px solid transparent;
    border-radius: 50%;
    background-image: linear-gradient(#fff, #fff), 
    linear-gradient(to right, white 0%,  black 100%);
    background-origin: border-box;
    background-clip: content-box, border-box;
    animation: rotate_image 2s linear infinite;transform-origin: 50% 50%;
  }

  @keyframes rotate_image{
      100% {
          transform: rotate(360deg);
      }
  }

  .loaingArea{
    display: flex;
    justify-content: center;
    align-items: center;
    width:100%;
    height:100%;
    
  }

  
`