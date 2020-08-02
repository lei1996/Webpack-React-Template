// 获取 DarftsStore 实例对象
import { DarftsProvider } from "./appStore";
import { act, renderHook } from "@testing-library/react-hooks";

describe("Darfts 用例", () => {
  let result;
  beforeEach(() => {
    result = renderHook(() => DarftsProvider());
    act(() => {
      result.result.current.setDarft({ id: "d000", text: "这是草稿文本" })
      result.result.current.setDarft({ id: "d111", text: "" })
    });
  });

  it("校验darfts 对象, 判断初始化是否成功", () => {
    const Text = result.result.current.getDarft('d000');
    const Text1 = result.result.current.getDarft('d111');
    const undefiendText = result.result.current.getDarft('d222');
    expect(Text).toBe('这是草稿文本');
    expect(Text).not.toBe('这是草稿文本1');
    expect(Text1).toBe('');
    expect(undefiendText).toBe('');
  });

  it("setDarft 设置某个会话的草稿文本", () => {
    act(() => {result.result.current.setDarft({id: 'd222', text: '今天'})})

    expect(result.result.current.getDarft('d222')).toBe('今天');
  });

  it("clear 还原初始化", () => {
    act(() => {result.result.current.clear()})

    expect(result.result.current.darfts).toEqual({});
  });
});
