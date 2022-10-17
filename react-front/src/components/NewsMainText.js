import React from "react";
import styled from "styled-components";


const NewsMainText = ({setModalOpen,content}) => {
  
  const closeModal = () =>{
    setModalOpen(false);
    console.log(content[1])
  }

  return(
    <Container>
      <header>헤더</header>
      <main>{content}</main>
      <footer>
        <button onClick={closeModal}>닫기</button>
      </footer>
    </Container>
  )
}

export default NewsMainText;

const Container = styled.div`
  display: flex;
  flex-direction:column;
  width:25vw;
  height:max-content;
  background-color: gray;
  position: absolute;
  top:30%;
  left:30%;

  & > header {
    width: 100%;
    height: 5%;
  }

  & > main {
    width: 100%;
    height: max-content;
  }
`