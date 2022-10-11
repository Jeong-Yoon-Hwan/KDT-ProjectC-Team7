import React from 'react';
import {Link,Route,Routes,BrowserRouter} from "react-router-dom";
import Header from '../components/Header.js';
import styled from 'styled-components';
import Chart from '../pages/Chart';
import News from '../pages/News.js';
import Trading from '../pages/Trading.js';
import Info from '../pages/Info.js';
import Board from '../pages/board.js';

const MainBox = styled.div`
  width:calc(100vw - 400px); 
  height:90vh; 
  background-color:white;
`;

const Main = (props) => {
	return (
      <BrowserRouter>
      {/* 헤더 고정 */}
        <Header/> 
      {/* 메인박스 지정하고 라우터 설정 */}
        <MainBox>
          <Routes>
            <Route path="/" element={<Chart/>}></Route>
            <Route path="/news" element={<News/>}></Route>
            <Route path="/trading" element={<Trading/>}></Route>
            <Route path="/info" element={<Info/>}></Route>
            <Route path="/board" element={<Board/>}></Route>
          </Routes>
        </MainBox>
      </BrowserRouter>
    
	);
};




export default Main;
