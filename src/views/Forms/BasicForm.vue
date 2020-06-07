<template>
  <a-form :layout="formLayout" :form="form">
    <a-form-item
      label="Form Layout"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <a-radio-group
        default-value="horizontal"
        @change="handleFormLayoutChange"
      >
        <a-radio-button value="horizontal">Horizontal</a-radio-button>
        <a-radio-button value="vertical">Vertical</a-radio-button>
        <a-radio-button value="inline">Inline</a-radio-button>
      </a-radio-group>
    </a-form-item>
    <a-form-item
      label="Field A"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <a-input
        placeholder="input placeholder"
        v-decorator="[
          'fieldA',
          {
            initialValue: fieldA,
            rules: [{ required: true, min: 6, message: '必须大于5个字符' }]
          }
        ]"
      />
    </a-form-item>
    <a-form-item
      label="Field B"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <a-input placeholder="input placeholder" v-decorator="['fieldB']" />
    </a-form-item>
    <a-form-item :wrapper-col="buttonItemLayout.wrapperCol">
      <a-button type="primary" @click="handleSubmit">Submit</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  data() {
    //
    /**
     * 新建一个form实例，this.$form也是在main.js文件中
     * 通过Vue.use的形式在组件内部帮我们把这个$form挂载在原型上
     *
     *
     * createForm()传递的这个this 用来组件底层内部数据改变了调用这个this直接更新当前组件 this.form.updata
     */
    this.form = this.$form.createForm(this);
    return {
      formLayout: "horizontal",
      fieldA: "Hello",
      fieldB: ""
    };
  },
  computed: {
    formItemLayout() {
      const { formLayout } = this;
      return formLayout === "horizontal"
        ? {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 }
          }
        : {};
    },
    buttonItemLayout() {
      const { formLayout } = this;
      return formLayout === "horizontal"
        ? {
            wrapperCol: { span: 14, offset: 4 }
          }
        : {};
    }
  },
  methods: {
    handleFormLayoutChange(e) {
      this.formLayout = e.target.value;
    },
    handleSubmit() {
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values);
          // 如果想把form的值同步更新到组件，
          // 可以用下面的方法，往this上面赋值，这样就能把值同步到return里面的注册时内容
          Object.assign(this, values);
        }
      });
    }
  },
  mounted() {
    setTimeout(() => {
      // 接口返回的数据，想赋值到表单上面， 需要使用form.setFieldsValue去改变
      // initialValue的值，仅会初始化一次。如果后面需要去改变，都需要使用form.setFieldsValue去改变
      this.form.setFieldsValue({ fieldA: "hello world" });
    }, 3000);
  }
};
</script>
