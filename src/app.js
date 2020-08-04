import React, { useContext, useEffect } from "react";
import { Router, Link } from "@reach/router";
import { useObserver, observer, useLocalStore } from "mobx-react-lite";

import { AppProvider, AppContext } from "./appStore";

import { DraggableList } from "./components/draggable-list";

const RouteNavs = () => {
  return (
    <>
      <Link to="/">Home</Link> | <Link to="/chat">Chat</Link> |{" "}
      <Link to="/dragList">DragList</Link>
      <Link to="/messages">Messages</Link>
    </>
  );
};

const Count = () => {
  const { counterProvider } = useContext(AppContext);

  return useObserver(() => (
    <div>
      <h2>Count: {counterProvider.count}</h2>
      <button onClick={counterProvider.increment}>+</button>
      <button onClick={counterProvider.decrement}>-</button>
      <Counter1 initialCount={111} />
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

const DragList = () => {
  return <DraggableList items={"Lorem ipsum dolor sit".split(" ")} />;
};

const Messages = () => {
  const { messagesListProvider } = useContext(AppContext);

  useEffect(() => {
    messagesListProvider.addMessages("d111", {
      id: "1",
      content: "你是水水水水asd",
    });
  }, []);
  // messages
  // findMessages
  // addMessages
  // updateMessage
  // deleteMessage

  return useObserver(() => (
    <div>
      {messagesListProvider.findMessages("d111").map((m) => (
        <div key={m.id}>{m.content}</div>
      ))}
      {/* <button onClick={}>Send</button> */}
    </div>
  ));
};

export const Counter1 = observer((props) => {
  const store = useLocalStore(() => ({
    count: props.initialCount,
    inc() {
      store.count += 1;
    },
  }));

  return (
    <div>
      <span>{store.count}</span>
      <button onClick={store.inc}>Increment</button>
    </div>
  );
});

function App() {
  const store = AppProvider();

  return (
    // 全局注入context 就可以不用一层一层 传递store 里面的 属性 或 方法
    <AppContext.Provider value={store}>
      <RouteNavs />

      <Router>
        <Count path="/" />
        <Movie path="/chat" />
        <DragList path="/dragList" />
        <Messages path="/messages" />
      </Router>
    </AppContext.Provider>
  );
}

export default App;
