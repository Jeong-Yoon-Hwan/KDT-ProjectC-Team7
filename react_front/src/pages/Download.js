import React from "react";
import styled from "styled-components";

const Download = () =>{
  return(
    <Container>
      <iframe src="http://localhost:5858/download" width="100%" height="100%"></iframe>
    </Container>  
  )
  
}

export default Download;

const Container = styled.div`
  position: relative;
  width:100%;
  height:100%;
  & > iframe {
    position: absolute;
    
  }
`