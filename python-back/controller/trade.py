import os
from dotenv import load_dotenv
load_dotenv()
access_key = os.environ['ACCESS_KEY']
secret_key = os.environ['SECRET_KEY']

def buy_order(access, secret, market, price):
		from pyupbit.exchange_api import Upbit
		try:
			upbit = Upbit(access, secret)
			upbit.buy_market_order(market, str(price))
		except Exception as x:
			print(x)
			return None

def sell_order(access, secret, market, volume):
		from pyupbit.exchange_api import Upbit
		try:
			upbit = Upbit(access, secret)
			upbit.sell_market_order(market, str(volume))
		except Exception as x:
			print(x)
			return None

def sell_order(access, secret, uuid):
		from pyupbit.exchange_api import Upbit
		try:
			upbit = Upbit(access, secret)
			upbit.sell_market_ordder(str(uuid))
		except Exception as x:
			print(x)
			return None




