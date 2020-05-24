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
            //  按照规范，将请求地址截断， 然后拼接成我们要访问的js文件
            const name = req.path
              .split("/api/")[1]
              .split("/")
              .join("_"); // 要获取的 mock文件夹下面的文件名称
            const mock1 = require(`./mock/${name}`); // 将文件引入进来 (引入进来后会缓存的，在改动那个mock文件数据是不生效的)
            const result = mock1(req.method);
            // 清理缓存的文件，对mock文件数据修改可以实时刷新
            delete require.cache[require.resolve(`./mock/${name}`)];
            return res.send(result);
          }
        }
      }
    }
  }
};
