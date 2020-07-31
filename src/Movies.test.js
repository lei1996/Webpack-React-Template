// 获取 MoviesStore 实例对象
import { MoviesProvider } from "./appStore";
import { act, renderHook } from "@testing-library/react-hooks";

describe("movies 用例", () => {
  it("初始化 Movies 对象，校验初始值是否为12", () => {
    // 获取 store 实例对象
    const { result } = renderHook(() => MoviesProvider());
    expect(result.current.movies).toEqual(12);
  });

  it("在初始化值为12的情况下，自增1", () => {
    const { result } = renderHook(() => MoviesProvider());

    act(() => result.current.increment());
    expect(result.current.movies).toEqual(13);
  });

  it("在初始化值为12的情况下，减 1", () => {
    const { result } = renderHook(() => MoviesProvider());

    act(() => result.current.decrement());
    expect(result.current.movies).toEqual(11);
  });
});
