/* 파이썬 서버와의 데이터 공유 테스트 */
import axios from 'axios';

export async function nodeTest(req, res, next) {
  try {
    const response = await axios.get('http://127.0.0.1:5000/node');
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
}
nodeTest();
