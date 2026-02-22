import express from "express";

const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());

// --- Pokemon Database ---
const pokemons = {
  pikachu: { name: "Pikachu", hp: 100, attack: 20 },
  charmander: { name: "Charmander", hp: 100, attack: 18 },
  squirtle: { name: "Squirtle", hp: 100, attack: 15 },
};

let battle = null;

// Health
app.get("/", (req, res) => {
  res.send("Pokemon REST Battle Server Running 🚀");
});

// List Pokemon
app.get("/pokemon", (req, res) => {
  res.json(Object.values(pokemons));
});

// Start Battle
app.post("/start-battle", (req, res) => {
  const { pokemon1, pokemon2 } = req.body;

  if (!pokemons[pokemon1] || !pokemons[pokemon2]) {
    return res.status(400).json({ message: "Invalid Pokemon name" });
  }

  battle = {
    p1: { ...pokemons[pokemon1] },
    p2: { ...pokemons[pokemon2] },
    turn: "p1",
  };

  res.json({ message: "Battle started!", battle });
});

// Attack
app.post("/attack", (req, res) => {
  if (!battle) {
    return res.status(400).json({ message: "No active battle" });
  }

  const attacker = battle.turn === "p1" ? battle.p1 : battle.p2;
  const defender = battle.turn === "p1" ? battle.p2 : battle.p1;

  defender.hp -= attacker.attack;

  if (defender.hp <= 0) {
    return res.json({
      message: `${attacker.name} wins!`,
      battle,
    });
  }

  battle.turn = battle.turn === "p1" ? "p2" : "p1";

  res.json({
    message: `${attacker.name} attacked!`,
    battle,
  });
});

// Status
app.get("/status", (req, res) => {
  if (!battle) {
    return res.json({ message: "No active battle" });
  }
  res.json(battle);
});

app.listen(PORT, () => {
  console.log(`REST Battle Server running on port ${PORT}`);
});
