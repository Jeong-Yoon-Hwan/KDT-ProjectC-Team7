import os
# from dotenv import load_dotenv
# load_dotenv()
# access_key = os.environ['ACCESS_KEY']
# secret_key = os.environ['SECRET_KEY']

def buy_order(accessKey, secretKey, marketCode, price):
		from pyupbit.exchange_api import Upbit
		upbit = Upbit(accessKey, secretKey)
		upbit.buy_market_order(marketCode, price)
		

def sell_order(accessKey, secretKey, marketCode, volume):
		from pyupbit.exchange_api import Upbit
		upbit = Upbit(accessKey, secretKey)
		upbit.sell_market_order(marketCode, volume)
			

def cancel_order(accessKey, secretKey, uuid):
		from pyupbit.exchange_api import Upbit
		upbit = Upbit(accessKey, secretKey)
		upbit.cancel_order(str(uuid))



# buy_order(access_key, secret_key, 'KRW-XRP', 5000)

# sell_order(access_key, secret_key, 'KRW-XRP', '8')