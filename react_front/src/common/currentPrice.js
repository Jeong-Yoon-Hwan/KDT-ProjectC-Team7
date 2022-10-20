import axios from "axios";


const currentPrice = (marketCoin) =>{
  axios.post("http://localhost:5858/trade/currentPrice",
    {
      marketCoin : [marketCoin]
    },
    {
      headers :{
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }
    
  ).then((res)=>{
    console.log(res)
    const current_price = []
    for(let i=0;i<res.data.length;i++){
      current_price.push(res.data[i])
      localStorage.setItem("current_price",JSON.stringify(current_price))
    }
    
  }).catch((error)=>{
    console.log(error)
  })
}

export default currentPrice;