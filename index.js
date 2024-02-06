import { getHeaders, googleSearch } from "@nrjdalal/google-parser";
import express from "express";

const app = express();
const PORT = process.env.PORT || 8080;

const headers = getHeaders();

// Define your API endpoints here
app.get("/", async (req, res) => {
  // <-- Mark the callback function as async

  console.log("1", req.query);
  const query = req.query.query;
  console.log("query", query);

  const url = req.url;

  try {
    if (query) {
      // Perform Google search with the query parameter
      const searchData = await googleSearch({ query, options: { headers } });
      console.log('searched data',searchData)

      // Filter URLs containing 'themoviedb.org' or 'imdb.com'
      const filteredResults = searchData.data.results.filter(
        (result) =>
          result.url.includes("themoviedb.org/movie") ||
          result.url.includes("themoviedb.org/tv") ||
          result.url.includes("imdb.com/title")
      );
      console.log("🚀 ~ app.get ~ filteredResults:", filteredResults)

      // Return filtered results
      res.json(filteredResults);
    } else {
      res.status(200).json({ error: "Pass parameter" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
