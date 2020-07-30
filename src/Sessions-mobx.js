import React from "react";
import { observable, action } from "mobx";

/**
 * 会话列表
 * * 凡是与 sessions 相关的操作，都需要在此 Store 里面创建 func 供外部调用，
 * 且需要写好单元测试
 */
export const SessionsStore = () => {
  let page = 1;
  const store = observable({
    // 会话列表
    sessions: [],
    fetchAll: action(async () => {
      const res = await fetch(
        `http://www.omdbapi.com/?s=action&page=${page}&apikey=4640ef30`
      );
      const newMovies = await res.json();
      // 获取分页数据时，新增到数组
      store.movies.unshift(
        ...newMovies.Search.map((m) => ({ ...m, score: 0 }))
      );
      page++;
	}),
	// 来新消息的时候会创建会话
    newSession: action((session) => {
      store.sessions.push(session);
	}),
	// 删除好友的时候也会删除会话
    deleteSession: action((session) => {
      const index = store.sessions.findIndex((s) => s.id === session.id);
      if (index !== -1) {
        store.sessions.splice(index, 1);
      }
    }),
    // movie: view 层调用func 传入的 引用对象
    addToQueue: action((movie) => {
      movie.inQueue = true;
    }),
    like: action((movie) => {
      movie.score++;
    }),
    dislike: action((movie) => {
      movie.score--;
    }),
  });

  return store;
};

export default React.createContext();
