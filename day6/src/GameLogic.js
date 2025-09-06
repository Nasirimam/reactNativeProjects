import * as localization from "./Localization";

export const calculateWinner = (squares, isIndex) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      if (isIndex) {
        return lines[i];
      }
      return squares[a];
    }
  }
  return null;
};

export let status,
  DoOnceScore = true;

const isMatch = (winner, squares) => {
  return squares.indexOf(null) != -1 && winner === null;
};

const restart = (isRestart, setRestart) => {
  if (!isRestart) {
    setRestart(true);
    DoOnceScore = true;
  }
};

const addScore = (winner, setScore) => {
  if (DoOnceScore) {
    if (winner === "x") {
      setScore((prevState) => ({
        ...prevState,
        x: prevState.x + 1,
      }));
    } else if (winner === "o") {
      setScore((prevState) => ({
        ...prevState,
        o: prevState.o + 1,
      }));
    }
    DoOnceScore = false;
  }
};

export const resetStatus = (xIsNext) => {
  status = `${localization.default.t("turn")}: ${xIsNext ? "X" : "O"}`;
};

export const matchStatus = (
  winner,
  xIsNext,
  isRestart,
  setRestart,
  setScore,
  squares
) => {
  if (winner) {
    status = `${localization.default.t("winner")}: ${winner}`;
    restart(isRestart, setRestart);
    addScore(winner, setScore);
  } else if (isMatch(winner, squares)) {
    status = `${localization.default.t("turn")}: ${xIsNext ? "X" : "O"}`;
  } else if (!isMatch(winner, squares)) {
    status = `${localization.default.t("draw")}!`;
    restart(isRestart, setRestart);
  }
};
