const path = require("path");
const webpack = require("webpack");
const AntDesignThemePlugin = require("antd-theme-webpack-plugin");
// const { createMockMiddleware } = require("umi-mock-middleware");

const options = {
  antDir: path.join(__dirname, "./node_modules/ant-design-vue"),
  stylesDir: path.join(__dirname, "./src"), //将所有的样式文件打包在一起，都会生效主题在线编译
  // 所有less变量位置， default.less存放了整个antd组件库的所有less变量
  varFile: path.join(
    __dirname,
    "./node_modules/ant-design-vue/lib/style/themes/default.less"
  ),
  mainLessFile: "",
  themeVariables: ["@primary-color"],
  generateOnce: false
};

const themePlugin = new AntDesignThemePlugin(options);
module.exports = {
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          "primary-color": "#1DA57A"
        },
        javascriptEnabled: true
      }
    }
  },
  configureWebpack: {
    plugins: [themePlugin, new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)],
    resolve: {
      alias: {
        "@ant-design/icons/lib/dist$": path.resolve(__dirname, "./src/icons.js")
      }
    }
  },
  chainWebpack: config => {
    const svgRule = config.module.rule("svg");

    // 清除已有的所有 loader。
    // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
    svgRule.uses.clear();

    // 添加要替换的 loader
    svgRule.use("vue-svg-loader").loader("vue-svg-loader");
  },
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        bypass: function(req, res) {
          if (req.headers.accept.indexOf("html") !== -1) {
            console.log("Skipping proxy for browser request.");
            return "/index.html";
          } else if (process.env.MOCK !== "none") {
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
