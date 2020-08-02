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

export const MessagesListProvider = () => {
  const store = useLocalStore(() => ({
    messages: new Map(),
    // 查找messageList
    findMessages: (id) => {
      return store.messages.get(id) || [];
    },
    // 查找 message 位置
    existMessage: ({ id, messageId }) => {
      const messageList = store.findMessages(id);
      const index = messageList.findIndex((m) => m.id === messageId);
      return [index, messageList];
    },
    // 往目标 id 添加消息
    addMessages: ({ id, message }) => {
      const messageList = store.findMessages(id);
      messageList.push(message);
      store.messages.set(id, messageList);
    },
    // 更新某一条消息
    updateMessage: ({ id, message }) => {
      const [index, messageList] = store.existMessage({
        id,
        messageId: message.id,
      });
      if (index !== -1) {
        messageList[index] = message;
        store.messages.set(id, messageList);
      }
    },
    // 删除某一条消息
    deleteMessage: ({ id, messageId }) => {
      const [index, messageList] = store.existMessage({ id, messageId });
      if (index !== -1) {
        messageList.splice(index, 1);
        store.messages.set(id, messageList);
      }
    },
  }));
  return store;
};

export const AppProvider = () => {
  const store = {
    counterProvider: new CounterProvider(),
    moviesProvider: new MoviesProvider(),
    messagesListProvider: new MessagesListProvider(),
  };

  return store;
};
