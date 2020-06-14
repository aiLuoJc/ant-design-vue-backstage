import { check, currentAuth } from "./auth";

describe("auth test", () => {
  // 当权限值为空的时候
  it("empty auth", () => {
    currentAuth.splice(0, currentAuth.length); //清空
    expect(check(["user"])).toEqual(false);
    expect(check(["admin"])).toEqual(false);
  });

  it("user auth", () => {
    currentAuth.splice(0, currentAuth.length);
    currentAuth.push("user");
    expect(check(["user"])).toEqual(true);
    expect(check(["admin"])).toEqual(false);
  });

  it("admin auth", () => {
    currentAuth.push("admin");
    expect(check(["user"])).toEqual(true);
    expect(check(["admin"])).toEqual(true);
    expect(check(["user", "admin"])).toEqual(true);
  });
});
