import { memo, useEffect, useState, useTransition } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGueessColor, setMatched, setMode, setposition, set_selected_Pos_color } from "../redux/Global";


const randomColorArray = [
  "#DE4839",
  "#E21717",
  "#BF3312",
  "#B4161B",
  "#12B0E8",
  "#120E43",
  "#1FAA59",
  "#E8BD0D",
  "#E03B8B",
  "#0D0D0D",
];
const generateRandomIndex = () => {
  return Math.floor(Math.random() * randomColorArray.length);
};

const ColorGrid = memo(({ i, j, setSelectdColorCode }) => {
  const [color, setcolor] = useState("");

  useEffect(() => {
    let randomIndex = generateRandomIndex();

    setcolor(randomColorArray[randomIndex]);
  }, []);

  const { guessColor, position, mode } = useSelector((s) => s.global);
  const dispatch = useDispatch();

  const handleClick = () => {
    setSelectdColorCode(mode === "reveal" ? color : "black");
    dispatch(
      setposition({
        row: i,
        col: j,
      })
    );
  };

  useEffect(() => {
    if (mode === "reveal") {
      if (position.row === i && position.col === j && color === guessColor) {
 
        dispatch(set_selected_Pos_color(color));
        dispatch(setMatched(true));
      }
    }
  }, [mode]);

  return (
    <td
      key={j}
      style={{
        height: "50px",
        width: "50px",
        border: "1px solid black",
        backgroundColor: mode === "reveal" ? color : "black",
        color: "white",
        cursor: "pointer",
      }}
      onClick={handleClick}
    >
      <b className="overlaytext">
        ({i},{j})
      </b>
    </td>
  );
});

const GuessColor = () => {
  const dispatch = useDispatch();
  const { guessColor, position, mode, selected_Pos_color, matched } =
  useSelector((s) => s.global);
  const handleColor = (item) => {
    dispatch(setGueessColor(item));
  };
  return (
    <>
      <h1>Guess Color</h1>
      <div className="guessColorBox">
        {randomColorArray.map((color, index) => {
          return (
            <div
              className="guessColorBox_div"
              onClick={() => handleColor(color)}
              key={index}
              style={{ backgroundColor: color }}
            >
              {guessColor === color && <b className="overlaytext">Selected</b>}
            </div>
          );
        })}
      </div>
    </>
  );
};

const ShowColorGrid = memo(({ row, col, setSelectdColorCode }) => {
  return (
    <table>
      <tbody>
        {Array(row)
          .fill(0)
          .map((_, i) => (
            <tr key={i}>
              {Array(col)
                .fill(0)
                .map((_, j) => {
                  return (
                    <ColorGrid
                      setSelectdColorCode={setSelectdColorCode}
                      key={j}
                      type="reveal"
                      i={i}
                      j={j}
                    />
                  );
                })}
            </tr>
          ))}
      </tbody>
    </table>
  );
});

const ShowStatus = () => {
  const { guessColor, position, mode, selected_Pos_color, matched } =
    useSelector((s) => s.global);

  return (
    <div>
      {guessColor !== "" && (
        <div className="d-flex justify-content-center">
          <div className="guessColorBox card m-1 p-1 shadow">
            <h1>Guessed color:{guessColor}</h1>
            <div
              className="guessColorBox_div"
              style={{ backgroundColor: guessColor }}
            ></div>
          </div>
          <div className="guessColorBox m-1 p-1 card shadow">
            <h1>
              selcetd position::{" "}
              <b>
                {position.row}-{position.col}
              </b>
            </h1>
          </div>

          <div className="guessColorBox card m-1 p-1 shadow">
            <h1>Reveal color:{selected_Pos_color}</h1>
            <div
              className="guessColorBox_div"
              style={{ backgroundColor: selected_Pos_color }}
            ></div>
            {mode === "reveal" && (
              <>
                {matched ? (
                  <div className="alert alert-success" role="alert">
                    you got a point
                  </div>
                ) : (
                  <div className="alert alert-danger" role="alert">
                    Not matched
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

function Level1() {
  const [row, setrow] = useState(1);
  const [col, setcol] = useState(1);
  const [step, setStep] = useState(0);

  const { guessColor, position, mode } = useSelector((s) => s.global);
  const dispatch = useDispatch();
  const [grid, setgrid] = useState({
    row,
    col,
  });
  const [isPending, startTransition] = useTransition();
  const [selectedColorCode, setSelectdColorCode] = useState(null);

  const nextStep = () => {
    setStep((p) => p + 1);
  };

  const prevStep = () => {
    step >= 1 && setStep((p) => p - 1);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    startTransition(() => {
      setgrid({
        row,
        col,
      });
    });
    nextStep();
  };

  return (
    <div className="Level1">
      <form className="pt-2" onSubmit={handleSubmit}>
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
      </form>

      {step > 0 && (
        <>
          <GuessColor />
          <button className="btn-secondary" onClick={nextStep}>
            Next
          </button>
        </>
      )}

      {step > 1 && (
        <div>
          <ShowStatus />
          <button
            className="btn-primary p-2"
            onClick={(e) => {
              e.preventDefault();
              dispatch(setMode("reveal"));
            }}
          >
            Reveal color
          </button>
        </div>
      )}

      {isPending ? (
        <h1>Loading...</h1>
      ) : (
        <div className="p-2">
          <ShowColorGrid
            row={grid.row}
            col={grid.col}
            setSelectdColorCode={setSelectdColorCode}
          />
        </div>
      )}
    </div>
  );
}

export default Level1;
