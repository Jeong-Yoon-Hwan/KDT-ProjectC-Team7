import React from "react";
import styled from "styled-components";


const NewsMainText = ({setModalOpen,title,mainText}) => {
  console.log(title)
  const closeModal = () =>{
    setModalOpen(false);
  }

  return(
    <Container>
      <header><h3>{title}</h3></header>
      <main>{mainText}</main>
      <footer>
        <Button onClick={closeModal}>닫기</Button>
      </footer>
    </Container>
  )
}

export default NewsMainText;

const Container = styled.div`
  display: flex;
  flex-direction:column;
  width:45vw;
  max-height: 600px;
  height:max-content;
  background-color: white;
  position: absolute;
  top:20%;
  left:30%;
  padding:2vw;
  border-radius: 5px;
  gap:10px;
  box-shadow: 4px 4px 30px;
  z-index: 1;
  overflow-y: scroll;

  & > header {
    width: 100%;
    height: 5%;
    border-bottom:1px solid gray;
    padding: 10px;
  }

  & > main {
    width: 100%;
    height: max-content;
    line-height: 1.7em;
  }
  & > footer {
    display: flex;
    justify-content: center;
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