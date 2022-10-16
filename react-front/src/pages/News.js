import React, { createElement, useRef } from "react";
import styled from "styled-components";
import jsonData from "../news-data/news.json"


const News = () =>{

  console.log(jsonData)


  return(
    <Container>
      <MainContainer>
        <header>최신 뉴스 목록</header>
        <main>
            {jsonData.map((value,index)=>{
              return (
                <NewsBox>
                  <div>
                    <article>이미지입니당</article>
                    <section>
                      <h3>{value.title}</h3>
                      <p>{value.content}</p>
                    </section>
                  </div>
                </NewsBox>
              )
            })}
        </main>
        
      </MainContainer>
    </Container>
  )

  
}

export default News;

const Container = styled.div`
  width:100%;
  height:100%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: start;
`

const MainContainer = styled.div`
  width:60vw;
  height:80vh;

  & > header {
    padding:1%;
  
  }
  
  & > main {
    width:100%;
    height:100%;
    background-color: #f1f1f1;
    display: flex;
    flex-direction: column;
    gap:8%;
    overflow: hidden;
    padding : 20px;
    overflow-y: scroll;
  }
`

const NewsBox = styled.div`

  //전체 뉴스 박스입니다.
  & > div{
    display: flex;
    width:100%;
    height:20vh;
    background-color: white;
    padding: 20px;
    border-radius: 2px;
    box-shadow: 1px 1px 10px gray ;

    //이미지 영역 임시
    & > article {
      width: 10vw;
      height: 100%;
      background-color: coral;
    }

    //뉴스 텍스트 영역 입니다.
    & > section {
      padding:10px;
      display: flex;
      flex-direction: column;
      gap:20%;

      & > p {
        color:gray;
      }
    }
    
  }
`