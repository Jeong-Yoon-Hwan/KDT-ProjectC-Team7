import express from 'express';
import {} from 'express-async-errors';

/**
 * middleware for application
 * cors : 외부 아이피 제한, 권한 컨트롤
 * compression : 압축 전송
 * margan : 다양한 로그 정보를 보임
 * 
 * authRouter : 로그인, 회원관리
 * chatRouter : 채팅
 * uplordRouter : 파일(앱, 동영상, 음악) 
 * playerRouter : 동영상 재생, 음악 재생
 * 
 * 해당 주석 문법이 따로 존재 : JSDOC
 */

import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';

// ./router/
import authRouter from './router/auth.js';
import chatRouter from './router/chat.js';
import uplordRouter from './router/uplord.js';
import playerRouter from './router/player.js';

/*
  ? 주석처리 관련
  * 작업 중간에는 편한만큼의 스타일대로 작업 후, 리팩토링을 진행할 때엔 위와 같이 주석처리를 하나의 항목으로 관리하는 것을 권장
  * 장점 : 주석이 '한데 모여있다' 라는 것 때문에 훑어보기 편함
  * 단점 : 당장의 코드를 읽을 때는 불편함
  * 보완 : ctrl + F (문자열 탐색) 기능을 통해 분리된 코드와 주석을 빠르게 찾는 방법
  
  ? 디렉토리 기준으로 분리
  * 주석과 같은 역할을 수행해줌
  * 장점 : '파일 이름'만 가볍게 확인 할 수 있음, 설계상의 오류때문에 디렉토리 변경시에도 상당히 편리
  * 단점 : 팀내의 협의사항에 맞추어 규칙을 지킬 경우가 많음

*/

process.setMaxListeners(0); // 이벤트 리스너 무한
const app = express();


console.log(_PORT);

// * ------------------------------------------
const _PORT = {
  portList : {
  "5000" : "live Server 테스트용 포트",
  "3001" : "리액트용 포트",
  "3006" : "DB 포트"
  },
  localHostString : "http://127.0.0.1/",

  localHostURLPortStringReturnArray: function () {
    console.log(this);
    let tempArray = [];
    for (let portNumberString in this.portList) {
      let makeURL = this.localHostString + ":" + portNumberString;
      tempArray.push(makeURL);
    }
    return tempArray;
  }
}
// * -----------------------------------------

const corsOtions = {
  orgin:_PORT.localHostURLPortStringReturnArray(),
  optionsSuccessStatus: 200,
  credentials: true,
};

// ? orgin:_PORT.localHostURLPortStringReturnArray()
/*
   * 포트와 같은 중요한 입구역할을 하거나, 변동여지가 있는 경우 리팩토링을 할때, 코드의 정리의 개념이 약간 달라짐
   * corsOtions 라는 객체의 키(key) 항목은 변하지 않을 확률이 높지만,
   * origin 이라는 속성의 배열 값은 변동여지가 상당히 높으므로 별도의 분리를 진행
   * _PORT라는 객체에 '메서드' 작성법을 활용해 조립하는 알고리즘을 작성하여 원하는 port의 갯수가 늘어나거나 줄어들거나, 혹은 로컬호스트가 아닐경우 등등 여러가지 변수를 따져보았을때 corsOtions 라는 객체는 되도록 뜯어고치는 방향을 지양하는 특성이 존재
   * 메서드 이름이 상당히 길은 이유 : 함수 이름만으로도 데이터가 무엇을 의미하는지 알수있도록 조치(재호출확률 적음)
   * 따로 객체를 떼어 작업한 이유 : 포트번호나, 로컬호스트 정보와 같은 것 조차 DB에서 꺼내와 사용할 수 있음
   * 모듈로서의 설계 구조 변경 : _PORT 객체 자체를 별도의 모듈처럼 분리할 수 있기 때문 -> 유지보수 편리

*/


app.use(express.json());
app.use(compression());
app.use(cors(corsOtions));
app.use(morgan('dev')); // 배포환경이면 'combined'로 설정, 접속자의 IP를 로그로 남겨줌

app.use('/auth', authRouter);
app.use('/chat', chatRouter);
app.use('/uplord', uplordRouter);
app.use('/player', playerRouter);

app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

app.listen(5858);