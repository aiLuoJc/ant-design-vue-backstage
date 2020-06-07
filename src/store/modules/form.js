import router from "../../router";
import request from "@/utils/request";

const state = {
  step: {
    payAccount: "123456" //付款账号
  }
};

const actions = {
  // actions 内部执行异步操作
  async submitStepForm({ commit }, { payload }) {
    await request({
      url: "/api/form",
      method: "POST",
      data: payload
    });
    commit("saveStepFormData", { payload }); // 提交
    router.push("/form/step-form/result");
  }
};

const mutations = {
  // 更改state里面的step值   {payload}解构的值，如果解构失败，值就是undefined
  saveStepFormData(state, { payload }) {
    state.step = {
      ...state.step, //取出已有的信息
      ...payload // 进行合并
    };
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
