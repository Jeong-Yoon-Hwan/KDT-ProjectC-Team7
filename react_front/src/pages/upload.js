import React from "react";
import styled from "styled-components";
import axios from "axios";

const Upload = () =>{

  axios.post("http://localhost:5858/upload/upup",
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
      <iframe src="http://localhost:5858/upload/upup" width="1100" height="800"></iframe>
    </Container>

  )
}

export default Upload;

const Container = styled.div`
  width:100%;
  height:100%;
`