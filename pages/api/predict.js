export default async function handler(req, res) {
  const backendUrl = process.env.BACKEND_API_URL;

  try {
    console.log("Forwarding request to backend:", backendUrl);
    console.log("Request body:", req.body);

    const response = await fetch(backendUrl, {
      method: req.method,
      headers: {
        "Content-Type": req.headers["content-type"],
      },
      body: req.body,
    });

    console.log("Backend response status:", response.status);
    const data = await response.text();
    console.log("Backend response body:", data);

    if (!response.ok) {
      throw new Error(`Backend returned status ${response.status}`);
    }

    res.status(200).json(JSON.parse(data));
  } catch (error) {
    console.error("Proxy error:", error.message);
    res.status(500).json({ error: "Failed to fetch prediction" });
  }
}
