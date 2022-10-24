import React from 'react';
import {Link,Route,Routes,BrowserRouter} from "react-router-dom";
import Header from '../components/Header.js';
import styled from 'styled-components';
import Chart from '../pages/Chart';
import News from '../pages/News.js';
import Trading from '../pages/Trading.js';
import Info from '../pages/Info.js';
import Board from '../pages/board.js';
import Video from '../pages/Video.js';
import Upload from '../pages/upload.js';
import InfoKey from '../pages/InfoKey.js';
import Download from '../pages/Download.js';

const MainBox = styled.div`
  display: flex;
  justify-content: center; 
  align-items: center;
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
            <Route path="/video" element={<Video/>}></Route>
            <Route path="/upload" element={<Upload/>}></Route>
            <Route path='/infokey' element={<InfoKey/>}></Route>
            <Route path="/download" element={<Download/>}></Route>
          </Routes>
        </MainBox>
      </BrowserRouter>
    
	);
};




export default Main;
