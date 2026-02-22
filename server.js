import express from "express";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 10000;

/* -------------------- Pokemon Data -------------------- */

const pokemonList = [
  { name: "Pikachu", hp: 100, attack: 20 },
  { name: "Charmander", hp: 100, attack: 18 },
  { name: "Squirtle", hp: 100, attack: 15 }
];

/* -------------------- Battle State -------------------- */

let battle = null;

/* -------------------- Home -------------------- */

app.get("/", (req, res) => {
  res.send("Pokemon REST Battle Server Running 🚀");
});

/* -------------------- Get All Pokemon -------------------- */

app.get("/pokemon", (req, res) => {
  res.json(pokemonList);
});

/* -------------------- Start Battle -------------------- */

app.post("/start-battle", (req, res) => {
  const { pokemon1, pokemon2 } = req.body;

  const p1 = pokemonList.find(
    p => p.name.toLowerCase().trim() === pokemon1.toLowerCase().trim()
  );

  const p2 = pokemonList.find(
    p => p.name.toLowerCase().trim() === pokemon2.toLowerCase().trim()
  );

  if (!p1 || !p2) {
    return res.status(400).json({ message: "Invalid Pokemon name" });
  }

  battle = {
    player1: { ...p1 },
    player2: { ...p2 },
    turn: "player1",
    winner: null
  };

  res.json({
    message: "Battle started!",
    battle
  });
});

/* -------------------- Attack -------------------- */

app.post("/attack", (req, res) => {
  if (!battle) {
    return res.json({ message: "No active battle" });
  }

  if (battle.winner) {
    return res.json({ message: "Battle finished", winner: battle.winner });
  }

  const attacker =
    battle.turn === "player1" ? battle.player1 : battle.player2;

  const defender =
    battle.turn === "player1" ? battle.player2 : battle.player1;

  defender.hp -= attacker.attack;

  if (defender.hp <= 0) {
    battle.winner = attacker.name;
    defender.hp = 0;
  } else {
    battle.turn = battle.turn === "player1" ? "player2" : "player1";
  }

  res.json(battle);
});

/* -------------------- Status -------------------- */

app.get("/status", (req, res) => {
  if (!battle) {
    return res.json({ message: "No active battle" });
  }

  res.json(battle);
});

/* -------------------- Reset -------------------- */

app.post("/reset", (req, res) => {
  battle = null;
  res.json({ message: "Battle reset" });
});

/* -------------------- Start Server -------------------- */

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
