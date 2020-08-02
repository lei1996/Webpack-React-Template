// 获取 UserStore 实例对象
import { ThemeProvider } from "./appStore";
import { act, renderHook } from "@testing-library/react-hooks";

describe("Theme 用例", () => {
  const theme = {
    backgroundColor: "1",
    backgroundImage: "q111",
    sound: "tasdncb04",
  };
  let result;
  beforeEach(() => {
    result = renderHook(() => ThemeProvider());
    act(() => {
      result.result.current.setTheme(theme);
    });
  });

  it("theme 对象, 判断初始化是否成功", () => {
    expect(result.result.current.theme).toEqual(theme);
    act(() => {
      result.result.current.setValue({
        key: "backgroundImage",
        value: "https://cdn.linairx.top/avator/11111.jpg",
      });
      result.result.current.setValue({
        key: "sound",
        value: "2",
      });
      // 这里设置 不存在的key 会被直接 return
      result.result.current.setValue({
        key: "ccc",
        value: "q222",
      });
    });
    expect(result.result.current.theme).toEqual({
      backgroundColor: "1",
      backgroundImage: "https://cdn.linairx.top/avator/11111.jpg",
      sound: "2",
    });
  });

  it("clear 还原默认值初始化", () => {
    act(() => {
      result.result.current.clear();
    });

    expect(result.result.current.theme).toEqual({
      backgroundColor: "",
      backgroundImage: "",
      sound: "",
    });
  });
});
