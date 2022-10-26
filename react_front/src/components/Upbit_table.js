import React from "react";
import styled from "styled-components";

const Upbit_table = (props) => {
  
  
  return(
    <Container>
      <Title>보유자산 리스트{props[1].coinName}</Title>
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
            props.map((value,idx)=>(
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
    </Container>
  )
}

export default Upbit_table;

const Container = styled.div`

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