export default async function handler(req, res) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

  try {
    console.log("Forwarding request to backend:", backendUrl);
    console.log("Request body:", req.body);

    // Convert req.body (an object) to URL-encoded string
    const urlEncodedBody = new URLSearchParams(req.body).toString();
    console.log("URL-encoded body:", urlEncodedBody);

    const response = await fetch(backendUrl, {
      method: req.method,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: urlEncodedBody, // Send URL-encoded string to backend
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
