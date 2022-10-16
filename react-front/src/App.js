import React from "react";
import Main from './layout/Main';
import SideArea from "./layout/SideArea.js";
import "./index.css";
import LoginArea from "./pages/LoginArea.js";
import axios from "axios";

const insertedToken = localStorage.getItem('token');

// 토큰 유효성 검사 서버에 전송
const auth = () =>{
  axios.post('http://localhost:5858/auth/inspect',
    {
      nickname:localStorage.getItem("nickname")
    },
    {
      headers :{
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }
  ).then((response)=>{
    console.log(response);
  }).catch((error)=>{
    swal("세션만료!","로그아웃되었습니다, 로그인창으로 이동합니다.","warning").then(()=>{
      console.log(error);
      localStorage.clear();
      location.reload();
    })
    
  })
}

//페이지가 로드 되었을때 인증값 전송
if(insertedToken && localStorage.getItem("nickname") !== "admin"){
  window.onload = ()=>{ //새로고침 될때마다 실행
    auth();
  }

  let time = 1000 * 60 * 5 //5분마다 실행
  setTimeout ( function ()
    {
      auth();
    }, time );
  }else{
  }

const App = () =>{
    return (
      <>
      {
        
    //로컬스토리지에 토큰이 있을때는 메인페이지, 없을때는 로그인페이지로 이동
        insertedToken ? (
          <>
            <section>
              <Main></Main>
            </section>
            <SideArea/>
          </>
          ):(
            <>
              <LoginArea/>
            </>
          )
        }

        {/* <>
          <section>
            <Main></Main>
          </section>
          <SideArea/>
        </> */}
      </>
    )
}

export default App;