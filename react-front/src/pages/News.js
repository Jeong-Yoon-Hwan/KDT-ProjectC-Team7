import React, { createElement, useRef } from "react";
import styled from "styled-components";
import jsonData from "../news-data/news.json"


const News = () =>{

  console.log(jsonData)



  const dummyArray = ['one','two','three','four','five']

  return(
    <Container>
      <MainContainer>
        <header>최신 뉴스 목록</header>
        <main>
            {jsonData.map((value,index)=>{
              return <NewsBox>
                <div>이미지 입니당</div>
                <h3>제목입니당</h3>
                <p>본문입니당</p>
              </NewsBox>
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
  align-items: center;
`

const MainContainer = styled.div`
  width:80%;
  height:80%;

  & > header {
    padding:1%
  }
  
  & > main {
    width:100%;
    height:100%;
    border:1px solid;
    display: flex;
    flex-direction: column;
    gap:8%;
  }
`

const NewsBox = styled.div`
  width:100%;
  height:calc((100% / 3) - 5%);
  background-color: gray;
`