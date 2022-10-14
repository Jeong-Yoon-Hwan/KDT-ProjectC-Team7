import requests
from bs4 import BeautifulSoup
import json

headers = {"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36"}

headline = []
contents = []
main_textURL = []

# main
if __name__ == "__main__":
  # 경로 입력
    inputURL = "https://news.naver.com/main/list.naver?mode=LS2D&mid=shm&sid1=101&sid2=259"
    #get 요청 : 헤더값을 같이 보내줘야함
    response = requests.get(inputURL, headers=headers)
    beautifulSoup = BeautifulSoup(response.content, "html.parser")

    title = beautifulSoup.select(".type06_headline > li > dl > dt:nth-child(2) > a")
    content = beautifulSoup.select(".lede")
    

    headline.clear() #배열값 비우기
    contents.clear()

  #select로 찾은 태그값을 반복문으로 자식태그들을 모두 출력

  #제목
    for news in title :    
      print(news.text)
      print(news['href'])
      headline.append((news.text).strip())
      main_textURL.append((news['href']).strip())
  #내용
    for news in content :
      print(news.text)
      contents.append((news.text).strip())
      
    

# 클래스 생성
class newsData:
  def __init__(self,index,title,content):
    self.index = index
    self.title = title
    self.content = content


i = 0
newsArr = []
while i < len(headline):
  newsArr.append(newsData(i+1,headline[i],contents[i]).__dict__)
  i = i+1

print(newsArr)


file_path = "./news.json"
with open(file_path,"w",encoding="UTF-8") as outfile:
  json.dump(newsArr,outfile,ensure_ascii=False,indent=4)


