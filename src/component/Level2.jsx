import { Dialog, Grow, Zoom } from "@mui/material";
import React, { memo, useEffect, useState, useTransition } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setposition,
  setVisistedHash_of_player,
  set_current_player,
  set_nodes_visited_by_player,
  set_playground,
  set_selectedContent,
} from "../redux/Global";

let content = ["*"];

const generateRandomIndex = () => {
  return Math.floor(Math.random() * content.length);
};

const ColorGrid = memo(({ i, j, item }) => {
  const [show, setShow] = useState(false);
  // const [item, setitem] = useState("");

  // useEffect(() => {
  //   let randomIndex = generateRandomIndex();

  //   setitem(content[randomIndex]);
  // }, []);

  const {
    visited_by_player_1,
    current_player,
    visited_by_player_2,
    visited_hash,
  } = useSelector((s) => s.global);
  const dispatch = useDispatch();

  const check_grid_visited_by_anyPlayer_or_not = () => {
    let temp = false;
    if (
      visited_by_player_1[`${i}${j}_1`] ||
      visited_by_player_2[`${i}${j}_2`]
    ) {
      temp = true;
    }

    return temp;
  };

  const handleClick = () => {
    if (!check_grid_visited_by_anyPlayer_or_not()) {
      let payload = {
        i,
        j,
        item,
        current_player,
        id: parseInt(`${i}${j}`),
      };
      let id = `${i}${j}_${current_player}`;
      dispatch(setVisistedHash_of_player(id));
      dispatch(set_nodes_visited_by_player(payload));
      dispatch(set_current_player(current_player === 1 ? 2 : 1));
      setShow(true);
    }
  };

  return (
    <td
      onClick={handleClick}
      key={j}
      className={
        check_grid_visited_by_anyPlayer_or_not()
          ? visited_by_player_1[`${i}${j}_1`]
            ? "visited_by_player1"
            : "visited_by_player2"
          : "nonVisited"
      }
    >
      {show && (
        <Zoom in={show}>
          <b className="">{item}</b>
        </Zoom>
      )}

      {/* {show && <b className="">{item}</b>} */}
    </td>
  );
});

const GenerateCard = memo(({ row, col }) => {
  const [isPending, startTransition] = useTransition();
  const dispatch = useDispatch();
  const { playground } = useSelector((s) => s.global);

  const handleGeneratePlayground = () => {
    let temp = [];

    for (let i = 0; i < row; i++) {
      let temp1 = [];
      for (let j = 0; j < col; j++) {
        let randomIndex = generateRandomIndex();

        temp1.push(content[randomIndex]);
      }
      temp.push(temp1);
    }

    dispatch(set_playground(temp));
  };

  useEffect(() => {
    startTransition(() => {
      handleGeneratePlayground();
    });
  }, [row, col]);

  return (
    <>
      {isPending ? (
        <h1 className="text-center"> Ruko jara sabar karo</h1>
      ) : (
        <table>
          <tbody>
            {playground.map((_, i) => (
              <tr key={i}>
                {playground[i].map((item, j) => {
                  return (
                    <ColorGrid key={j} type="reveal" i={i} item={item} j={j} />
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      )}{" "}
    </>
  );
});

const Level2 = () => {
  const [row, setrow] = useState(10);
  const [col, setcol] = useState(10);
  const [grid, setgrid] = useState({
    row,
    col,
  });
  const [isPending, startTransition] = useTransition();
  const [player1, setPlayer1] = useState({
    name: "player 1",
    score: 0,
    turn: false,
  });
  const [player2, setPlayer2] = useState({
    name: "player 2",
    score: 0,
    turn: false,
  });

  const [currentPlayer, setPlayer] = useState(null);
  const {
    current_player,
    nodes_visited_by_player_1,
    nodes_visited_by_player_2,
    winner,
  } = useSelector((s) => s.global);
  const [counter, setcounter] = useState(0);
  const [random, setRandom] = useState(0);
  const [enable, setEnable] = useState(false);
  const [startGame, setStartGame] = useState(false);
  const [showWinMdal, setShowWinMdal] = useState(false);
  const dispatch = useDispatch();

  const toss = () => {
    //genrate ramdom number from 1 to 100
    setRandom(Math.floor(Math.random() * 100) + 1);

    setEnable(true);
    setcounter(1);
  };

  useEffect(() => {
    let interval;
    let temp_player = "player_1";

    if (counter) {
      interval = setInterval(() => {
        if (counter % 2 === 0) {
          temp_player = "player_1";
        } else {
          temp_player = "player_2";
        }

        setcounter((c) => c + 1);
        setPlayer(temp_player);
        dispatch(set_current_player(temp_player === "player_1" ? 1 : 2));

        if (counter === random) {
          setStartGame(true);
          dispatch(set_current_player(temp_player === "player_1" ? 1 : 2));
          setcounter(0);
          setEnable(false);
        }
      }, 10);
    }
    return () => {
      clearInterval(interval);
    };
  }, [counter]);

  const handleSubmit = (e) => {
    e.preventDefault();
    startTransition(() => {
      setgrid({
        row,
        col,
      });
    });
    // nextStep();//
  };

  useEffect(() => {
    if (winner.win) {
      setShowWinMdal(true);
    }
  }, [winner]);

  return (
    <div className="App">
      <Dialog
        open={showWinMdal}
        onClose={() => setShowWinMdal(false)}
        aria-describedby="alert-dialog-description"
      >
        <div className="card">
          <h3 className="text-center text-success">
            {winner?.winning_player === 1 ? "Player 1" : "player 2"} wins the
            game
          </h3>
        </div>
      </Dialog>
      <h1>Level 2</h1>
      <section>
        {/* <form className="pt-2" onSubmit={handleSubmit}>
          <label>Row:</label>
          <input
            type="number"
            value={row}
            onChange={(e) => setrow(parseInt(e.target.value))}
          />
          <label>Col:</label>
          <input
            type="number"
            value={col}
            onChange={(e) => setcol(parseInt(e.target.value))}
          />
          <button className="btn-secondary" type="submit">
            Submit
          </button>
        </form> */}

        <section className="container mt-2">
          <div className="row">
            <div className="col-6">
              <div className="card  shadow-lg">
                <div
                  className={
                    current_player === 1
                      ? "card-header bg-success"
                      : "card-header"
                  }
                >
                  {player1.name}
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item ">{player1.score}</li>
                </ul>

                {nodes_visited_by_player_1?.length > 0 && (
                  <div className="visited_nodes">
                    {nodes_visited_by_player_1.map((node) => {
                      return <div className="chota_card_1">{node?.item}</div>;
                    })}
                  </div>
                )}
              </div>
            </div>
            <div className="col-6">
              <div className="card shadow-lg">
                <div
                  className={
                    current_player === 2
                      ? "card-header bg-success"
                      : "card-header"
                  }
                >
                  {player2.name}
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">{player2.score}</li>
                </ul>
                {nodes_visited_by_player_2?.length > 0 && (
                  <div className="visited_nodes">
                    {nodes_visited_by_player_2.map((node) => {
                      return <div className="chota_card_2">{node?.item}</div>;
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <button
          className="btn-primary mt-2 p-2"
          disabled={enable}
          onClick={toss}
        >
          Toss
        </button>
        <section className="container shadow mt-4 d-flex justify-content-center">
          {startGame && <GenerateCard row={grid.row} col={grid.col} />}
        </section>
      </section>
    </div>
  );
};

export default Level2;
