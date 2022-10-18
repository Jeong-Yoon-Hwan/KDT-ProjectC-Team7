from flask import Flask, escape, request

from . import newsCrawling


app = Flask(__name__)

@app.route('/')
def hello():

  newsCrawling.newsAdd()
  name = request.args.get("name","World")
  return f'hello,{escape(name)}!'

if __name__=="__main__":
  app.run(host="0.0.0.0",port=5000)

  