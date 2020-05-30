module.exports = {
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        bypass: function(req, res) {
          if (req.headers.accept.indexOf("html") !== -1) {
            console.log("Skipping proxy for browser request.");
            return "/index.html";
          } else {
            // 接口请求时，可以拿到请求链接，然后
            // 按照规范，将请求地址截断， 然后拼接成我们要访问的js文件
            // req.path   '/api/dashboard/chart'
            const name = req.path
              .split("/api/")[1] // ['','dashboard/chart']
              .split("/") // ['dashboard','chart']
              .join("_"); // "dashboard_chart" 要获取的 mock文件夹下面的文件名称
            const mock1 = require(`./mock/${name}`); // 将文件引入进来 (引入进来后会缓存的，在改动那个mock文件数据是不生效的)
            const result = mock1(req.method);
            // console.log(req.method);   // GET
            // console.log(result);   请求的数据结构
            delete require.cache[require.resolve(`./mock/${name}`)]; // 清理缓存的文件，对mock文件数据修改可以实时刷新
            return res.send(result);
          }
        }
      }
    }
  }
};
