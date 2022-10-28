# 학습하는 동안 시간이 몇 십초 걸리므로, 프론트에서 admin만 호출할 수 있는 페이지를 만들어야 함.
def machineLearn():
    import pandas as pd
    import pyupbit as upbit
    import matplotlib.pyplot as plt
    import torch 
    import numpy as np
    import torch.nn as nn
    from torch.autograd import Variable 

    ticker = 'KRW-BTC'
    interval = 'day'
    count = 1845 #1845
    data = upbit.get_ohlcv(ticker=ticker, interval=interval, count=count)
    df = pd.DataFrame(data)
	
    # df.to_csv("cryptocurrency.csv", index = True)
    X = df.drop('volume', axis=1, errors="raise")
    y = df.iloc[:, 3:4]

    from sklearn.preprocessing import StandardScaler, MinMaxScaler
    mm = MinMaxScaler()
    ss = StandardScaler()

    X_ss = ss.fit_transform(X)
    y_mm = mm.fit_transform(y) 

    X_train = X_ss[:, :]
    X_test = X_ss[1573:, :]

    y_train = y_mm[:, :]
    y_test = y_mm[1573:, :]

    X_train_tensors = Variable(torch.Tensor(X_train))
    X_test_tensors = Variable(torch.Tensor(X_test))

    y_train_tensors = Variable(torch.Tensor(y_train))
    y_test_tensors = Variable(torch.Tensor(y_test))

    X_train_tensors_final = torch.reshape(X_train_tensors,   (X_train_tensors.shape[0], 1, X_train_tensors.shape[1]))
    X_test_tensors_final = torch.reshape(X_test_tensors,  (X_test_tensors.shape[0], 1, X_test_tensors.shape[1])) 

    device = torch.device('cpu')

    class LSTM1(nn.Module):
      def __init__(self, num_classes, input_size, hidden_size, num_layers, seq_length):
        super(LSTM1, self).__init__()
        self.num_classes = num_classes 
        self.num_layers = num_layers 
        self.input_size = input_size
        self.hidden_size = hidden_size 
        self.seq_length = seq_length 
        self.lstm = nn.LSTM(input_size=input_size, hidden_size=hidden_size, num_layers=num_layers, batch_first=True) 
        self.fc_1 =  nn.Linear(hidden_size, 128) 
        self.fc = nn.Linear(128, num_classes) 
        self.relu = nn.ReLU() 

      def forward(self,x):
        h_0 = Variable(torch.zeros(self.num_layers, x.size(0), self.hidden_size)).to(device)
        c_0 = Variable(torch.zeros(self.num_layers, x.size(0), self.hidden_size)).to(device)

        out, (hn, cn) = self.lstm(x, (h_0, c_0))
        hn = hn.view(-1, self.hidden_size) 
        out = self.relu(hn)
        out = self.fc_1(out)
        out = self.relu(out) 
        out = self.fc(out) 
        return out 

    num_epochs = 15000 #15000 
    learning_rate = 0.00001
    input_size = 5 
    hidden_size = 17
    num_layers = 1
    num_classes = 1
    lstm1 = LSTM1(num_classes, input_size, hidden_size, num_layers, X_train_tensors_final.shape[1]).to(device)

    loss_function = torch.nn.MSELoss()    
    optimizer = torch.optim.Adam(lstm1.parameters(), lr=learning_rate)  

    for epoch in range(num_epochs):
      outputs = lstm1.forward(X_train_tensors_final.to(device)) 
      optimizer.zero_grad() 
      loss = loss_function(outputs, y_train_tensors.to(device))

      loss.backward() 
      optimizer.step() 
      if epoch % 100 == 0:
        print("Epoch: %d, loss: %1.5f" % (epoch, loss.item())) 

    df_X_ss = ss.transform(df.drop(columns='volume'))
    df_y_mm = mm.transform(df.iloc[:, 3:4])

    df_X_ss = Variable(torch.Tensor(df_X_ss)) 
    df_y_mm = Variable(torch.Tensor(df_y_mm))
    df_X_ss = torch.reshape(df_X_ss, (df_X_ss.shape[0], 1, df_X_ss.shape[1]))

    train_predict = lstm1(df_X_ss.to(device))
    data_predict = train_predict.data.detach().cpu().numpy() 
    dataY_plot = df_y_mm.data.numpy()

    data_predict = mm.inverse_transform(data_predict) 
    dataY_plot = mm.inverse_transform(dataY_plot)
    
    # print(type(data_predict))
    # print(type(dataY_plot))
    predict = pd.DataFrame(data_predict)
    predict['count']=predict.index
    predict.rename(columns={0:'predict'},inplace=True)
    predict.reset_index()
    predict = predict[['count','predict']]
    predict = predict.astype(int)
    actual = pd.DataFrame(dataY_plot)
    actual['count']=actual.index
    actual.rename(columns={0:'actual'},inplace=True)
    actual.reset_index()
    actual = actual[['count','actual']]
    actual = actual.astype(int)
    result = pd.merge(predict, actual, how='outer', on='count')
    result = result.to_json(orient='values',indent=4)
    # print(result)
    # return result


    # print(predict)
    # print(actual)
    # print(result)

    plt.figure(figsize=(10,6)) #plotting
    plt.axvline(x=1573, c='r', linestyle='--') 
    plt.axvline(x=1845, c='r', linestyle='-.')
    plt.plot(dataY_plot, label='Actuall Data') 
    plt.plot(data_predict, label='Predicted Data') 
    plt.title('Bitcoin Prediction')
    plt.legend()
    plt.show() 

machineLearn()


    # import json as JSON
    # from numpyencoder import NumpyEncoder
    # JSON.dumps(dataY_plot, cls=NumpyEncoder, indent=4, ensure_ascii=False)

