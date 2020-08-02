// 获取 UserStore 实例对象
import { UserProvider } from "./appStore";
import { act, renderHook } from "@testing-library/react-hooks";

const time = new Date().getTime() / 1000 | 1;

describe("User 用例", () => {
  const user = {
    userId: "1",
    username: "q111",
    token: "tasdncb04",
    avator: "https://www.linairx.top/avator/01.jpg",
    tag: "泰",
    expiryTime: time + 3600,
    isAdmin: true,
  };
  let result;
  beforeEach(() => {
    result = renderHook(() => UserProvider());
    act(() => {
      result.result.current.setUser(user);
    });
  });

  it("user 对象, 判断初始化是否成功", () => {
    expect(result.result.current.user).toEqual(user);
    act(() => {
      result.result.current.setValue({
        key: "userId",
        value: "001",
      });
      result.result.current.setValue({
        key: "username",
        value: "q222",
      });
      // 这里设置 不存在的key 会被直接 return
      result.result.current.setValue({
        key: "ccc",
        value: "q222",
      });
    });
    expect(result.result.current.user).toEqual({
      userId: "001",
      username: "q222",
      token: "tasdncb04",
      avator: "https://www.linairx.top/avator/01.jpg",
      tag: "泰",
      expiryTime: time + 3600,
      isAdmin: true,
    });
  });

  it('isValidToken 判断token 有效期', () => {
    const isValid = result.result.current.isValidToken();
    expect(isValid).toEqual(true);
  })

  it("clear 还原默认值初始化", () => {
    act(() => {
      result.result.current.clear();
    });

    expect(result.result.current.user).toEqual({
      avator: "",
      expiryTime: "",
      isAdmin: false,
      tag: "",
      token: "",
      userId: "",
      username: "",
    });
  });
});
