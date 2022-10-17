import express from 'express';
import {} from 'express-async-errors'; // 프로미스 에러 메시지를 동기 방식으로 처리 가능
import cors from 'cors'; // 외부 아이피 제한, 권한 컨트롤
import compression from 'compression'; // 압축 전송
import morgan from 'morgan'; // 다양한 로그 정보를 보임
import authRouter from './router/auth.js'; // 로그인, 회원관리
import chatRouter from './router/chat.js'; // 채팅
import uploadRouter from './router/upload.js'; // 파일(앱, 동영상, 음악) 업로드
import playerRouter from './router/player.js'; // 동영상 재생
import tradeRouter from './router/trade.js'; // 가상화폐 매매
import { config, corsOptions } from './config/config.js';
import { sqz } from './database/mysql.js';
import { webSocket } from './controller/websocket.js';

process.setMaxListeners(50);

const app = express();
app.use(express.json());
app.use(compression());
app.use(cors(corsOptions));
app.use(morgan('dev')); // 배포환경이면 'combined'로 설정, 접속자의 IP를 로그로 남겨줌

app.use('/auth', authRouter);
app.use('/chat', chatRouter);
app.use('/upload', uploadRouter);
app.use('/player', playerRouter);
app.use('/trade', tradeRouter);

app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

sqz
  .sync()
  .then(() => {
    const server = app.listen(config.server.port);
    webSocket(server);
    console.log('서버를 가동합니다');
  })
  .catch((error) => {
    console.error('연결할 수 없습니다', error);
  });
