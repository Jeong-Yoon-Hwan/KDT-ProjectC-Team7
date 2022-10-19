import React, { useState } from "react";
import axios from "axios";


const Info = () =>{
  const [data,setData] = useState([])

  let test = [];
  purchaseData();
  function purchaseData(){
    axios.post("http://localhost:5858/trade/account",
      {
        accessKey : "uv499rjhICcrRJYn2W1auuDlVP7Vdwx9z6Z3DPxm",
        secretKey : "r5uPxxmfSrWL8gX7M8rvUrcdBqJUXMuNBiaqmcAz"
      },
      {
        headers :{
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
    ).then((response)=>{
      console.log(response.data)
      localStorage.setItem(response.data[0].currency,response.data[0].balance)
    }).catch((error)=>{
      console.log(error)
    })
  }

  
  return(
    <div>{data}
      투자내역
    </div>
  )
}
export default Info;