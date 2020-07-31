import React, { createContext } from "react";
import { useLocalStore } from "mobx-react-lite";

export const AppContext = createContext();

export const CounterProvider = () => {
  const store = useLocalStore(() => ({
    count: 1,
    increment: () => {
      store.count++;
    },
    decrement: () => {
      store.count--;
    },
  }));
  return store;
};

export const MoviesProvider = () => {
  const store = useLocalStore(() => ({
    movies: 12,
    increment: () => {
      store.movies++;
    },
    decrement: () => {
      store.movies--;
    },
  }));
  return store;
};

export const AppProvider = () => {
  const store = {
    counterProvider: new CounterProvider(),
    moviesProvider: new MoviesProvider(),
  };

  return store;
};
