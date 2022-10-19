def stock(marketCode, start, end):
      import datetime as dt
      import FinanceDataReader as fdr
      df = fdr.DataReader(marketCode, start, end)
      print(df)
      df['date']=df.index
      df.reset_index()
      df.drop('Volume', axis=1, inplace=True)
      df.drop('Change',axis=1,inplace=True )
      df = df[['date','Low','Close','Open','High']]
      df['date']=df['date'].dt.strftime('%Y%m%d')
      df=df.astype(int)
      df=df.astype({'date':'str'})
      print(df)
      result = df.to_json(orient='values',indent=4)
      print(df.dtypes)
      print(result)
      return result
