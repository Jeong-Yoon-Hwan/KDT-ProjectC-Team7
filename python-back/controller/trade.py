import os
# from dotenv import load_dotenv
# load_dotenv()
# access_key = os.environ['ACCESS_KEY']
# secret_key = os.environ['SECRET_KEY']

def buy_order(accessKey, secretKey, marketCode, price):
		from pyupbit.exchange_api import Upbit
		upbit = Upbit(accessKey, secretKey)
		result = upbit.buy_market_order(marketCode, price)
		print(result)

def sell_order(accessKey, secretKey, marketCode, volume):
		from pyupbit.exchange_api import Upbit
		upbit = Upbit(accessKey, secretKey)
		result = upbit.sell_market_order(marketCode, volume)
		print(result)
			

def cancel_order(accessKey, secretKey, uuid):
		from pyupbit.exchange_api import Upbit
		upbit = Upbit(accessKey, secretKey)
		result = upbit.cancel_order(str(uuid))
		print(result)



# buy_order(access_key, secret_key, 'KRW-XRP', 5000)

# sell_order(access_key, secret_key, 'KRW-XRP', '8')