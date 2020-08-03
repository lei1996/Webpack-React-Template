// 获取 DarftsStore 实例对象
import { LinkmansProvider } from "./appStore";
import { act, renderHook } from "@testing-library/react-hooks";

import config from "../config/client";

// {
//   type: text,
//   content: 本来新号说话还是萌新限制#(阴险)变成了小黑屋了,
//   _id: 5e19d8c1a0ba560766fcab4c,
//   from: {
//     tag: 小天使,
//     _id: 5b4ee8321b53ec11c8505de5,
//     username: zhcxk1998,
//     avatar: //cdn.suisuijiang.com/Avatar/5b4ee8321b53ec11c8505de5_1578399067962
//   },
//   createTime: 2020-01-11T14:16:33.672Z
// }

describe("Linkmans 用例", () => {
  let result;
  beforeEach(() => {
    result = renderHook(() => LinkmansProvider());
    act(() => {
      result.result.current.addLinkman({
        id: "123123123",
        type: "friend",
        unread: 2,
        name: "222",
        avatar: config.cdnPath + "avator/1111.jpg",
        lastTime: "111111",
      });
    });
  });

  it("校验linkman 对象, 判断初始化是否成功", () => {
    const linkman = result.result.current.existLinkman("123123123");
    const linkman1 = result.result.current.existLinkman("d111");
    expect(linkman[0]).toBe(0);
    expect(linkman[1]).toEqual({
      id: "123123123",
      type: "friend",
      unread: 2,
      name: "222",
      avatar: config.cdnPath + "avator/1111.jpg",
      lastTime: "111111",
    });
    expect(linkman1[0]).toEqual(-1);
    expect(linkman1[1]).toEqual([]);
  });

  it("addLinkman 更新 联系人", () => {
    act(() => {
      result.result.current.addLinkman({
        id: "123123123",
        type: "group",
        unread: 1,
        name: "ccc",
        avatar: config.cdnPath + "avator/ccc.jpg",
        creator: "111",
        lastTime: "3333",
      });
    });

    expect(result.result.current.linkmans).toEqual([
      {
        id: "123123123",
        type: "group",
        unread: 1,
        name: "ccc",
        avatar: config.cdnPath + "avator/ccc.jpg",
        creator: "111",
        lastTime: "3333",
      },
    ]);
  });

  it("clearUreadCount 清空消息读数 ", () => {
    act(() => {
      result.result.current.clearUreadCount("123123123");
    });

    expect(result.result.current.linkmans).toEqual([
      {
        id: "123123123",
        type: "friend",
        unread: 0,
        name: "222",
        avatar: config.cdnPath + "avator/1111.jpg",
        lastTime: "111111",
      },
    ]);
  });

  it("deleteLinkman 删除某个联系人 ", () => {
    act(() => {
      result.result.current.deleteLinkman("123123123");
    });

    expect(result.result.current.linkmans).toEqual([]);
  });

  it("clear 还原初始化", () => {
    act(() => {
      result.result.current.clear();
    });

    expect(result.result.current.linkmans).toEqual([]);
  });
});
