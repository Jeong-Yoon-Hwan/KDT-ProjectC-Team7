import React from "react";
import styled from "styled-components";

const Upbit_total = (props) =>{
  return(
    <Container>
      <Title>보유자산</Title>
      <ContentBox>
        <section>
          <div>
            <article>
              <div>보유 KRW</div>
              <div>{props.KRW}</div>
            </article>
            <article>
              <div>
                <h4>총매수</h4>
                <p>{props.totalBuy}</p>
              </div>
              <div>
                <h4>총평가</h4>
                <p>{props.total_trade_price}</p>
              </div>
            </article>
          </div>
          {/* 총 보유자산 */}
          <div>
            <article>
              <div>총 보유자산</div>
              <div>{props.totalAsset}</div>
            </article>
            <article>
              <div>
                <h4>평가손익</h4>
                {props.total_loss < 0 ? (
                  <p style={{color:"#464BF2"}}>{props.total_loss}</p>
                  ):(
                  <p style={{color:"#E85A43"}}>{props.total_loss}</p>
                  )}
              </div>
              <div>
                <h4>수익률</h4>
                {props.revenue < 0 ? (
                  <p style={{color:"#464BF2"}}>{props.revenue}</p>
                ):(
                  <p style={{color:"#E85A43"}}>{props.revenue}</p>
                )}
              </div>
            </article>
          </div>
          

        </section>
      </ContentBox>
    </Container>
  )  
}
export default Upbit_total;

const Container = styled.div`
  width:100%;
  height:100%;
  //background-color: beige;
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
    flex-direction:row;
    
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