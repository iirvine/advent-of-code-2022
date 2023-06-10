import {
  day2,
  day2_pt2,
  getMoveForOutcome,
  score,
  OutcomeScore,
  ShapeScore,
} from "../2-rock-paper-scissors";

test("scoreRound", () => {
  // draw
  let answer = score({ opponent: "rock", player: "rock" });
  expect(answer).toEqual(ShapeScore.rock + OutcomeScore.draw);

  answer = score({ opponent: "rock", player: "paper" });
  expect(answer).toEqual(ShapeScore.paper + OutcomeScore.win);

  // win
  answer = score({ opponent: "paper", player: "rock" });
  expect(answer).toEqual(ShapeScore.rock);
});

test("getMoveForOutcome", () => {
  let mv = getMoveForOutcome("rock", "win");
  expect(mv).toEqual("paper");

  mv = getMoveForOutcome("rock", "loss");
  expect(mv).toEqual("scissors");

  mv = getMoveForOutcome("rock", "draw");
  expect(mv).toEqual("rock");
});

test("day2", () => {
  const answer = day2();
  console.log(answer);
});

test("day2 pt2", () => {
  const answer = day2_pt2();
  console.log(answer);
});
