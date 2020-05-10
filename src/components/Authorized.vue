<script>
/**
 * 函数式组件是没有 this的， 如何使用 check，
 * 在template中还是不能把所有的东西都作为根元素的，如果想直接加载 slot 要提供一个标签
 * 这样容易破坏页面结构， 这样很不友好，基于中问题就不能使用 template，要使用render
 */
/**
 * 权限组件： 比较灵活， 弊端：写法不方便，需要将设置的用组件包裹起来
 *
 *
 *
 * 权限指令： directives——auth.js  v-auth
 * 有弊端，只有在第一次的时候才会控制， 如果说是动态的更改用户权限，
 * 就没办法把一开始移除掉的 元素加载回来
 *
 */
// 权限校验组件
import { check } from "@/utils/auth";
export default {
  functional: true,
  props: {
    authority: {
      type: Array,
      required: true
    }
  },
  render(h, context) {
    const { props, scopedSlots } = context;
    return check(props.authority) ? scopedSlots.default() : null;
  }
};
</script>
