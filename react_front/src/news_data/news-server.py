from flask import Flask, escape, jsonify, request
from newsCrawling import newsAdd
from flask_cors import CORS
# from newsCrawling import newsAdd


app = Flask(__name__)
CORS(app)
@app.route('/', methods=['POST'])
def hello():
  data = request.get_json()
  return jsonify(newsAdd())
  # name = request.args.get("name","hello")
  # return f'hello,{escape(name)}!'

if __name__=="__main__":
  app.run(host="127.0.0.1",port=5000, debug=True)

  