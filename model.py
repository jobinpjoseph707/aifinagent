import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split

def prepare_data(data: pd.DataFrame, n_days: int = 5):
    for i in range(1, n_days + 1):
        data[f'Close_{i}'] = data['Close'].shift(i)
    data['Target'] = data['Close'].shift(-1)
    data = data.dropna()
    return data

def train_model(data: pd.DataFrame, n_days: int = 5):
    data = prepare_data(data, n_days)
    X = data[[f'Close_{i}' for i in range(1, n_days + 1)]]
    y = data['Target']
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    model = LinearRegression()
    model.fit(X_train, y_train)
    return model, X_test, y_test

def predict(model, data: pd.DataFrame, n_days: int = 5):
    data = prepare_data(data, n_days)
    X = data[[f'Close_{i}' for i in range(1, n_days + 1)]]
    predictions = model.predict(X)
    return predictions
