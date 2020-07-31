// 获取 MoviesStore 实例对象
import { CounterProvider } from "./appStore";
import { act, renderHook } from "@testing-library/react-hooks";

describe("count 用例", () => {
  it("初始化 Counter 对象，校验初始值是否为1", () => {
    // 获取 store 实例对象
    const { result } = renderHook(() => CounterProvider());
    expect(result.current.count).toEqual(1);
  });

  it("在初始化值为1的情况下，自增1", () => {
    const { result } = renderHook(() => CounterProvider());

    act(() => result.current.increment());
    expect(result.current.count).toEqual(2);
  });

  it("在初始化值为1的情况下，减 1", () => {
    const { result } = renderHook(() => CounterProvider());

    act(() => result.current.decrement());
    expect(result.current.count).toEqual(0);
  });
});
