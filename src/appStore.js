import React, { createContext } from "react";
import { useLocalStore } from "mobx-react-lite";

export const appContext = createContext();

const CounterProvider = () => {
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

const MoviesProvider = () => {
  const store = useLocalStore(() => ({
    movies: 12,
    increment: () => {
      store.movies++;
      console.log(store.movies);
    },
    decrement: () => {
      store.movies--;
      console.log(store.movies);
    },
  }));
  return store;
};

export const AppProvider = ({ children }) => {
  const store = {
    counterProvider: new CounterProvider(),
    moviesProvider: new MoviesProvider(),
  };

  return <appContext.Provider value={store}>{children}</appContext.Provider>;
};
