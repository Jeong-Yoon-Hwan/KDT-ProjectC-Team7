import React from "react"
import styled from "styled-components";

const Trading = () =>{
  return(
    <Container>
      <iframe src="http://localhost:5858/chart/upbit" width="100%" height="100%" scrolling="no"></iframe>
    </Container>
  )
}

export default Trading;

const Container = styled.div`
  position: relative;
  width:100%;
  height:100%;
  & > iframe {
    position: absolute;
    
  }
`