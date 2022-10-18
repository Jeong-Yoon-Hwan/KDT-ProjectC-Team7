// 헤더
import React from 'react';
import styled from 'styled-components';
import Navigation from './navigation';

const HeaderBox = styled.div`
  width:100%;
  height:10vh;
  background:#333;
`

const Header=({children})=> {
    return (
		<HeaderBox>
      <Navigation></Navigation>
		</HeaderBox>
    );
}

export default Header;
