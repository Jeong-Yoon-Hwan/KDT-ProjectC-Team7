import { WebSocketServer } from 'ws';

export function webSocket(server: any) {
  const wss = new WebSocketServer({ port: 3001 });
  //웹소켓 연결
  wss.on('connection', (ws, request) => {
    //반복문을 사용하여 모든 클라이언트에게 메세지 전송
    wss.clients.forEach((client) => {
      const msg = {
        type: 'connect',
        text: `새로운 유저가 접속했습니다. 현재유저:${wss.clients.size}명`,
      };
      client.send(JSON.stringify(msg));
      //client.send(`새로운 유저가 접속했습니다. 현재유저: ${wss.clients.size}명`)
    });
    console.log(`새로운 유저 접속: ${request.socket.remoteAddress}`);

    ws.on('message', (data) => {
      wss.clients.forEach((client) => {
        client.send(data.toString());
      });
    });
  });

  wss.on('connection', (ws, request) => {
    ws.on('close', () => {
      wss.clients.forEach((client) => {
        const msg = {
          type: 'exit',
          text: `유저 한명이 떠났습니다. 현재 유저: ${wss.clients.size}명`,
        };
        client.send(JSON.stringify(msg));
      });
    });
  });
}
