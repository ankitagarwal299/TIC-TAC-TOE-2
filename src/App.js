/*
Tic Tac Toe

We do it on a 3 * 3 grids, two players take turns

TO start with, we'll mark the board to be empty spaces

Sign for player 1 is : 'O'
Sign for player 2 is : 'X'

*/

import React, { useState, useEffect } from "react";

export default function App() {
  return <Board></Board>;
}

let grid = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""]
];

function checkWinningLogic(boardState, player) {
  for (let i = 0; i < boardState.length; i++) {
    if (
      boardState[i][0] == player &&
      boardState[i][1] == player &&
      boardState[i][2] == player
    )
      return true;
  }

  if (
    boardState[0][0] == player &&
    boardState[1][1] == player &&
    boardState[2][2] == player
  )
    return true;

  if (
    boardState[0][2] == player &&
    boardState[1][1] == player &&
    boardState[2][0] == player
  )
    return true;

  for (let i = 0; i < boardState.length; i++) {
    if (
      boardState[0][i] == player &&
      boardState[1][i] == player &&
      boardState[2][i] == player
    )
      return true;
  }

  return false;
}

function Board() {
  const [boardState, setBoardState] = useState(grid);
  const [player, setPlayer] = useState("O");
  const [gameState, setGameState] = useState(false);

  function handler(row, col) {
    if (boardState[row][col] != "" || gameState) return;

    let newBoard = Array.from({ length: boardState.length }, (r, rIndex) =>
      Array.from(
        { length: boardState[0].length },
        (c, cIndex) => boardState[rIndex][cIndex]
      )
    );
    newBoard[row][col] = player;

    /*Below also works */
    // setBoardState((prevState) => {
    //   prevState[row][col] = player;
    //   return prevState;
    // });
    setBoardState(newBoard);
  }

  useEffect(() => {
    if (checkWinningLogic(boardState, player)) {
      alert("Game Won by player" + player);

      setBoardState((prevState) =>
        prevState.map((r) => {
          return r.map((c) => {
            return "";
          });
        })
      );
      setGameState(false);
    }

    if (player == "O") {
      setPlayer("X");
    } else {
      setPlayer("O");
    }
  }, [boardState]);

  return (
    <div className="container">
      {boardState.map((row, rIndex) => {
        return (
          <div key={rIndex} style={{ display: "flex" }}>
            {row.map((cell, cIndex) => {
              return (
                <div
                  key={cIndex}
                  style={{
                    width: 100,
                    height: 100,
                    border: "1px solid black",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                  onClick={() => handler(rIndex, cIndex)}
                >
                  {cell}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
/*
 3 * 3 matrix

 State: 
   player
    default initialize to 0

   gameState state 
       3 * 3 - empty state





  winning condition:
    [
      [0,1,2], 
      [3,4,5], 
      [6,7,8],
      
      [0,4,8],
      [2,4,6],
      
      [0,3,6],
      [1,4,7],
      [2,5,8],
    ]

    
 

*/
