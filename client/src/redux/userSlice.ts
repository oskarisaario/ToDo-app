import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TToDos } from "../pages/Home";


export type IinitialState ={
  currentUser: ICurrentUser | null,
  token: string | null,
  error: string | null,
  loading: boolean,
  todos: Array<object> | null
}

export interface ICurrentUser {
  _id: string,
  username: string,
}


const initialState: IinitialState = {
  currentUser: null,
  token: null,
  error: null,
  loading: false,
  todos: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signinSuccess: (state, action: PayloadAction<IinitialState>) => {
      state.currentUser = action.payload.currentUser;
      state.token = action.payload.token;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    setToDos: (state, action: PayloadAction<Array<TToDos>>) => {
      state.todos = action.payload;
    },
    deleteUserStart: (state) => {
      state.loading = true;
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
      state.todos = null;
      state.token = null;
    },
    deleteUserFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    signOutUserStart: (state) => {
      state.loading = true;
    },
    signOutUserSuccess: (state) => {
      state.currentUser = null;
      state.token = null,
      state.loading = false;
      state.error = null;
      state.todos = null;
    },
    signOutUserFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  signInStart, 
  signInFailure, 
  signinSuccess,
  setToDos,
  deleteUserStart,
  deleteUserFailure,
  deleteUserSuccess,
  signOutUserStart,
  signOutUserFailure,
  signOutUserSuccess } = userSlice.actions;


export default userSlice.reducer;