import React, { createElement, useRef, useState } from "react";
import styled from "styled-components";
import jsonData from "../../../python-back/news_data/news.json";
import NewsMainText from "../components/NewsMainText";
import axios from "axios"


const News = () =>{
  console.log(jsonData)


  //뉴스 새로고침
  const newsRefresh = () =>{
    axios.get("http://127.0.0.1:5959",
    {
      "name" : "hello",
    }
    ).then((response)=>{
      console.log(response)
      location.reload();
    }).catch((error)=>{
      console.log(error)
    })
    
  }
  
  const [title,setTitle] = useState("")
  const [mainText,setMainText] = useState("")
  

  const [modalOpen,setModalOpen] = useState(false)
  const modalHandle = (title,mainText) =>{
    setModalOpen(true);
    setTitle(title);
    setMainText(mainText);
  }

  return(
    <Container>
      <MainContainer>
        <header>
          <h3>최신 금융 기사</h3>
          <Button onClick={newsRefresh}>새로고침</Button>
        </header>
        <main>
            {jsonData.map((value,index)=>{
              return (
                <NewsBox key={index} onClick={()=>{
                  modalHandle(value.title,value.main_text)
                }}>
                  <div>
                    <img src={value.imgSrc}></img>
                    <section>
                      <h3>{value.title}</h3>
                      <p>{value.content}</p>
                    </section>
                  </div>
                </NewsBox>
              )
            })}
        </main>
        { modalOpen && <NewsMainText setModalOpen={setModalOpen} title={title} mainText={mainText}/>}
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
    display: flex;
    justify-content: space-between;
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
    position: relative;
    ::-webkit-scrollbar {
	    display:none /* Chrome , Safari , Opera */
    }
    
  }
`

const NewsBox = styled.div`
   
  //전체 뉴스 박스입니다.
  & > div{
    //background:${props => props.color || "#464BF2"};
    display: flex;
    width:100%;
    min-width: 400px;
    //height:15vh;
    height:15vh;
    min-height: 150px;
    background-color: white;
    padding: 20px;
    border-radius: 2px;
    box-shadow: 1px 1px 10px gray ;
    overflow: hidden;
    //이미지 영역 임시
    & > img {
      width: 150px;
      height:100px;
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



const Button = styled.button`
  width:228px;
  height:44px;
  background:${props => props.color || "#464BF2"};
  color:white;
  border:0;
  border-radius:2px;
  font-weight:bold;
`