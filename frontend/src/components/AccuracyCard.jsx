export default function AccuracyCard({ accuracy }) {
  return (
    <div className="card">
      <h2>Model Accuracy</h2>

      <p className="accuracy">
        {(accuracy * 100).toFixed(1)}%
      </p>

      <p>
        Random Forest Classifier
      </p>
    </div>
  );
}