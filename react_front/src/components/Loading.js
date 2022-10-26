import React from "react";
import styled from "styled-components";

const Loading = () => {
  return(
    <Container>
      <Title>LOADING</Title>
      <div className="loading">
        <span></span>   
        <span></span>
        <span></span>
      </div>
    </Container>
  )
  
}
export default Loading;

const Title = styled.div`
  margin:10px;
  font-size: 30px;
  font-weight: bold;
`
const Container = styled.div`
flex-direction: column;
  width:100%;
  height:100%;
  display: flex;            /*내부 요소들이 차례로 배치 */
  justify-content: center;  /*내부 요소의 좌우 정렬 상태를 가운데로 설정*/
  align-items: center;      /*요소는 세로 중앙 배치*/
      /*웹 크기 변화에 따라 변경되는 반응형 수치*/
  

.loading span {
    display: inline-block; /* span 내부요소들을 한줄로 세우기 */
    width: 10px;
    height: 10px;
    background-color: gray;
    border-radius: 50%;    /* span을 동그랗게 */
    animation: loading 1s 0s linear infinite;
    /* 이벤트명  반복시간  딜레이시간  이벤트처리부드럽게  이벤트무한반복*/
  }
  .loading span:nth-child(1) {  /*loading의 자식 중 첫번째 span*/
    /*nth-child : 형제 사이에서의 순서*/
    animation-delay: 0s;
    background-color: #4BDB87;
  }
  .loading span:nth-child(2) {
    animation-delay: 0.2s;
    background-color: #464BF2;
  }
  .loading span:nth-child(3) {
    animation-delay: 0.4s;
    background-color: #F2DA46;
  }
@keyframes loading {        /*loading이라는 keyframe 애니메이션*/
    0%,                      /* 0, 50, 100은 구간*/
    100% {
      opacity: 0;            /* 안보였다가 */
      transform: scale(0.5); /*transform의 scale로 요소를 확대 또는 축소할 수 있음*/   
    }
    50% {
      opacity: 1;             /* 보였다가 */
      transform: scale(1.2); /* 1.2배 */
    }
  }

`