# 리플로 테스트, 자본금 10,000원, 매도 수량은 잔고에서 조회
# 원화로만 거래 가능
# def autobot (accessKey, secretKey, marketCode, capital):
import datetime as dt
start_time = dt.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
end_time = (dt.datetime.now() + dt.timedelta(1)).strftime('%Y-%m-%d %H:%M:%S')
while True:
		try:				
				import time
				import pyupbit
				import os
				import pandas as pd
				from pprint import pprint
				from dotenv import load_dotenv
				from pyupbit.exchange_api import Upbit
				
				load_dotenv()
				access_key = os.environ['ACCESS_KEY']
				secret_key = os.environ['SECRET_KEY']
				upbit = Upbit(access_key, secret_key)	

				marketCode = 'KRW-XRP'
				capital = 100000
				########################################################################
				df = pyupbit.get_ohlcv(marketCode, 'day', 3)
				df = df.astype(int)
				get_balance = upbit.get_balances()
				balance_all = pd.DataFrame(get_balance)
				balance_all.drop(['locked', 'avg_buy_price_modified', 'unit_currency'], axis =1 ,inplace=True)
				balance_all.reset_index
				currentCapital = balance_all.iat[0,1] # 현재 잔고(KRW) > 5000 일때 거래 가능
				avg_buy_price = balance_all.iat[1,2] # 코인 평균 매수 가격
				owned_balance = balance_all.iat[1,1] ## 현재 보유 코인 수량
				capital_value = round(float(avg_buy_price) * float(owned_balance)) # 코인 현재 가치(KRW) > 5000 일때 거래 가능
				
				real_time_price = pyupbit.get_current_price(marketCode) ## 실시간 현재가격
				print(real_time_price)
				yesterday = df.iloc[-2]
				today = df.iloc[-1]
				start_time = dt.datetime.now().strftime('%Y-%m-%d %H:%M:%S')

				yesterday_high = yesterday['high']
				yesterday_low = yesterday['low']
				today_high = today['high']
				today_low = today['low']
				today_open = today['open']
				today_close = today['close']

				# 조건 1 현재 변동폭이 어제 변동폭보다 커야함.
				yesterday_volatility = (yesterday_high - yesterday_low) / 100 * 0.5
				today_volatility = (today_high - today_low) / 100 * 0.5
				condition_volatility = (today_volatility > yesterday_volatility)

				# 조건 2 시초가 대비 2% 이상 상승할 때
				condition_two_per = (((today_close / today_open) - 1) > (2 / 100))
				target_buy = (condition_volatility and condition_two_per) ## 매수 조건
				condition_increase = int(float(avg_buy_price) * 1.03)
				condition_decrease = int(float(avg_buy_price) - (float(avg_buy_price) * 0.03))
				target_sell = ((condition_increase < real_time_price) or condition_decrease > real_time_price) ## 매도 조건
				print('hhahaha')
				# 
				if ((float(currentCapital)> 5000) and (target_buy == True)):
						upbit.buy_market_order(marketCode, currentCapital) # 잔고 전부 매수 #
				if ((float(capital_value))>5000 and (target_sell == True)):		
						upbit.sell_market_order(marketCode, owned_balance) # 전부 매도 #

				## 보유 자산 가치가 10000원 이하일 때 break
				if ((float(currentCapital) < 5000) and (float(capital_value) < 5000)): 
						break
				## 초기 자본금 대비 12% 누적 수익이 났을 때 break
				if ((float(currentCapital) + float(capital_value)) > float(capital) * 1.12):
						break
				## 자동매매 시작 후, 24시간이 지나면 break
				if (start_time > end_time):
						break
		except Exception as x:
					print(x)

					time.sleep(2)


