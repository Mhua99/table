import type { FormData } from '@/api/table';
import type { TableOption } from '~/types';

export const tableOption: TableOption<FormData> = {
  keyId: 'id',
  // /** 表单文字宽度 */
  // labelWidth: '100px',
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
  searchIndex: 3,
  searchIcon: true,
  // dialogWidth: 700,
  searchLabelWidth: '80px',
  // index: true,
  indexFixed: true,
  formMarighRight: '40px',
  // editTitle: "我是编辑",
  // addTitle: "我是新增",
  // viewTitle: "我是查看",
  // columnBtn: false,
  // refreshBtn: false,
  // sizeBtn: false,
  // addBtn: false,
  // editBtn: false,
  // delBtn: false,
  // align: "left",
  // columnBtn: false,
  // card: false,
  // submitBtn: false,
  // emptyBtn: false,
  // viewBtn: true,
  // viewBtnText: "我是查看",
  selection: true,
  column: [
    {
      label: '名字',
      prop: 'name',
      rules: [
        { required: true, message: '请输入名字' },
      ],
      search: true,
      value: '测试默认数据',
    },
    {
      label: '年龄',
      prop: 'age',
      type: 'number',
      rules: [
        { required: true, message: '请输入年龄' },
      ],
      hide: true,
      viewDisplay: false,
      // addDisabled: true,
      editDisabled: true,
    },
    {
      label: '班级',
      prop: 'class',
      type: 'select',
      dicData: [
        {
          label: '1班',
          value: 1,
        },
        {
          label: '2班',
          value: 2,
        },
        {
          label: '3班',
          value: 3,
        },
        {
          label: '4班',
          value: 4,
        },
        {
          label: '5班',
          value: 5,
        },
        {
          label: '6班',
          value: 6,
        },
      ],
      search: true,
      rules: [
        { required: true, message: '请输入班级' },
      ],
      // dataType: 'string',
    },
    {
      label: '班级',
      prop: 'class11',
      type: 'select',
      dicData: [
        {
          label: '1班',
          value: 1,
        },
        {
          label: '2班',
          value: 2,
        },
        {
          label: '3班',
          value: 3,
        },
        {
          label: '4班',
          value: 4,
        },
        {
          label: '5班',
          value: 5,
        },
        {
          label: '6班',
          value: 6,
        },
      ],
      search: true,
      rules: [
        { required: true, message: '请输入班级' },
      ],
      hide: true,
      // dataType: 'string',
    },
    {
      label: '出生日期',
      prop: 'bridthday',
      type: 'date',
      search: true,
      rules: [
        { required: true, message: '请输入出生日期' },
      ],
      sort: 1,
    },
    {
      label: '父亲名字',
      prop: 'fatherName',
      search: true,
    },
    {
      label: '母亲名字',
      prop: 'montherName',
      search: true,
      sort: 2,
    },
    {
      label: '兴趣爱好',
      prop: 'interest',
      type: 'checkbox',
      span: 24,
      dicUrl: '/api/getDicNew',
      dicProps: {
        label: 'name',
        value: 'id',
        valueType: 'string',
      },
      dicFormatter(res) {
        return res.data;
      },
      dataType: 'string',
      sort: 6,
    },
    {
      label: '备注',
      prop: 'remark',
      type: 'textarea',
      span: 24,
      hide: true,
    },
  ],
};
