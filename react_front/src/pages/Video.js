import axios from "axios";
import React from "react";
import styled from "styled-components";


const Video = () =>{

  axios.post("http://localhost:5858/player/",
    {
      headers :{
        Authorization : `Bearer ${localStorage.getItem("token")}`
      }
    }
  )
  .then((res)=>{
    console.log(res)
    
  }).catch((err)=>{
    console.log(err);
  })


  return(
    <Container>
      <iframe src="http://localhost:5858/player" width="100%" height="100%"></iframe>
    </Container>
  )
}
export default Video;

const Container = styled.div`
  position: relative;
  width:100%;
  height:100%;
  & > iframe {
    position: absolute;
    
  }
`