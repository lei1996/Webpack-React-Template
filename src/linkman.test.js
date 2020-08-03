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
      result.result.current.addLinkman({
        id: "444444",
        type: "group",
        unread: 333,
        name: "11",
        avatar: config.cdnPath + "avator/dd.jpg",
        lastTime: "ccc",
      });
      result.result.current.addLinkman({
        id: "0876",
        type: "friend",
        unread: 25,
        name: "xcvv2",
        avatar: config.cdnPath + "avator/zzz.jpg",
        lastTime: "ccxz",
      });
      result.result.current.addLinkman({
        id: "66667",
        type: "friend",
        unread: 221,
        name: "ssaxa",
        avatar: config.cdnPath + "avator/zccvvvvzz.jpg",
        lastTime: "cbbnncxz",
      });
    });
  });

  it("校验linkman 对象, 判断初始化是否成功", () => {
    const linkman = result.result.current.existLinkman("123123123");
    const linkman1 = result.result.current.existLinkman("d111");
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

    const [, linkman] = result.result.current.existLinkman("123123123");

    expect(linkman).toEqual({
      id: "123123123",
      type: "group",
      unread: 1,
      name: "ccc",
      avatar: config.cdnPath + "avator/ccc.jpg",
      creator: "111",
      lastTime: "3333",
    });
  });

  it("moveTop 将数组元素移动到顶部", () => {
    act(() => {
      result.result.current.moveTop('444444');
    });

    const [index] = result.result.current.existLinkman("444444");
    const [index1] = result.result.current.existLinkman("66667");

    expect(index).toBe(0);
    expect(index1).toBe(1);
  });

  it("clearUreadCount 清空消息读数 ", () => {
    act(() => {
      result.result.current.clearUreadCount("123123123");
    });

    const [, linkman] = result.result.current.existLinkman("123123123");

    expect(linkman).toEqual({
      id: "123123123",
      type: "friend",
      unread: 0,
      name: "222",
      avatar: config.cdnPath + "avator/1111.jpg",
      lastTime: "111111",
    });
  });

  it("deleteLinkman 删除某个联系人 ", () => {
    act(() => {
      result.result.current.deleteLinkman("123123123");
    });

    const linkman = result.result.current.existLinkman("123123123");

    expect(linkman).toEqual([-1, []]);
  });

  it("clear 还原初始化", () => {
    act(() => {
      result.result.current.clear();
    });

    expect(result.result.current.linkmans).toEqual([]);
  });
});
