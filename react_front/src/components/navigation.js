//네비게이션

import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

// Ul 스타일지정
const Ul = styled.ul`
  width:max-content;
  height:10vh;
  display:flex;
  justify-content:center;
  align-items:center;

  & > li {
    width:10vw;
    min-width:max-content;
    height:10vh;
    color:white;
    display:flex;
    justify-content:center;
    align-items:center;
    font-weight:bold;
    text-decoration:none;
    
  }
`

const Navigation = () =>{
  return(
    <>
    {/* 링크 값 입력되면 라우터 페이지에서 받아서 처리됨 */}
      <Ul>
        <li><Link to="/">가상화폐 순위</Link></li>
        <li><Link to="/trading">차트 조회</Link></li>
        {/* <li><Link to="/infokey">API 키 입력</Link></li> */}
        <li><Link to="/info_re">투자내역</Link></li>
        <li><Link to="/news">뉴스</Link></li>
        <li><Link to="/video">영상</Link></li>

        {localStorage.getItem("nickname") === "admin" ? (
          <li><Link to="upload">업로드</Link></li>
        ):(null)}

        <li><Link to="/download">다운로드</Link></li>
        
      </Ul>
    </>
  )
}

export default Navigation;