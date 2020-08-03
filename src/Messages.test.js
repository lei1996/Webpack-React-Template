// 获取 MoviesStore 实例对象
import { MessagesListProvider } from "./appStore";
import { act, renderHook } from "@testing-library/react-hooks";

describe("消息列表 用例 Map<id, array>数据结构", () => {
  let result;
  beforeEach(() => {
    result = renderHook(() => MessagesListProvider());
    act(() =>
      result.result.current.addMessages({
        id: "d000",
        message: {
          id: "a0",
          content: "vvvvvv",
        },
      })
    );
  });

  it("判断messages 是否初始化成功", () => {
    expect(result.result.current.messages.size).toEqual(1);
    expect(result.result.current.messages.has("d000")).toEqual(true);
    expect(result.result.current.messages.get("d000")).toEqual([
      { id: "a0", content: "vvvvvv" },
    ]);
  });

  it("push 消息进messages，判断是否为true", () => {
    act(() =>
      result.result.current.addMessages({
        id: "d111",
        message: {
          id: "a1",
          content: "我知道我asdasd放",
        },
      })
    );
    expect(result.result.current.messages.has("d111")).toEqual(true);
    expect(result.result.current.messages.get("d111")).toEqual([
      { id: "a1", content: "我知道我asdasd放" },
    ]);
  });

  it("测试 findMessages func 是否正常运行", () => {
    const messages = result.result.current.findMessages("d000");
    const notFindMessage = result.result.current.findMessages("d111");
    expect(messages.length).toEqual(1);
    expect(notFindMessage.length).toEqual(0);
    expect(messages).toEqual([{ content: "vvvvvv", id: "a0" }]);
    expect(notFindMessage).toEqual([]);
  });

  it("lastMessage func 返回最后一条消息", () => {
    const message = result.result.current.lastMessage("d000");
    const notMessage = result.result.current.lastMessage("d011");
    expect(message).toEqual({content: "vvvvvv", id: "a0" });
    expect(notMessage).toEqual({});
  });

  it("测试 existMessage func 是否正常运行", () => {
    const messages = result.result.current.existMessage({
      id: "d000",
      messageId: "a0",
    });
    const notFindMessage = result.result.current.existMessage({
      id: "d111",
      messageId: "dss",
    });
    expect(messages.length).toEqual(2);
    expect(notFindMessage.length).toEqual(2);
    expect(messages[0]).toEqual(0);
    expect(notFindMessage[0]).toEqual(-1);
    expect(messages[1]).toEqual([{ content: "vvvvvv", id: "a0" }]);
    expect(notFindMessage[1]).toEqual([]);
  });

  it("测试 updateMessage func 是否正常运行", () => {
    act(() =>
      result.result.current.updateMessage({
        id: "d000",
        message: {
          content: "更新后的值",
          id: "a0",
        },
      })
    );
    const messages = result.result.current.findMessages("d000");
    expect(messages.length).toEqual(1);
    expect(messages).toEqual([{ content: "更新后的值", id: "a0" }]);
    expect(messages).not.toEqual([{ content: "asd", id: "a0" }]);
  });

  it("测试 deleteMessage func 删除某一条消息", () => {
    act(() =>
      result.result.current.deleteMessage({ id: "d000", messageId: "a0" })
    );
    const messages = result.result.current.findMessages("d000");
    expect(messages.length).toEqual(0);
    expect(messages).toEqual([]);
    expect(messages).not.toEqual([{ content: "vvvvvv", id: "a0" }]);
  });

  it("测试 clear func 清空状态，用于退出登录", () => {
    act(() =>
      result.result.current.clear()
    );
    expect(result.result.current.messages.size).toEqual(0);
  });
});
