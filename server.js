import express from "express";
import { spawn } from "child_process";

const app = express();
const PORT = process.env.PORT || 10000;

app.get("/", (req, res) => {
  res.send("Pokemon MCP Server running on Render 🚀");
});

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// Start MCP server in background
spawn("node", ["dist/index.js"], {
  stdio: "inherit",
});

app.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`);
});
