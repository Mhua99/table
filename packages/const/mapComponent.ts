import {
  Cascader,
  Checkbox,
  Date,
  Input,
  InputNumber,
  Radio,
  Select,
  Textarea,
} from '../'

const mapComponent = {
  input: () => Input,
  textarea: () => Textarea,
  number: () => InputNumber,
  password: () => Input,
  select: () => Select,
  date: () => Date,
  time: () => Date,
  datetime: () => Date,
  month: () => Date,
  week: () => Date,
  checkbox: () => Checkbox,
  radio: () => Radio,
  cascader: () => Cascader,
};

export { mapComponent };
