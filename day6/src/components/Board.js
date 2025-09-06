import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Square from "./Square";
import Actions from "./Actions";
import { calculateWinner, matchStatus, status } from "../GameLogic";
import Info from "./Info";

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXisNext] = useState(true);
  const [isRestart, setRestart] = useState(true);
  const [score, setScore] = useState({ x: 0, o: 0 });
  const winner = calculateWinner(squares, false);
  const winnerColor = calculateWinner(squares, true);

  useEffect(() => {
    setRestart(false);
  }, []);

  matchStatus(winner, xIsNext, isRestart, setRestart, setScore, squares);

  const handleClick = (i) => {
    const _squares = squares.slice();
    if (calculateWinner(_squares, false) || _squares[i]) {
      return;
    }
    _squares[i] = xIsNext ? "x" : "o";
    setSquares(_squares);
    setXisNext(!xIsNext);
  };

  const winnerStyle = (i) => {
    if (winnerColor !== null) {
      return winnerColor.find((index) => index == i);
    }
  };

  const restart = () => {
    setSquares(Array(9).fill(null));
    setXisNext(true);
    setRestart(false);
  };

  const clearScore = () => {
    setScore({
      x: 0,
      o: 0,
    });
  };

  const renderSquare = (i) => {
    return (
      <Square
        isWin={winnerStyle(i) == i}
        value={squares[i]}
        onClick={() => handleClick(i)}
      />
    );
  };

  return (
    <View style={styles.board}>
      <Info score={score} status={status} />

      <View style={styles.boardRow}>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </View>
      <View style={styles.boardRow}>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </View>
      <View style={styles.boardRow}>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </View>
      <Actions
        isRestart={isRestart}
        restart={() => restart()}
        clearScore={() => clearScore()}
      />
    </View>
  );
};

export default Board;

const styles = StyleSheet.create({
  board: {
    alignItems: "center",
  },
  boardRow: {
    flexDirection: "row",
    justifyContent: "center",
    textAlignVertical: "center",
  },
});
