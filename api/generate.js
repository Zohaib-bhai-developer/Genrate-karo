const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/generate", async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await axios.post(
      "https://api.replicate.com/v1/predictions",
      {
        version: "f7318935ff4c2b1e346d5466e1370f5a0e5b4e1e73084a3c89482e0c6a8b5a0c", // SDXL model
        input: { prompt: prompt, width: 768, height: 768 }
      },
      {
        headers: {
          Authorization: `Token ${process.env.REPLICATE_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const prediction = response.data;
    const imageURL = prediction.output[0]; // first generated image
    res.json({ success: true, url: imageURL });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
