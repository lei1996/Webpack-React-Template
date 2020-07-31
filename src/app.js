import React, { useContext } from "react";
import { Router, Link } from "@reach/router";
import { css } from "linaria";
import { useObserver } from "mobx-react-lite";

import { AppProvider, AppContext } from "./appStore";

const Count = () => {
  const { counterProvider } = useContext(AppContext);

  return useObserver(() => (
    <div>
      <h2>Count: {counterProvider.count}</h2>
      <button onClick={counterProvider.increment}>+</button>
      <button onClick={counterProvider.decrement}>-</button>
    </div>
  ));
};

const Movie = () => {
  const { moviesProvider } = useContext(AppContext);

  return useObserver(() => (
    <div>
      <h2>Movies: {moviesProvider.movies}</h2>
      <button onClick={moviesProvider.increment}>+</button>
      <button onClick={moviesProvider.decrement}>-</button>
    </div>
  ));
};

const Movie2 = () => {
  const { moviesProvider } = useContext(AppContext);

  return useObserver(() => (
    <div>
      <h2>Movies: {moviesProvider.movies}</h2>
      <button onClick={moviesProvider.increment}>+</button>
      <button onClick={moviesProvider.decrement}>-</button>
    </div>
  ));
};

function App() {
  const store = AppProvider();

  return (
    // 全局注入context 就可以不用一层一层 传递store 里面的 属性 或 方法
    <AppContext.Provider value={store}>
      <Count />
      <Movie />
      <Movie2 />
    </AppContext.Provider>
  );
}

export default App;
