from flask import Flask, render_template, request, jsonify
from controller.stockInfo import stock
from controller.coinInfo import coin
from controller.predict import machineLearn
from flask_cors import CORS

app = Flask(__name__)
CORS()
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
   count = int(data['count'])
   return coin(marketCode, interval, count)

if __name__ == '__main__':  
   app.run('127.0.0.1',port=5959,debug=True)