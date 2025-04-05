import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split

def prepare_data(data: pd.DataFrame, n_days: int = 5) -> pd.DataFrame:
    # Check if data is empty
    if data.empty:
        raise ValueError("Input DataFrame cannot be empty.")
    
    # Handle MultiIndex or flat DataFrame
    if isinstance(data.columns, pd.MultiIndex):
        # Extract the ticker's sub-DataFrame (level 1 is 'Ticker')
        ticker = data.columns.levels[1][0]  # Assume single ticker, take first (e.g., 'AAPL')
        data = data.xs(ticker, level=1, axis=1)
        if 'Close' not in data.columns:
            raise ValueError(f"No 'Close' column found for ticker '{ticker}' after MultiIndex extraction.")
    elif 'Close' not in data.columns:
        raise ValueError("Input DataFrame must contain a 'Close' column.")
    
    # Ensure 'Close' is a Series and numeric
    if not isinstance(data['Close'], pd.Series):
        raise ValueError("'Close' must be a pandas Series, not a nested structure.")
    data['Close'] = pd.to_numeric(data['Close'], errors='coerce')
    if data['Close'].isna().all():
        raise ValueError("The 'Close' column contains no valid numeric data.")
    
    # Create a copy to avoid modifying the original data
    data = data.copy()
    
    # Add shifted feature columns
    for i in range(1, n_days + 1):
        data[f'Close_{i}'] = data['Close'].shift(i)
    # Add target column
    data['Target'] = data['Close'].shift(-1)
    
    # Define relevant columns for dropping NaN
    relevant_columns = [f'Close_{i}' for i in range(1, n_days + 1)] + ['Target']
    
    # Drop rows where any relevant column has NaN
    data = data.dropna(subset=relevant_columns)
    
    # Check if data is empty after dropping NaN
    if data.empty:
        raise ValueError(f"After preparing data with {n_days} days, no valid rows remain. Ensure sufficient data points.")
    
    return data

def train_model(data: pd.DataFrame, n_days: int = 5) -> tuple:
    # Prepare data
    data = prepare_data(data, n_days)
    
    # Extract features and target
    X = data[[f'Close_{i}' for i in range(1, n_days + 1)]]
    y = data['Target']
    
    # Split data into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Train the model
    model = LinearRegression()
    model.fit(X_train, y_train)
    
    return model, X_test, y_test

def predict(model, data: pd.DataFrame, n_days: int = 5) -> pd.Series:
    # Prepare data
    data = prepare_data(data, n_days)
    
    # Extract features
    X = data[[f'Close_{i}' for i in range(1, n_days + 1)]]
    
    # Make predictions
    predictions = model.predict(X)
    
    # Return predictions as a pandas Series with the same index as the prepared data
    return pd.Series(predictions, index=data.index, name='Predictions')