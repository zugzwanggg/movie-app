import { configureStore } from "@reduxjs/toolkit";
import MovieSlice from "./features/movieSlice/MovieSlice";
import AuthSlice from "./features/AuthSlice/AuthSlice";

export const store = configureStore({
  reducer: {
    movie: MovieSlice,
    auth: AuthSlice
  }
})