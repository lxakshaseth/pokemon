const express = require("express");
const { spawn } = require("child_process");

const app = express();
const PORT = process.env.PORT || 10000;

// Health endpoint (Render ke liye)
app.get("/", (req, res) => {
  res.send("Pokemon MCP Server running on Render 🚀");
});

// Optional health route
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// MCP server background me run karo
spawn("node", ["dist/index.js"], {
  stdio: "inherit",
});

app.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`);
});
