import pandas as pd

# Load the dataset
df = pd.read_csv("data/Churn_Modelling.csv")

print("=" * 60)
print("First 5 Rows")
print("=" * 60)
print(df.head())

print("\nDataset Shape")
print(df.shape)

print("\nColumn Names")
print(df.columns.tolist())

print("\nData Types")
print(df.dtypes)

print("\nMissing Values")
print(df.isnull().sum())

print("\nSummary Statistics")
print(df.describe())

print("\nChurn Distribution")
print(df["Exited"].value_counts())