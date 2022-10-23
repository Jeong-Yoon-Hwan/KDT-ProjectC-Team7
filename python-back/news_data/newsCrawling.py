
# 뉴스 json 저장하는 함수
def newsAdd():
    from copyreg import constructor
    import requests
    from bs4 import BeautifulSoup
    import json
    #import dload

    headers = {"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36"}

    headline = []
    contents = []
    main_textURL = []
    img_src = []
    main_text = []
# main
    # if __name__ == "__main__":
  # 경로 입 사 목록 링크
    inputURL = "https://news.naver.com/main/list.naver?mode=LS2D&mid=shm&sid1=101&sid2=259"
    #get 요청 : 헤더값을 같이 보내줘야함
    response = requests.get(inputURL, headers=headers)
    beautifulSoup = BeautifulSoup(response.content, "html.parser")

    #기사 제목
    title = beautifulSoup.select(".type06_headline > li > dl > dt:not(.photo) > a"  )
    imgSrc = beautifulSoup.select(".type06_headline > li > dl > .photo > a > img" )
    #기사내용
    content = beautifulSoup.select(".lede"  )
    #이미지
    thumbnails = beautifulSoup.select(".type06_headline > li > dl > .photo > a > img" )
    headline.clear() #배열값 비우기
    contents.clear()
    img_src.clear()  
    #   elect로 찾은 태그값을 반복문으로 자식태그들을 모두 출 
    # 제목
    for news in title :    
      #print(news.text)
      #print(news['href'])
      headline.append((news.text).strip())
      main_textURL.append((news['href']).strip())
    print(headline)
    
    for news in content :
      #print(news.text)
      contents.append((news.text).strip() )
    # 이미지 파일명 저장
    for imgs in imgSrc:
      img_src.append((imgs["src"]))

    # print(img_src 
    i = 0

      # 본문 가져오기
    while i < len(main_textURL):
      response2 = requests.get(main_textURL[i], headers= headers)
      beautifulSoup2 = BeautifulSoup(response2.content, "html.parser")
      test = beautifulSoup2.find("div",{"class":"newsct_article _article_body"})
      main_text.append(test.get_text().strip())

      i = i+1
      # 클래스 생성
    class newsData:
      def __init__(self,index,title,content,imgSrc,main_text):
        self.index = index
        self.title = title
        self.content = content
        self.imgSrc = imgSrc
        self.main_text = main_text 
        
    i = 0
    newsArr = []
    while i < len(img_src):
      newsArr.append(newsData(i+1,headline[i],contents[i],img_src[i],main_text[i]).__dict__)
      i = i+1
    print(len(headline))
    print(newsArr)  
    file_path = "./news.json"
    with open(file_path,"w",encoding="UTF-8") as outfile:
      json.dump(newsArr,outfile,ensure_ascii=False,indent=4)
     # print(newsArr)
      return newsArr    

#newsAdd()


# # 이미지 다운로드
# i=0
# for new in thumbnails:
#   src = new["src"]
#   dload.save(src,f'imgs/{img_src[i]}.jpg')
#   i+=1



