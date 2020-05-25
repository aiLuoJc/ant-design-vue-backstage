function chart(method) {
  let res = null;
  switch (method) {
    case "GET":
      res = [50, 40, 78, 10, 30, 48];
      break;
    default:
      res = null;
  }
  return res;
}

module.exports = chart; // es6方法的导出功能

// 约定规则， 用下换线拼接，接口都是 api开头的
//
/**
 * 不能用到js中 export default形式了，
 * 因为这个mock文件需要在 node环境下运行， 需要用到 模块化(commonjs)规范
 * 
 * 
 */
