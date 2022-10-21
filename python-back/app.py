from flask import Flask, render_template, request, jsonify, escape
from controller import trade
from controller import autobots
from flask_cors import CORS
from news_data.newsCrawling import newsAdd
from controller.stockInfo import stock
from controller.coinInfo import coin
from controller.predict import machineLearn

app = Flask(__name__)
CORS(app)
@app.errorhandler(500)
def error__handling_500(error):
   return jsonify({'Error':'Internal 500 error'},500)

@app.route('/predict', methods=['GET'])
def predict_learn():
   return machineLearn()

@app.route('/info_stock', methods=['POST'])
def info_stock():
   data = request.get_json()
   marketCode = data['marketCode']
   start = data['start']     
   end = data['end']
   return stock(marketCode, start, end)

@app.route('/info_coin', methods=['POST'])
def info_coin():
   data = request.get_json()
   marketCode = data['marketCode']
   interval = data['interval']
   to = data['to']
   count = int(data['count'])
   return coin(marketCode, interval,  to, count)

@app.route('/buy_order', methods=['POST'])
def buy_order():  
   data = request.get_json()
   accessKey = data['accessKey']
   secretKey = data['secretKey']
   marketCode = data['marketCode']
   price = int(data['price'])
   return trade.buy_order(accessKey, secretKey, marketCode, price)


@app.route('/sell_order', methods=['POST'])
def sell_order():
   data = request.get_json()
   accessKey = data['accessKey']
   secretKey = data['secretKey']
   marketCode = data['marketCode']
   volume = str(data['volume'])
   return trade.sell_order(accessKey, secretKey, marketCode, volume)
   

@app.route('/cancel_order', methods=['POST'])
def cancel_order():
   data = request.get_json()
   accessKey = data['accessKey']
   secretKey = data['secretKey']
   uuid = data['uuid']
   return trade.cancel_order(accessKey, secretKey, uuid)

@app.route('/autobot', methods=['POST'])
def autobot():
   data = request.get_json()
   accessKey = data['accessKey']
   secretKey = data['secretKey']
   marketCode = data['marketCode']
   capital = data['capital']
   return autobots.autobot(accessKey, secretKey, marketCode, capital)
   
@app.route('/', methods=['POST'])
def hello():
   data = request.get_json()
   return jsonify(newsAdd())

if __name__ == '__main__':  
   app.run('127.0.0.1',port=5959,debug=True)