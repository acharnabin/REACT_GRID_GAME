import { createSlice } from "@reduxjs/toolkit";
import { checkForMatching } from "../utils";
import { current } from "immer";
const initialState = {
  guessColor: "",
  position: {
    row: 0,
    col: 0,
  },
  mode: "unreveal",
  selected_Pos_color: "",
  matched: false,

  //level 2
  playground: [], // this is the playground where we store the 2D array

  selectedContent: [],
  visited_by_player_1: {},
  visited_by_player_2: {},
  visited: [],
  visited_hash: {},
  current_player: -1,
  nodes_visited_by_player_1: [],
  nodes_visited_by_player_2: [],
  game_status: false,
  winner: {
    win: false,
    winning_player: 0,
  },
};

const GlobalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    set_playground: (state, { payload }) => {
      state.playground = payload;
    },
    set_current_player: (state, { payload }) => {
      state.current_player = payload;
    },
    set_visited_nodes: (state, { payload }) => {},
    setVisistedHash: (state, { payload }) => {
      state.visited_hash[payload] = true;
    },
    setVisistedHash_of_player: (state, { payload }) => {
      if (state.current_player === 1) {
        state.visited_by_player_1[payload] = true;
      }
      if (state.current_player === 2) {
        state.visited_by_player_2[payload] = true;
      }
    },
    set_nodes_visited_by_player: (state, { payload }) => {
      if (state.current_player === 1) {
        state.nodes_visited_by_player_1.push(payload);

        let baseState = current(state.nodes_visited_by_player_1);

        //check player 1 win or not
        let winObject = checkForMatching(baseState, 1);
        if (winObject?.win) {
          state.game_status = false;
          state.winner = {
            win: true,
            winning_player: 1,
          };
        }
      }
      if (state.current_player === 2) {
        state.nodes_visited_by_player_2.push(payload);
        let baseState = current(state.nodes_visited_by_player_2);
        

        let winObject = checkForMatching(baseState, 2);
        if (winObject?.win) {
          state.game_status = false;
          state.winner = {
            win: true,
            winning_player: 2,
          };
        }
      }
    },
    setGueessColor: (state, { payload }) => {
      state.guessColor = payload;
    },
    setposition: (state, { payload }) => {
      state.position = payload;
    },
    setMode: (state, { payload }) => {
      state.mode = payload;
    },
    set_selected_Pos_color: (state, { payload }) => {
      state.selected_Pos_color = payload;
    },
    setMatched: (state, { payload }) => {
      state.matched = payload;
    },
    set_selectedContent: (state, { payload }) => {
      state.selectedContent.push(payload);
    },
  },
});

export const {
  setVisistedHash_of_player,
  setGueessColor,
  set_current_player,
  setVisistedHash,
  setMatched,
  set_selectedContent,
  set_selected_Pos_color,
  setposition,
  setMode,
  set_nodes_visited_by_player,
  set_playground,
} = GlobalSlice.actions;

export default GlobalSlice.reducer;
