// import express from "express";
// import cors from "cors";
// import fetch from "node-fetch";

// const app = express();
// app.use(cors());

// // ✅ Proxy route for fetching logos
// app.get("/proxy-logo", async (req, res) => {
//   const { url } = req.query;
//   try {
//     const response = await fetch(url);
//     const buffer = await response.arrayBuffer();

//     // Return the image data
//     res.setHeader("Content-Type", "image/png");
//     res.send(Buffer.from(buffer));
//   } catch (error) {
//     console.error("Error fetching logo:", error);
//     res.status(500).send("Error fetching logo");
//   }
// });

// // ✅ Basic test route
// app.get("/", (req, res) => {
//   res.send("Backend running ✅");
// });

// const PORT = 5000;
// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));




import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());

// ✅ Route for proxying company logos
app.get("/proxy-logo", async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).send("Logo URL required");
  }

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0", // some sites block bots
      },
      redirect: "follow", // follow redirects
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status}`);
    }

    const contentType = response.headers.get("content-type") || "image/png";
    const arrayBuffer = await response.arrayBuffer();

    res.setHeader("Content-Type", contentType);
    res.send(Buffer.from(arrayBuffer));
  } catch (error) {
    console.error("Error fetching logo:", error.message);
    res.status(500).send("Error fetching logo");
  }
});

// ✅ Test route
app.get("/", (req, res) => {
  res.send("Backend running ✅");
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
