import express from "express";
import cors from "cors";
import { startBattle, attack } from "../mcp/battleEngine";

const app = express();
app.use(cors());
app.use(express.json());

let currentBattle: any;

app.post("/start-battle", (req, res) => {
  const { player1, player2 } = req.body;
  currentBattle = startBattle(player1, player2);
  res.json(currentBattle);
});

app.post("/attack", (req, res) => {
  const { attacker } = req.body;
  currentBattle = attack(currentBattle, attacker);
  res.json(currentBattle);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
