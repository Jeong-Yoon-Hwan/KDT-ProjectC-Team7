# 노드 서버(웹서비스용)

주제 : auto trading & talk

1. 개발환경 <br>
   macOS (윈도우 환경과 합칠 때 경로 확인하기)<br>
   node.js<br>
   express<br>

2. 디렉토리<br>
   client : 서버에서 자체적으로 띄워주는 웹페이지<br>
   data : 데이터베이스 관리<br>
   database: 데이터베이스 연결<br리
   controller : 메인 로직을 담당<br>
   middleware : 추가적인 일을 담당<br>
   router : 엔드포인트와 해당 엔드포인트에서 실행돼야 할 로직을 연결해주는 역할<br>
   src : 공통적으로 쓰일 모듈 모아두는 곳(변동 가능)<br>
   upload : 업로드된 파일이 저장되는 곳<br>
   video : 동영상 모음<br>

3. 개별 파일<br>
   app.js : 메인 파일<br>
   node.txt : 기능 구현에 필요한 개념을 정리한 노트<br>
   app-review : 선생님의 코드 리뷰<br>

4. 기능<br>
   로그인 - 완료<br>
   회원정보관리 - 완료<br>
   파일 업로드 - 완료<br>
   파일 다운로드 - 완료<br>
   영상 재생 - 완료<br>
   로그인 후 채팅 - 완료<br>
   가상화폐 및 계좌 정보 조회 - 완료<br>
   가상화폐 매매 관련 - 파이썬으로 제작
   <br>
5. To Do<br>
   1. 변동 사항이 있을 때마다 업데이트 할 예정<br>
   2. 간간히 리팩터링하기<br>
