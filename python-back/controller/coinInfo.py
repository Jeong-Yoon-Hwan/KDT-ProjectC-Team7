def coin(marketCode, interval, count):
		import pandas as pd
		import pyupbit as upbit
		import datetime as dt
		data = upbit.get_ohlcv(ticker=marketCode, interval=interval, count=count)
		df = pd.DataFrame(data)
		df['date']=df.index
		df.reset_index()
		df.drop('volume', axis=1, inplace=True)
		df.drop('value',axis=1,inplace=True )
		df = df[['date','low','close','open','high']]
		df['date']=df['date'].dt.strftime('%Y%m%d')
		df=df.astype(int)
		df=df.astype({'date':'str'})
		result = df.to_json(orient='values',indent=4)
		print(df.dtypes)
		print(result)
		return result

# coin('KRW-BTC', 'day', 5)
#KRW-BTC, day, 30