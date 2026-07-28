import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (
    accuracy_score,
    confusion_matrix,
    classification_report
)

# Load dataset
df = pd.read_csv("data/Churn_Modelling.csv")

# Drop unnecessary columns
df = df.drop(columns=["RowNumber", "CustomerId", "Surname"])

# Encode categorical variables
gender_encoder = LabelEncoder()
geo_encoder = LabelEncoder()

df["Gender"] = gender_encoder.fit_transform(df["Gender"])
df["Geography"] = geo_encoder.fit_transform(df["Geography"])

# Features and target
X = df.drop("Exited", axis=1)
y = df["Exited"]

# Train/Test Split
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# Create model
model = RandomForestClassifier(
    n_estimators=100,
    random_state=42
)

# Train model
model.fit(X_train, y_train)

# Make predictions
predictions = model.predict(X_test)

# Accuracy
accuracy = accuracy_score(y_test, predictions)

print("=" * 50)
print(f"Accuracy: {accuracy:.4f}")
print("=" * 50)

print("\nConfusion Matrix")
print(confusion_matrix(y_test, predictions))

print("\nClassification Report")
print(classification_report(y_test, predictions))

# Save everything
joblib.dump(model, "model.pkl")
joblib.dump(gender_encoder, "gender_encoder.pkl")
joblib.dump(geo_encoder, "geo_encoder.pkl")

print("\n✅ Model saved successfully!")