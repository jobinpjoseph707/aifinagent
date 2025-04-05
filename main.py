from data_fetch import fetch_data
from model import train_model, predict
import pandas as pd

def main():
    ticker = 'AAPL'
    start_date = '2020-01-01'
    end_date = '2023-01-01'
    data = fetch_data(ticker, start_date, end_date)
    print("Data type:", type(data))
    print("Columns:", data.columns)
    print("Close type:", type(data['Close']))
    print("First few rows:\n", data.head())
    model, X_test, y_test = train_model(data)
    predictions = predict(model, data)
    print("Last 5 predictions:", predictions[-5:])

if __name__ == '__main__':
    main()