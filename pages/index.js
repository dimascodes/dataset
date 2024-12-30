import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    Pregnancies: "",
    Glucose: "",
    BloodPressure: "",
    SkinThickness: "",
    Insulin: "",
    BMI: "",
    DiabetesPedigreeFunction: "",
    Age: "",
  });
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult("");

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setResult(data.prediction);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <h1>Diabetes Prediction</h1>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((field) => (
          <input
            key={field}
            type="number"
            name={field}
            placeholder={field}
            step="any"
            value={formData[field]}
            onChange={handleChange}
            required
          />
        ))}
        <button type="submit">Prediksi</button>
      </form>
      {result && (
        <div id="result">
          <h2>Prediction: {result}</h2>
        </div>
      )}
      {error && (
        <div id="error">
          <h2>Error: {error}</h2>
        </div>
      )}
    </div>
  );
}
