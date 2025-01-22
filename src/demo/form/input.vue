<script lang="ts" setup>
import type { FormOption } from '~/types'

import { ConfigProvider } from 'ant-design-vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import { ref, watch } from 'vue'

import { Form } from '~/components'

const form = ref({
  name: '',
});

watch(form, (val) => { console.log(val) }, { immediate: true, deep: true })

const option: FormOption<any> = {
  // /** 表单文字宽度 */
  // // labelWidth: '100px',
  // /** 提交按钮 */
  // submitBtn: true,
  // /** 清空按钮 */
  // emptyBtn: true,
  // /** 提交按钮文字 */
  // submitBtnText: '提交按钮',
  // /** 清空按钮文字 */
  // emptyBtnText: '清空按钮',
  // /** 表单布局 */
  // layout: 'horizontal',
  // /** 表单文字位置 */
  // labelAlign: 'right',
  // wrapperCol: {
  //   span: 3,
  //   offset: 12
  // },
  column: [
    {
      label: '名字',
      prop: 'name',
      tooltip: 'hello world',
      prefix: '111',
      suffix: '222',
      rules: [
        { required: true, message: 'Please input Activity name' },
        // { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
      ],
    },
    {
      label: '日期',
      prop: 'date',
      type: 'date',
    },
    {
      label: '时间',
      prop: 'time',
      type: 'time',
    },
    {
      label: '时间日期',
      prop: 'datetime',
      type: 'datetime',
    },
    {
      label: '时间日期',
      prop: 'datetimerange',
      type: 'datetime',
      range: true,
      dataType: 'string',
    },
    {
      label: '时间',
      prop: 'timearray',
      type: 'time',
      range: true,
      dataType: 'string',
    },
    {
      label: '周',
      prop: 'week',
      type: 'week',
    },
    {
      label: 'checkbox',
      prop: 'checkbox',
      type: 'checkbox',
      dicData: [
        {
          label: '男',
          value: '1',
        },
        {
          label: '女',
          value: '2',
        },
      ],
      dataType: 'string',
    },
    {
      label: 'radio',
      prop: 'radio',
      type: 'radio',
      dicUrl: '/api/getDic',
      dicFormatter(res) {
        return res.data;
      },
      dicProps: {
        label: 'name',
        value: 'id',
      },
      span: 24,
      wrapperCol: {
        push: 1,
      },
    },
    {
      label: 'cascader',
      prop: 'cascader',
      type: 'cascader',
      dicUrl: '/api/dic/tree',
      dicFormatter(res) {
        return res.data;
      },
      dicProps: {
        label: 'label',
        value: 'id',
        children: 'children',
      },
      dataType: 'string',
    },
    // {
    //   label: '学校',
    //   prop: 'school',
    //   rules: [
    //     { required: true, message: 'Please input Activity name', trigger: 'blur' },
    //     // { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
    //   ],
    //   display: false
    // },
    // {
    //   label: '年龄',
    //   prop: 'year',
    //   rules: [
    //     { required: true, message: 'Please input Activity name', trigger: 'blur' },
    //     // { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
    //   ],
    // },
    // {
    //   label: '年龄',
    //   prop: 'num',
    //   type: 'number',
    //   addonAfter: '%',
    //   rules: [
    //     { required: true, message: 'Please input Activity name', trigger: 'blur' },
    //     // { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
    //   ],
    // },
    // {
    //   label: 'textarea',
    //   prop: 'textarea',
    //   type: 'textarea',
    //   autoSize: { minRows: 4, maxRows: 4 },
    //   rules: [
    //     { required: true, message: 'Please input Activity name', trigger: 'blur' },
    //     // { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
    //   ],
    // },
    // {
    //   label: 'password',
    //   prop: 'password',
    //   type: 'password',
    //   rules: [
    //     { required: true, message: 'Please input Activity name', trigger: 'blur' },
    //     // { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
    //   ],
    // },
    // {
    //   label: 'select',
    //   prop: 'select',
    //   type: 'select',
    //   dicUrl: '/api/getDic',
    //   dataType: 'string',
    //   dicFormatter(res) {
    //     return res.data;
    //   },
    //   dicProps: {
    //     label: 'name',
    //     value: 'id',
    //   },
    //   mode: "multiple",
    //   rules: [
    //     { required: true, message: 'Please input Activity name', trigger: 'blur' },
    //     // { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
    //   ],
    // },
  ],
};

const formType = ref<'add' | 'view'>('add')

function submit(res: any) {
  // console.log(res, '___res')
}

const date = ref()
</script>

<template>
  <ConfigProvider :locale="zhCN">
    <Form v-model="form" :option="option" :form-type="formType" @submit="submit">
      <template #nameLabel>
        <span>2222</span>
      </template>
    </Form>
  </ConfigProvider>
</template>

<style lang="scss" scoped></style>
