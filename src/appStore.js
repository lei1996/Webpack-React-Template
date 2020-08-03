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
    // 返回会话id 最后一条消息
    lastMessage: (id) => {
      const messageList = store.findMessages(id);
      return messageList.length > 0 ? messageList[messageList.length - 1] : {};
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
      let time = (new Date().getTime() / 1000) | 1;
      return store.user.expiryTime > time ? true : false;
    },
    // 初始化user
    clear: () => {
      store.user = user;
    },
  }));

  return store;
};

// 主题 商店
export const ThemeProvider = () => {
  const theme = {
    backgroundColor: "", // 背景色
    backgroundImage: "", // 背景图
    sound: "", // 消息提示声
  };

  const store = useLocalStore(() => ({
    // 这里需要 对象解构 出值 对象是引用类型
    theme: { ...theme },
    // 设置 key value 没有的key 直接 return 出去
    setValue: ({ key, value }) => {
      if (!store.theme[key]) return;
      store.theme[key] = value;
    },
    // 设置theme 对象
    setTheme: (theme) => {
      const { backgroundColor, backgroundImage, sound } = theme;

      store.theme = {
        backgroundColor: backgroundColor || store.theme.backgroundColor,
        backgroundImage: backgroundImage || store.theme.backgroundImage,
        sound: sound || store.theme.sound,
      };
    },
    // 初始化theme
    clear: () => {
      store.theme = theme;
    },
  }));

  return store;
};

// 联系人列表
// 有群组消息，好友消息  会话id
// 手写排序 根据lastmessageTime 排序数组 (为了方便引入 react-spring 的那个动画库)
// type friend group 用于区分群组或者好友
// uread 未读消息数
// to 发送消息的Id avator 头像 name 名称 lastTime 最后一条消息的时间
export const LinkmansProvider = () => {
  const store = useLocalStore(() => ({
    // 这里需要 对象解构 出值 对象是引用类型
    linkmans: [],
    // 查找 linkman 联系人 位置
    existLinkman: (id) => {
      const index = store.linkmans.findIndex((l) => l.id === id);
      return [index, store.linkmans[index] || []];
    },
    // 添加/更新 联系人
    addLinkman: (linkman) => {
      const [index] = store.existLinkman(linkman.id);
      if (index !== -1) {
        store.linkmans[index] = linkman;
      } else {
        store.linkmans.unshift(linkman);
      }
    },
    // 删除某个联系人
    deleteLinkman: (id) => {
      const [index] = store.existLinkman(id);
      if (index !== -1) {
        store.linkmans.splice(index, 1);
      }
    },
    // 将数组元素移动到顶部
    moveTop: (id) => {
      const n = store.linkmans.length;
      const [index] = store.existLinkman(id);

      if (index > 0 && index > n - 1) return;

      for (let i = index - 1, curr = index; i >= 0; i--) {
        [store.linkmans[curr--], store.linkmans[i]] = [
          store.linkmans[i],
          store.linkmans[curr],
        ];
      }
    },
    // 清空对应的 uread 归零表示消息已读
    clearUreadCount: (id) => {
      const [index, linkman] = store.existLinkman(id);
      if (index !== -1) {
        store.linkmans[index] = { ...linkman, unread: 0 };
      }
    },
    // 初始化linkmans
    clear: () => {
      store.linkmans = [];
    },
  }));

  return store;
};

export const AppProvider = () => {
  const store = {
    counterProvider: new CounterProvider(),
    moviesProvider: new MoviesProvider(),
    userProvider: new UserProvider(),
    LinkmansProvider: new LinkmansProvider(),
    messagesListProvider: new MessagesListProvider(),
    darftsProvider: new DarftsProvider(),
    ThemeProvider: new ThemeProvider(),
  };

  return store;
};
