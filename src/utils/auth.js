const currentAuth = ["admin"];
export { currentAuth };

// 获取用户的权限
export function getCurrentAuthority() {
  return currentAuth;
}

// 用来校验 用户的权限是否属于 请求来的数据权限
export function check(authority) {
  const current = getCurrentAuthority();
  return current.some(item => authority.includes(item));
}

// 用来判断登录
export function isLogin() {
  const current = getCurrentAuthority();
  // 如果获取到用户权限， 并且 用户权限 不等于 "guest" 那就证明登录了
  return current && current[0] !== "guest";
}
