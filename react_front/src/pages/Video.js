import axios from "axios";
import React from "react";
import styled from "styled-components";


const Video = () =>{

  axios.get("http://localhost:5858/player/",
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
      <iframe src="http://localhost:5858/player" style={{width:"80vw",height:"80vh",padding:"50px"}}></iframe>
    </Container>
  )
}
export default Video;

const Container = styled.div`

`