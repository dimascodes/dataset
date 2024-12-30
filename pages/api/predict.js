export default function handler(req, res) {
  if (req.method === "GET") {
    res
      .status(200)
      .json({ message: "API for diabetes prediction is working." });
  } else if (req.method === "POST") {
    // Ambil data dari request
    const {
      Pregnancies,
      Glucose,
      BloodPressure,
      SkinThickness,
      Insulin,
      BMI,
      DiabetesPedigreeFunction,
      Age,
    } = req.body;

    // Validasi data
    if (
      !Pregnancies ||
      !Glucose ||
      !BloodPressure ||
      !SkinThickness ||
      !Insulin ||
      !BMI ||
      !DiabetesPedigreeFunction ||
      !Age
    ) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Contoh logika prediksi sederhana
    const prediction =
      parseFloat(Glucose) > 120
        ? "High risk of diabetes"
        : "Low risk of diabetes";

    // Kirim hasil prediksi
    res.status(200).json({ prediction });
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
