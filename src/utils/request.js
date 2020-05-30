import axios from "axios";
import { notification } from "ant-design-vue";
function request(options) {
  return axios(options)
    .then(res => {
      return res;
    })
    .catch(err => {
      const {
        response: { status, statusText }
      } = err;
      notification.error({
        // 下面这一行是设置 eslint忽略当前语法错误的注释语句
        // eslint-disable-next-line no-unused-vars
        message: h => (
          <div>
            请求错误<span style="color:red">{status}</span>: {options.url}
          </div>
        ),
        description: statusText
        // 上面的设置是 用JSX插件 来对报错信息进行设置的，
        // 下载 npm install @vue/babel-preset-jsx @vue/babel-helper-vue-jsx-merge-props
        // 在babel.js中 中使用，(使用方法在 github上 搜索vue JSX )
      });
      /**
       * 这个 return 的好处是在请求的时候我们在正确的回调里面，
       * return Promise.reject(err) 不会进入 .then的回调里面去了，
       * 这样就不用考虑有没有data或者data合不合法
       * 如果想在进一步的话在请求回调的 .catch中进一步操作
       */
      return Promise.reject(err);
    });
}

export default request;
