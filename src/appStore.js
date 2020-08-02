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
    // 清空 map 对象， 初始化状态，一般用于退出登录再登录的时候
    clear: () => {
      store.messages = new Map();
    },
  }));
  return store;
};

// 草稿文本 商店 用于存储本地未发送的文本
export const DarftsProvider = () => {
  const store = useLocalStore(() => ({
    darfts: {},
    // 获取某一条文本，本身为''或者找不到都返回 ''
    getDarft: (id) => {
      return store.darfts[id] || "";
    },
    // 缓存某一个会话的输入草稿
    setDarft: ({ id, text }) => {
      store.darfts[id] = text;
    },
    // 初始化darfts
    clear: () => {
      store.darfts = {};
    },
  }));
  return store;
};

// 用户信息 商店
// 需要调用 登出 函数
// 或者将业务逻辑丢到 services 层，mobx 层只缓存基础数据，不做业务逻辑的处理，保持 store 的干净
export const UserProvider = () => {
  const user = {
    userId: "", // 用户Id
    username: "", // 用户名
    token: "", // 用户登录token
    avator: "", // 用户头像
    tag: "", // 用户tag标签
    expiryTime: "", // token过期时间
    isAdmin: false, // 判断是否为管理员
  };

  const store = useLocalStore(() => ({
    // 这里需要 对象解构 出值 对象是引用类型
    user: { ...user },
    // 设置 key value 没有的key 直接 return 出去
    setValue: ({ key, value }) => {
      if (!store.user[key]) return;
      store.user[key] = value;
    },
    // 设置user 对象
    setUser: (user) => {
      const {
        userId,
        username,
        token,
        avator,
        tag,
        expiryTime,
        isAdmin,
      } = user;

      store.user = {
        userId: userId || store.user.userId,
        username: username || store.user.username,
        token: token || store.user.token,
        avator: avator || store.user.avator,
        tag: tag || store.user.tag,
        expiryTime: expiryTime || store.user.expiryTime,
        isAdmin: isAdmin || store.user.isAdmin,
      };
    },
    // 判断 token 是否过期
    // true 表示token 有效
    isValidToken: () => {
      if (store.user.expiryTime === "") return false;
      let time = new Date().getTime() / 1000 | 1;
      return store.user.expiryTime > time ? true : false;
    },
    // 初始化user
    clear: () => {
      store.user = user;
    },
  }));

  return store;
};

export const AppProvider = () => {
  const store = {
    counterProvider: new CounterProvider(),
    moviesProvider: new MoviesProvider(),
    userProvider: new UserProvider(),
    messagesListProvider: new MessagesListProvider(),
    darftsProvider: new DarftsProvider(),
  };

  return store;
};
