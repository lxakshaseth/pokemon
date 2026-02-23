export interface BattleState {
  player1: string;
  player2: string;
  hp1: number;
  hp2: number;
}

export function startBattle(p1: string, p2: string): BattleState {
  return {
    player1: p1,
    player2: p2,
    hp1: 100,
    hp2: 100
  };
}

export function attack(state: BattleState, attacker: "player1" | "player2") {
  if (attacker === "player1") {
    state.hp2 -= 10;
  } else {
    state.hp1 -= 10;
  }
  return state;
}
