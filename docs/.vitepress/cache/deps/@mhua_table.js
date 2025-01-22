import {
  DeleteOutlined_default,
  DownOutlined_default,
  EditOutlined_default,
  EyeOutlined_default,
  FontSizeOutlined_default,
  FormItem_default,
  Group_default2 as Group_default,
  Group_default3 as Group_default2,
  Password_default,
  PlusOutlined_default,
  RangePicker,
  ReloadOutlined_default,
  SearchOutlined_default,
  SelectOption,
  SettingOutlined_default,
  TextArea_default,
  UpOutlined_default,
  button_default,
  card_default,
  cascader_default,
  checkbox_default,
  col_default,
  date_picker_default,
  dropdown_default,
  form_default,
  input_default,
  input_number_default,
  menu_default,
  message_default,
  modal_default,
  popover_default,
  radio_default,
  row_default,
  select_default,
  space_default,
  table_default
} from "./chunk-7UCHWQXW.js";
import {
  Fragment,
  computed,
  createTextVNode,
  createVNode,
  defineComponent,
  h,
  inject,
  isVNode,
  mergeProps,
  provide,
  reactive,
  ref,
  toRaw,
  toRef,
  watch
} from "./chunk-CQOUZRMK.js";
import "./chunk-G3PMV62Z.js";

// node_modules/.pnpm/@mhua+table@1.0.20_vue@3.5.13/node_modules/@mhua/table/dist/index.es.js
var Pe = Object.defineProperty;
var ze = (e, t, n) => t in e ? Pe(e, t, { enumerable: true, configurable: true, writable: true, value: n }) : e[t] = n;
var ee = (e, t, n) => ze(e, typeof t != "symbol" ? t + "" : t, n);
var he = ["addDisabled", "addDisplay", "display", "editDisabled", "slots", "span", "viewDisplay", "originItem", "editDisplay"];
var St = ["select", "checkbox", "radio"];
var Oe = [...he, "dicData", "dataIndex", "hide", "search", "searchRange", "title", "type", "value", "align", "colHide"];
var fe = {
  prop: {
    type: String,
    default: ""
  }
};
var Ct = {
  type: {
    type: String
  }
};
var ne = {
  ...fe,
  dataType: {
    type: String
  }
};
function ue(e, t = true) {
  return typeof e == "boolean" ? e : t;
}
function Se(e, t) {
  const n = ue(e.display);
  switch (t) {
    case "view":
      return n && e.viewDisplay;
    case "edit":
      return n && e.editDisplay;
    case "add":
      return n && e.addDisplay;
  }
  return n;
}
function xt(e) {
  return e.placeholder ? e.placeholder : ["date", "datetime", "time", "month", "select"].includes(e.type || "") ? e.range ? ["请选择开始时间", "请选择结束时间"] : `请选择${e.label}` : `请输入${e.label}`;
}
function Ce(e, t) {
  const n = ue(e.disabled);
  switch (t) {
    case "view":
      return true;
    case "edit":
      return ue(e.disabled) || e.editDisabled;
    case "add":
      return ue(e.disabled) || e.addDisabled;
  }
  return n;
}
function q(e, t) {
  if (e === void 0)
    return e;
  switch (t) {
    case "number":
      return Number(e);
    case "boolean":
      return !!e;
    case "string":
      return String(e);
    case "array":
      return typeof e == "string" ? e.split(",") : typeof e == "number" ? [e] : e;
    default:
      return e;
  }
}
function Ve(e, t) {
  const { label: n, value: r, children: i = "" } = t.dicProps || { label: "label", value: "value" };
  return e.map((u) => {
    const l = {
      row: u,
      label: u[n],
      value: u[r]
    };
    return i && u[i] && Array.isArray(u[i]) && (l.children = Ve(u[i], t)), l;
  });
}
var Rt = {
  modifyFormData: () => {
  },
  dicList: ref({}),
  getFormData: () => true,
  collectionAllRefs: () => {
  }
};
var ke = Symbol("FormContext");
function Dt(e, t) {
  const n = ref({}), r = {};
  function i(l, f) {
    const s = t.modelValue;
    s[f] = l, e("update:modelValue", s);
  }
  function m(l) {
    return t.modelValue[l];
  }
  function u(l, f) {
    r[l] = f;
  }
  return provide(ke, {
    modifyFormData: i,
    dicList: n,
    getFormData: m,
    collectionAllRefs: u
  }), {
    dicList: n,
    allRefs: r
  };
}
function W() {
  return inject(ke, Rt);
}
var Ie = defineComponent({
  name: "MCascader",
  props: ne,
  emits: [],
  inheritAttrs: false,
  setup(e, {
    attrs: t
  }) {
    const n = ref(), {
      dicList: r,
      getFormData: i,
      modifyFormData: m,
      collectionAllRefs: u
    } = W(), l = computed({
      get() {
        return q(i(e.prop), "array");
      },
      set(s) {
        m(e.dataType ? q(s, e.dataType) : s, e.prop);
      }
    }), f = computed(() => r.value[e.prop] || []);
    return u(e.prop, n), () => createVNode(cascader_default, mergeProps({
      expandTrigger: "hover"
    }, t, {
      ref: n,
      value: l.value,
      "onUpdate:value": (s) => l.value = s,
      options: f.value
    }), null);
  }
});
function wt(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !isVNode(e);
}
var Ae = defineComponent({
  name: "MCheckbox",
  props: ne,
  emits: [],
  inheritAttrs: false,
  setup(e, {
    attrs: t
  }) {
    const n = ref(), {
      dicList: r,
      getFormData: i,
      modifyFormData: m,
      collectionAllRefs: u
    } = W(), l = computed({
      get() {
        var a;
        const s = i(e.prop);
        return Array.isArray(s) ? s : ((a = String(s)) == null ? void 0 : a.split(",")) || [];
      },
      set(s) {
        e.dataType ? m(q(s, e.dataType), e.prop) : m(s, e.prop);
      }
    }), f = computed(() => {
      var s;
      return ((s = r.value[e.prop]) == null ? void 0 : s.map((a) => ({
        ...a,
        value: String(a.value)
      }))) || [];
    });
    return u(e.prop, n), () => {
      let s;
      return createVNode(Group_default2, mergeProps(t, {
        ref: n,
        value: l.value,
        "onUpdate:value": (a) => l.value = a
      }), wt(s = f.value.map((a) => createVNode(checkbox_default, mergeProps(t, {
        value: a.value,
        key: a.value
      }), {
        default: () => [a.label]
      }))) ? s : {
        default: () => [s]
      });
    };
  }
});
var Tt = {
  ...ne,
  type: {
    type: String
  },
  range: {
    type: Boolean,
    default: false
  }
};
function G(e, t) {
  const n = {}, r = {};
  typeof t == "string" && (t = t.split(","));
  for (const i in e)
    t.includes(i) ? n[i] = e[i] : r[i] = e[i];
  return { includeRet: n, excludeRet: r };
}
function xe(e) {
  const t = {};
  for (const n in e)
    e[n] !== void 0 && e[n] !== null && e[n] !== "" && (t[n] = e[n]);
  return t;
}
function Bt(e, t) {
  const n = ref(), {
    excludeRet: r
  } = G(t, he), {
    getFormData: i,
    modifyFormData: m,
    collectionAllRefs: u
  } = W();
  let l = date_picker_default;
  const f = computed(() => {
    var C;
    const g = i(e.prop);
    return e.range && !Array.isArray(g) ? ((C = String(g)) == null ? void 0 : C.split(",")) || [] : g;
  });
  u(e.prop, n);
  function s(g) {
    e.dataType ? m(q(g, e.dataType), e.prop) : m(g, e.prop);
  }
  const a = {
    picker: "date",
    style: {
      width: "100%"
    }
  };
  switch (e.type) {
    case "date":
      a.picker = "date", a.format = "YYYY-MM-DD", a.valueFormat = "YYYY-MM-DD";
      break;
    case "datetime":
      a.showTime = true, a.format = "YYYY-MM-DD HH:mm", a.valueFormat = "YYYY-MM-DD HH:mm:ss";
      break;
    case "time":
      a.picker = "time", a.format = "HH:mm", a.valueFormat = "HH:mm:ss";
      break;
    case "month":
      a.picker = "month", a.format = "YYYY-MM", a.valueFormat = "YYYY-MM";
      break;
    case "week":
      a.picker = "week", a.valueFormat = "YYYY-MM-DD";
      break;
  }
  return e.range && (l = RangePicker), {
    includeRet: r,
    modelValue: f,
    dateObj: a,
    dateRef: n,
    change: s,
    comp: l
  };
}
var H = defineComponent({
  name: "MDate",
  props: Tt,
  emits: [],
  inheritAttrs: false,
  setup(e, {
    attrs: t
  }) {
    const {
      comp: n,
      includeRet: r,
      modelValue: i,
      dateObj: m,
      dateRef: u,
      change: l
    } = Bt(e, t);
    return () => h(n, {
      ...m,
      ...r,
      ref: u,
      value: i.value,
      onChange: l
    });
  }
});
var Ot = {
  /** 弹窗显示和隐藏 */
  modelValue: {
    type: Boolean,
    default: false
  },
  /** 弹窗宽度 */
  width: {
    type: String,
    default: "520px"
  },
  /** 是否显示确认按钮 */
  isConfirmBtn: {
    type: Boolean,
    default: true
  },
  /** 是否显示取消按钮 */
  isCancelBtn: {
    type: Boolean,
    default: true
  },
  /** 确认按钮文字 */
  confirmBtnText: {
    type: String,
    default: "确认"
  },
  /** 取消按钮文字 */
  cancelBtnText: {
    type: String,
    default: "取消"
  },
  /** 确认按钮事件 */
  onConfirm: {
    type: Function
  },
  /** 取消按钮事件 */
  onCancel: {
    type: Function
  },
  /** 是否全屏 */
  fullscreen: {
    type: Boolean,
    default: false
  },
  /** 不是全屏的状态下，距离顶部距离 默认 10vh */
  top: {
    type: String,
    default: "10vh"
  },
  /** 不是全屏的状态下，距离底部距离 默认 10vh */
  bottom: {
    type: String,
    default: "10vh"
  },
  loading: {
    type: Boolean,
    default: true
  }
};
var $e = defineComponent({
  name: "Dialog",
  props: Ot,
  emits: ["update:modelValue", "confirm"],
  setup(e, {
    attrs: t,
    emit: n,
    slots: r
  }) {
    const {
      onCancel: i,
      top: m,
      bottom: u,
      width: l,
      fullscreen: f
    } = e, s = ["m-modal"], a = () => n("confirm", () => {
      n("update:modelValue", false);
    }), g = i || (() => n("update:modelValue", false)), C = {
      top: m,
      bottom: u,
      width: l,
      height: `calc(100vh - ${m} - ${u})`
    };
    e.fullscreen && s.push("full-modal");
    const w = {
      ...t,
      onCancel: g,
      wrapClassName: s.join(" "),
      width: f ? "100%" : l,
      style: f ? {} : C
    }, h2 = () => createVNode("div", null, [e.isConfirmBtn && createVNode(button_default, {
      onClick: a,
      loading: e.loading,
      type: "primary"
    }, {
      default: () => [e.confirmBtnText]
    }), e.isCancelBtn && createVNode(button_default, {
      onClick: g
    }, {
      default: () => [e.cancelBtnText]
    }), r.footer && r.footer(g)]);
    return () => createVNode(modal_default, mergeProps(w, {
      open: e.modelValue
    }), {
      ...r,
      footer: h2
    });
  }
});
var Vt = {
  modelValue: {
    type: Object,
    default: () => ({})
  },
  option: {
    type: Object
  },
  formType: {
    type: String,
    default: "add"
  },
  defaults: {
    type: Object,
    default: () => ({})
  },
  isRequestDic: {
    type: Boolean,
    default: true
  }
};
var kt = ["update:modelValue", "submit", "empty", "update:defaults"];
var It = {
  submitBtn: true,
  submitBtnText: "提交",
  emptyBtn: true,
  emptyBtnText: "清空",
  footerBtn: true,
  labelWidth: "100px",
  labelAlign: "right",
  labelCol: {},
  wrapperCol: {},
  formMarighRight: "40px"
};
var At = [
  "label",
  "labelWidth",
  "rules",
  "error",
  "tooltip",
  "name",
  "labelCol",
  "wrapperCol"
];
var ie = {
  label: "",
  prop: "default",
  display: true,
  disabled: false,
  type: "input",
  span: 12,
  viewDisplay: true,
  editDisplay: true,
  addDisplay: true,
  editDisabled: false,
  addDisabled: false,
  range: false,
  searchRange: false
};
var me = {
  input: () => pe,
  textarea: () => Ue,
  number: () => Le,
  password: () => pe,
  select: () => Ye,
  date: () => H,
  time: () => H,
  datetime: () => H,
  month: () => H,
  week: () => H,
  checkbox: () => Ae,
  radio: () => Ee,
  cascader: () => Ie
};
function $t({ attrs: e, slots: t }) {
  const { includeRet: n, excludeRet: r } = G(e, At), { excludeRet: i } = G(r, he), m = e.type, u = t.default ? t.default : me[m] ? me[m]() : me.input(), l = {};
  function f() {
    const g = {}, C = e.name, w = new RegExp(`^${C}`);
    return Object.keys(t).forEach((h2) => {
      if (h2 !== "default" && w.test(h2)) {
        const b = h2.replace(`${C}`, ""), F = b.charAt(0).toLowerCase() + b.slice(1);
        F === "label" ? l.label = t[h2] : g[F] = t[h2];
      }
    }), g;
  }
  const s = `${n.name}Label`, a = `${n.name}Tooltip`;
  return t[`${s}`] && (delete n.label, l.label = t[`${s}`]), t[`${a}`] && (delete n.tooltip, l.tooltip = t[`${a}`]), n.labelCol = Object.assign({ style: { width: n.labelWidth } }, n.labelCol || {}), n.wrapperCol = { style: { width: "100px" } }, {
    includeRet: n,
    compIncludeRet: i,
    formItemSlots: l,
    component: u,
    getSlots: f
  };
}
var jt = defineComponent({
  inheritAttrs: false,
  name: "MFormItem",
  setup(e, t) {
    return () => {
      const {
        includeRet: n,
        component: r,
        compIncludeRet: i,
        getSlots: m,
        formItemSlots: u
      } = $t(t);
      return createVNode(FormItem_default, n, {
        default: () => h(r, {
          ...i
        }, m()),
        ...u
      });
    };
  }
});
var X = {
  request: null,
  column: {},
  hookUseTableSettings: {}
};
function Mt(e) {
  Object.assign(X, e);
}
function Lt() {
  return X;
}
function Et(e) {
  return new Promise((t, n) => {
    fetch(e, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then((r) => r.json()).then((r) => t(r)).catch((r) => n(r));
  });
}
function je(e) {
  return X.request ? X.request.get(e) : Et(e);
}
var Me = {
  "m-form-content": "_m-form-content_g643a_1"
};
function Yt(e, {
  slots: t,
  emit: n,
  expose: r
}) {
  var k;
  const {
    dicList: i,
    allRefs: m
  } = Dt(n, e), u = ref(), l = {};
  function f(d) {
    ["select", "radio", "checkbox", "cascader"].includes(d.type) && (d.dicData && !i.value[d.prop] ? i.value[d.prop] = d.dicData || [] : d.dicUrl && e.isRequestDic && je(d.dicUrl).then((p) => {
      var v;
      i.value[d.prop] = Ve(((v = d.dicFormatter) == null ? void 0 : v.call(d, p)) || [], d);
    }));
  }
  const s = {}, a = reactive({
    column: [],
    ...It,
    ...e.option
  });
  a.column = ((k = e == null ? void 0 : e.option) == null ? void 0 : k.column).map((d) => {
    const p = {
      labelWidth: a.labelWidth,
      ...ie,
      ...X.column,
      ...d
    };
    return p.disabled = Ce(p, e.formType), p.placeholder = xt(p), p.display = Se(p, e.formType), d.rules && (s[d.prop] = d.rules), p.name = p.prop, p.slots = w(p.prop), p.originItem = {
      ...ie,
      ...d
    }, l[p.name] = d.value, f(p), p;
  });
  const g = computed(() => {
    var d;
    return ((d = e == null ? void 0 : e.option) == null ? void 0 : d.column).map((p) => ({
      labelWidth: a.labelWidth,
      ...ie,
      ...X.column,
      ...p
    }));
  });
  function C() {
    a.column.forEach((d) => {
      var v;
      const p = (v = g.value) == null ? void 0 : v.find((T) => T.prop === d.prop);
      p && (d.disabled = Ce(p, e.formType), d.display = Se(p, e.formType), f(d));
    });
  }
  watch(() => [e.formType, e.option], C, {
    deep: true
  }), n("update:modelValue", Object.assign({}, l, e.modelValue)), n("update:defaults", a);
  function w(d) {
    const p = {};
    return Object.keys(t).forEach((v) => {
      v.startsWith(d) && (p[v === d ? "default" : v] = t[v]);
    }), p;
  }
  function h2() {
    return a.footerBtn && createVNode("div", {
      class: Me["m-form-btn"]
    }, [[a.submitBtn && createVNode(button_default, {
      onClick: F,
      type: "primary"
    }, {
      default: () => [a.submitBtnText]
    }), a.emptyBtn && createVNode(button_default, {
      onClick: O
    }, {
      default: () => [a.emptyBtnText]
    }), t.footer && t.footer()]]);
  }
  async function b(d) {
    var p;
    try {
      const v = await ((p = u.value) == null ? void 0 : p.validate());
      d(true, v);
    } catch (v) {
      d(false, v);
    }
  }
  function F() {
    b((d) => {
      n("submit", d);
    });
  }
  function A() {
    var d;
    (d = u.value) == null || d.resetFields();
  }
  function O() {
    var d;
    (d = u.value) == null || d.resetFields(), n("empty");
  }
  return r({
    validate: b,
    submit: F,
    empty: O,
    dicList: i,
    allRefs: m,
    formRef: u,
    assignOption: a,
    resetFields: A,
    initForm: l
  }), {
    formRef: u,
    assignOption: a,
    rules: s,
    renderFooterBtn: h2
  };
}
function Ut(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !isVNode(e);
}
var ye = defineComponent({
  name: "MForm",
  props: Vt,
  emits: kt,
  setup(e, t) {
    const {
      formRef: n,
      assignOption: r,
      rules: i,
      renderFooterBtn: m
    } = Yt(e, t);
    return () => {
      let u;
      return createVNode(Fragment, null, [createVNode(form_default, mergeProps({
        ref: n
      }, r.otherConfig, {
        labelAlign: r.labelAlign,
        rules: i,
        model: e.modelValue,
        layout: r.layout,
        autocomplete: "off",
        wrapperCol: r.wrapperCol,
        labelCol: r.labelCol,
        style: {
          marginRight: r.formMarighRight
        },
        class: Me["m-form-content"]
      }), {
        default: () => [createVNode(row_default, {
          gutter: 20
        }, Ut(u = r.column.filter((l) => l.display).map((l) => createVNode(col_default, {
          span: l.span
        }, {
          default: () => [createVNode(jt, l, l.slots)]
        }))) ? u : {
          default: () => [u]
        })]
      }), m()]);
    };
  }
});
var pe = defineComponent({
  name: "MInput",
  props: {
    ...fe,
    ...Ct
  },
  emits: [],
  inheritAttrs: false,
  setup(e, {
    attrs: t,
    slots: n
  }) {
    const r = ref(), {
      getFormData: i,
      modifyFormData: m,
      collectionAllRefs: u
    } = W(), {
      excludeRet: l
    } = G(t, Oe), f = computed({
      get() {
        return i(e.prop);
      },
      set(s) {
        m(s, e.prop);
      }
    });
    return u(e.prop, r), () => createVNode(Fragment, null, [e.type === "password" ? createVNode(Password_default, mergeProps(l, {
      value: f.value,
      "onUpdate:value": (s) => f.value = s,
      ref: r
    }), n) : createVNode(input_default, mergeProps(l, {
      value: f.value,
      "onUpdate:value": (s) => f.value = s,
      ref: r
    }), n)]);
  }
});
var Le = defineComponent({
  name: "MInputNumber",
  props: fe,
  emits: ["update:modelValue"],
  inheritAttrs: false,
  setup(e, {
    attrs: t,
    slots: n
  }) {
    const r = ref(), {
      getFormData: i,
      modifyFormData: m,
      collectionAllRefs: u
    } = W(), l = computed({
      get() {
        return i(e.prop);
      },
      set(f) {
        m(f, e.prop);
      }
    });
    return u(e.prop, r), () => createVNode(input_number_default, mergeProps(t, {
      style: {
        width: "100%"
      },
      value: l.value,
      "onUpdate:value": (f) => l.value = f,
      ref: r
    }), n);
  }
});
function Wt(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !isVNode(e);
}
var Ee = defineComponent({
  name: "MRadio",
  props: ne,
  emits: [],
  inheritAttrs: false,
  setup(e) {
    const t = ref(), {
      dicList: n,
      getFormData: r,
      modifyFormData: i,
      collectionAllRefs: m
    } = W(), u = computed({
      get() {
        return r(e.prop);
      },
      set(f) {
        i(e.dataType ? q(f, e.dataType) : f, e.prop);
      }
    }), l = computed(() => n.value[e.prop] || []);
    return m(e.prop, t), () => {
      let f;
      return createVNode(Group_default, {
        ref: t,
        value: u.value,
        "onUpdate:value": (s) => u.value = s
      }, Wt(f = l.value.map((s) => createVNode(radio_default, {
        value: s.value,
        key: s.value
      }, {
        default: () => [s.label]
      }))) ? f : {
        default: () => [f]
      });
    };
  }
});
var Ye = defineComponent({
  name: "MSelect",
  props: ne,
  emits: ["update:modelValue"],
  inheritAttrs: false,
  setup(e, {
    attrs: t
  }) {
    const n = ref(), {
      dicList: r,
      getFormData: i,
      modifyFormData: m,
      collectionAllRefs: u
    } = W(), {
      excludeRet: l
    } = G(t, Oe), f = computed(() => r.value[e.prop]);
    u(e.prop, n);
    const s = computed({
      get() {
        return i == null ? void 0 : i(e.prop);
      },
      set(a) {
        m(e.dataType ? q(a, e.dataType) : a, e.prop);
      }
    });
    return () => createVNode(select_default, mergeProps({
      allowClear: true
    }, l, {
      ref: n,
      value: s.value,
      "onUpdate:value": (a) => s.value = a
    }), {
      default: () => {
        var a;
        return [(a = f.value) == null ? void 0 : a.map((g) => createVNode(SelectOption, {
          value: g.value
        }, {
          default: () => [g.label]
        }))];
      }
    });
  }
});
var Pt = {
  /** 表单数据 */
  modelValue: {
    type: Object,
    default: () => ({})
  },
  /** 表格数据 */
  data: {
    type: Array,
    default: () => []
  },
  /** 配置项 */
  option: {
    type: Object
  },
  /** 表单类型 */
  formType: {
    type: String,
    default: "add"
  },
  /** 分页信息 */
  pagination: {
    type: Object
  },
  searchForm: {
    type: Object,
    default: () => ({})
  },
  beforeOpen: {
    type: Function
  },
  loading: {
    type: Boolean,
    default: false
  }
};
var zt = ["update:modelValue", "update:searchForm", "search", "empty", "submit", "delete", "refresh", "pageSizeChange"];
var _t = {
  addBtn: true,
  editBtn: true,
  delBtn: true,
  viewBtn: false,
  columnBtn: true,
  refreshBtn: true,
  sizeBtn: true,
  card: true,
  addBtnText: "新增",
  editBtnText: "编辑",
  delBtnText: "删除",
  viewBtnText: "查看",
  menu: true,
  menuWidth: 200,
  dialogWidth: 900,
  index: true,
  height: 500,
  tableX: 0,
  align: "center"
};
var Kt = {
  prop: "operation",
  title: "菜单",
  dataIndex: "operation",
  align: "center",
  fixed: "right",
  sort: -1
};
var qt = {
  total: 0,
  showSizeChanger: true,
  showTotal: (e) => `共${e}条`
};
var Nt = ["span", "labelWidth", "rules", "value", "display", "disabled", "range"];
var Ht = {
  /** 表单数据 */
  modelValue: {
    type: Object,
    default: () => ({})
  },
  /** 配置项 */
  option: {
    type: Object
  },
  emitsEvent: {
    type: Function
  }
};
var Gt = ["update:modelValue", "submit", "empty"];
function Xt(e, {
  emit: t,
  expose: n
}) {
  var h2;
  const r = ref(), i = ref({}), m = computed({
    get() {
      return e.modelValue;
    },
    set(b) {
      t("update:modelValue", b);
    }
  }), u = ref(false), l = computed(() => {
    var F, A, O, k;
    const b = {
      searchIndex: 3,
      ...e.option,
      labelAlign: ((F = e.option) == null ? void 0 : F.searchLabelAlign) || "right",
      labelWidth: (A = e.option) == null ? void 0 : A.searchLabelWidth,
      footerBtn: false,
      column: []
    };
    return b.column = (k = (O = e.option) == null ? void 0 : O.column) == null ? void 0 : k.filter((d) => d.search).sort((d, p) => (p.searchOrder || 0) - (d.searchOrder || 0)).map((d, p) => {
      const {
        excludeRet: v
      } = G(d, Nt);
      return {
        ...ie,
        ...v,
        value: v.searchValue,
        labelWidth: v.searchLabelWidth || b.searchLabelWidth,
        span: d.searchSpan || 8,
        display: b.searchIcon && !u.value ? p < (b.searchIndex || 0) : true,
        range: d.searchRange
      };
    }), b;
  });
  function f() {
    var b;
    i.value.searchIcon && ((b = i.value.column) == null || b.forEach((F, A) => {
      var O;
      F.display = u.value || A < (((O = i.value) == null ? void 0 : O.searchIndex) || 0);
    }));
  }
  f();
  function s() {
    u.value = !u.value, f();
  }
  function a() {
    e.emitsEvent("search", toRaw(m.value));
  }
  function g() {
    m.value = {}, r.value.resetFields(), e.emitsEvent("empty");
  }
  const C = ((h2 = l.value.column) == null ? void 0 : h2.length) || 0;
  function w() {
    const {
      searchIcon: b,
      searchIndex: F = 3
    } = l.value;
    return b && C > F && createVNode(button_default, {
      type: "link",
      onClick: s,
      icon: h(u.value ? UpOutlined_default : DownOutlined_default)
    }, {
      default: () => [u.value ? "收起" : "展开"]
    });
  }
  return n({
    formRef: r
  }), {
    assignOption: l,
    isExpand: u,
    expandClick: s,
    renderFooterBtn: w,
    defaultsOptions: i,
    modelValue: m,
    search: a,
    empty: g,
    formRef: r,
    searchCount: C
  };
}
var Jt = defineComponent({
  name: "MSearch",
  props: Ht,
  emits: Gt,
  setup(e, t) {
    const {
      renderFooterBtn: n,
      assignOption: r,
      defaultsOptions: i,
      modelValue: m,
      search: u,
      empty: l,
      formRef: f,
      searchCount: s
    } = Xt(e, t);
    return () => s ? createVNode("div", {
      class: "m-search"
    }, [createVNode(ye, {
      ref: f,
      modelValue: m.value,
      "onUpdate:modelValue": (a) => m.value = a,
      "onUpdate:defaults": (a) => Object.assign(i.value, a),
      defaults: i,
      option: r.value,
      isRequestDic: false
    }, t.slots), createVNode("div", {
      class: "search-btn"
    }, [t.slots.leftBtn && t.slots.leftBtn(), createVNode(button_default, {
      icon: h(SearchOutlined_default),
      type: "primary",
      onClick: u
    }, {
      default: () => [createTextVNode("搜索")]
    }), createVNode(button_default, {
      icon: h(ReloadOutlined_default),
      onClick: l
    }, {
      default: () => [createTextVNode("重置")]
    }), t.slots.rightBtn && t.slots.rightBtn(), n()])]) : "";
  }
});
function Qt(e, {
  emit: t,
  slots: n,
  expose: r
}) {
  var le, J;
  const i = ref(), m = ref(), u = {}, l = reactive({
    visible: false,
    title: "新增",
    formType: "add",
    submitLoading: false,
    selectedKeys: ["middle"],
    colmunSelectKeys: []
  }), f = {
    page: 1,
    pageSize: 10
  }, s = computed({
    get() {
      return e.searchForm || {};
    },
    set(o) {
      t("update:searchForm", o);
    }
  }), a = reactive({
    column: [],
    ..._t,
    ...e.option,
    footerBtn: false
  });
  function g() {
    t("refresh");
  }
  function C(o = {}) {
    l.formType = "add", l.title = a.addTitle || "新增";
    function y() {
      var B, x;
      if ((B = Object.keys(o)) != null && B.length)
        T(o);
      else {
        const L = ((x = i.value) == null ? void 0 : x.initForm) || {};
        T({
          ...L
        });
      }
    }
    e.beforeOpen ? e.beforeOpen(l.formType, () => {
      l.visible = true, y();
    }) : (l.visible = true, y());
  }
  function w(o) {
    l.formType = "edit", l.title = a.editTitle || "编辑", e.beforeOpen ? e.beforeOpen(l.formType, () => {
      l.visible = true, T(toRaw({
        ...o
      }));
    }) : (l.visible = true, T(toRaw({
      ...o
    })));
  }
  function h2(o) {
    l.formType = "view", l.title = a.viewTitle || "查看", e.beforeOpen ? e.beforeOpen(l.formType, () => {
      l.visible = true, T(toRaw({
        ...o
      }));
    }) : (l.visible = true, T(toRaw({
      ...o
    })));
  }
  function b(o) {
    t("delete", toRaw(o));
  }
  const F = {
    dialog: {},
    form: {},
    table: {
      headerCell: (o) => {
        var B;
        const y = (B = n[`${o.column.dataIndex}Label`]) == null ? void 0 : B.call(n, o);
        return y !== void 0 ? Array.isArray(y) ? y : [createVNode("span", null, y)] : [createVNode("span", null, o.title)];
      },
      bodyCell: (o) => {
        var L, Q;
        function y() {
          var be, ge;
          const {
            record: oe,
            column: z
          } = o, U = oe[`${o.column.dataIndex}`], Y = z.dicData || u[z.prop] || [];
          if (z.type === "checkbox" || z.multiple) {
            const Z = ((be = U == null ? void 0 : U.split(",")) == null ? void 0 : be.map((_) => Y.find((We) => String(We.value) === String(_))).filter((_) => _)) || [];
            return Z == null ? void 0 : Z.map((_) => _ == null ? void 0 : _.label).join(",");
          } else
            return ((ge = Y.find((Z) => String(Z.value) === String(U))) == null ? void 0 : ge.label) || U;
        }
        const {
          page: B,
          pageSize: x
        } = f;
        return [o.column.dataIndex === "indexNum" && (B - 1) * x + o.index + 1, o.column.dataIndex === "operation" && createVNode(Fragment, null, [a.editBtn ? createVNode(button_default, {
          type: "link",
          icon: h(EditOutlined_default),
          onClick: () => w(o.record)
        }, {
          default: () => [a.editBtnText]
        }) : null, a.viewBtn ? createVNode(button_default, {
          type: "link",
          class: "m-table-btn-green",
          icon: h(EyeOutlined_default),
          onClick: () => h2(o.record)
        }, {
          default: () => [a.viewBtnText]
        }) : null, a.delBtn ? createVNode(button_default, {
          type: "link",
          icon: h(DeleteOutlined_default),
          onClick: () => b(o.record),
          danger: true
        }, {
          default: () => [a.delBtnText]
        }) : null, n.menu && ((L = n.menu) == null ? void 0 : L.call(n, o))]), n[o.column.dataIndex] && ((Q = n[o.column.dataIndex]) == null ? void 0 : Q.call(n, o)), !n[o.column.dataIndex] && St.includes(o.column.type || "") && y()];
      }
    },
    search: {
      leftBtn: n.searchLeftBtn || null,
      rightBtn: n.searchRightBtn || null
    }
  };
  function A(o) {
    var y;
    (y = o.dicData) != null && y.length && (u[o.prop] = o.dicData), o.dicUrl && je(o.dicUrl).then((B) => {
      var z, U;
      const {
        label: x = "label",
        value: L = "value",
        valueType: Q
      } = o.dicProps || {}, oe = a.column.find((Y) => Y.prop === o.prop) || {};
      oe.dicData = (U = (z = o.dicFormatter) == null ? void 0 : z.call(o, B)) == null ? void 0 : U.map((Y) => ({
        label: Y[x],
        value: Q ? q(Y[L], Q) : Y[L],
        row: Y
      })), u[o.prop] = oe.dicData || [];
    });
  }
  function O(o) {
    const y = new RegExp(`^${o}Search`), B = new RegExp(`^${o}Form`);
    Object.keys(n).forEach((x) => {
      if (y.test(x)) {
        if (n[x]) {
          const L = x.replace(`${o}Search`, "") ? x.replace("Search", "") : o;
          F.search[L] = n[x];
        }
      } else if (B.test(x)) {
        const L = x.replace("Form", "");
        n[x] && (F.form[L] = n[x]);
      }
    });
  }
  if (a.column = (J = ((le = e.option) == null ? void 0 : le.column) || []) == null ? void 0 : J.map((o, y) => {
    const B = {
      hide: false,
      sort: 0,
      ...o,
      title: o.label,
      dataIndex: o.prop,
      align: o.align || a.align,
      colHide: o.hide || false
    };
    return O(o.prop), ["select", "radio", "checkbox", "cascader"].includes(o.type) && A(B), B;
  }), a.index) {
    const o = {
      prop: "indexNum",
      title: "序号",
      dataIndex: "indexNum",
      display: false,
      align: "center",
      width: 80,
      sort: 999999
    };
    a.indexFixed && (o.fixed = a.indexFixed), a.column.unshift(o);
  }
  a.menu && a.column.push({
    ...Kt,
    width: a.menuWidth
  }), n.dialogFooter && (F.dialog.footer = n.dialogFooter), l.colmunSelectKeys = a.column.filter((o) => !o.hide).map((o) => o.prop);
  const k = computed(() => ({
    ...a,
    column: a.column.filter((o) => o.dataIndex !== "operation")
  }));
  function d(o, ...y) {
    t(o, ...y);
  }
  function p(o) {
    l.visible = o, i.value.resetFields();
  }
  function v(o) {
    i.value.validate((y, B) => {
      if (y) {
        l.submitLoading = true;
        const x = () => l.submitLoading = false;
        t("submit", toRaw(e.modelValue), x, o);
      }
    });
  }
  function T(o) {
    t("update:modelValue", o);
  }
  function j(o, y) {
    f.page = o, f.pageSize = y, t("pageSizeChange", o, y);
  }
  function S() {
    l.submitLoading = false;
  }
  function M(o) {
    l.selectedKeys = [o.key];
  }
  const P = () => createVNode(menu_default, {
    "selected-keys": l.selectedKeys,
    onClick: M
  }, {
    default: () => [createVNode(menu_default.Item, {
      key: "default"
    }, {
      default: () => [createTextVNode("表格（大）")]
    }), createVNode(menu_default.Item, {
      key: "middle"
    }, {
      default: () => [createTextVNode("表格（中）")]
    }), createVNode(menu_default.Item, {
      key: "small"
    }, {
      default: () => [createTextVNode("表格（小）")]
    })]
  });
  function N() {
    const o = a.column.filter((y) => !y.hide && y.prop !== "operation").map((y) => ({
      label: y.title,
      value: y.prop
    }));
    return createVNode(Group_default2, {
      value: l.colmunSelectKeys,
      "onUpdate:value": (y) => l.colmunSelectKeys = y,
      class: "checkboxGroup-settings",
      options: o
    }, null);
  }
  watch(() => l.colmunSelectKeys, (o) => {
    a.column.forEach((y) => {
      y.prop !== "operation" && (y.colHide = y.hide || !o.includes(y.prop));
    });
  });
  const ae = toRef(l, "formType");
  return r({
    formRef: i,
    submit: v,
    rowAdd: C,
    rowEdit: w,
    rowView: h2,
    formType: ae
  }), {
    formRef: i,
    searchRef: m,
    tableOption: a,
    allSlots: F,
    searchForm: s,
    state: l,
    formOption: k,
    emitsEvent: d,
    rowAdd: C,
    close: p,
    submit: v,
    updateForm: T,
    refresh: g,
    pageSizeChange: j,
    afterClose: S,
    getMenu: P,
    getColumnSettings: N
  };
}
function Zt(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !isVNode(e);
}
var en = defineComponent({
  name: "MTable",
  props: Pt,
  emits: zt,
  setup(e, t) {
    const {
      searchRef: n,
      tableOption: r,
      allSlots: i,
      searchForm: m,
      state: u,
      formOption: l,
      formRef: f,
      emitsEvent: s,
      afterClose: a,
      rowAdd: g,
      close: C,
      submit: w,
      updateForm: h2,
      refresh: b,
      pageSizeChange: F,
      getMenu: A,
      getColumnSettings: O
    } = Qt(e, t);
    return () => {
      let k;
      const d = r.column.filter((j) => !j.colHide).sort((j, S) => (S.sort || 0) - (j.sort || 0)), p = r.tableX || d.reduce((j, S) => j + (S.width || 100), 0), v = r.submitBtn && u.formType !== "view";
      function T() {
        return createVNode(Fragment, null, [createVNode("div", {
          class: "m-table-search"
        }, [createVNode(Jt, {
          ref: n,
          modelValue: m.value,
          "onUpdate:modelValue": (j) => m.value = j,
          option: r,
          emitsEvent: s
        }, i.search)]), createVNode("div", {
          class: "m-table-Btn"
        }, [createVNode("div", {
          class: "m-table-Btn-left"
        }, [createVNode(space_default, null, {
          default: () => [r.addBtn && createVNode(button_default, {
            icon: h(PlusOutlined_default),
            type: "primary",
            onClick: () => g({})
          }, {
            default: () => [r.addBtnText]
          }), t.slots.menuLeft && t.slots.menuLeft()]
        })]), createVNode("div", {
          class: "m-table-Btn-right"
        }, [createVNode(space_default, null, {
          default: () => [t.slots.menuRight && t.slots.menuRight(), r.columnBtn && createVNode(popover_default, {
            placement: "bottomRight",
            trigger: "hover"
          }, {
            default: () => [createVNode(button_default, {
              type: "dashed",
              icon: h(SettingOutlined_default)
            }, null)],
            content: O
          }), r.sizeBtn && createVNode(dropdown_default, {
            trigger: ["hover"]
          }, {
            default: () => [createVNode(button_default, {
              type: "dashed",
              icon: h(FontSizeOutlined_default)
            }, null)],
            overlay: A
          }), r.refreshBtn && createVNode(button_default, {
            type: "dashed",
            loading: e.loading,
            icon: h(ReloadOutlined_default),
            onClick: b
          }, null)]
        })])]), createVNode(table_default, {
          scroll: {
            x: p,
            y: r.height
          },
          size: u.selectedKeys[0],
          dataSource: e.data,
          loading: e.loading,
          columns: d,
          pagination: Object.assign({}, qt, e.pagination, {
            onChange: F
          }),
          bordered: true
        }, i.table)]);
      }
      return createVNode("div", {
        class: "m-table"
      }, [r.card ? createVNode(card_default, {
        class: "m-table-card"
      }, Zt(k = T()) ? k : {
        default: () => [k]
      }) : T(), createVNode($e, {
        afterClose: a,
        loading: u.submitLoading,
        width: `${r.dialogWidth}px`,
        class: "m-table-dialog",
        modelValue: u.visible,
        "onUpdate:modelValue": C,
        onConfirm: w,
        title: u.title,
        isCancelBtn: r.emptyBtn,
        isConfirmBtn: v
      }, {
        default: () => [createVNode(ye, {
          modelValue: e.modelValue,
          formType: u.formType,
          "onUpdate:modelValue": h2,
          ref: f,
          option: l.value
        }, i.form)],
        ...i.dialog
      })]);
    };
  }
});
var Ue = defineComponent({
  name: "MTextarea",
  props: fe,
  emits: ["update:modelValue"],
  inheritAttrs: false,
  setup(e, {
    attrs: t,
    slots: n
  }) {
    const r = ref(), {
      getFormData: i,
      modifyFormData: m,
      collectionAllRefs: u
    } = W(), l = computed({
      get() {
        return i(e.prop);
      },
      set(f) {
        m(f, e.prop);
      }
    });
    return u(e.prop, r), () => createVNode(TextArea_default, mergeProps({
      autoSize: {
        minRows: 6,
        maxRows: 6
      }
    }, t, {
      value: l.value,
      "onUpdate:value": (f) => l.value = f,
      ref: r
    }), n);
  }
});
var tn = Object.freeze(Object.defineProperty({
  __proto__: null,
  Cascader: Ie,
  Checkbox: Ae,
  Date: H,
  Dialog: $e,
  Form: ye,
  Input: pe,
  InputNumber: Le,
  Radio: Ee,
  Select: Ye,
  Table: en,
  Textarea: Ue
}, Symbol.toStringTag, { value: "Module" }));
var nn = class {
  constructor() {
    ee(this, "beforeGetList", () => {
    });
    ee(this, "afterGetList", () => {
    });
    ee(this, "beforeSave", () => {
    });
    ee(this, "afterSave", () => {
    });
  }
  setBeforeGetList(t) {
    this.beforeGetList = t;
  }
  setAfterGetList(t) {
    this.afterGetList = t;
  }
  setBeforeSave(t) {
    this.beforeSave = t;
  }
  setAfterSave(t) {
    this.afterSave = t;
  }
};
function an(e) {
  return e.data;
}
function ln(e) {
  return e.total;
}
function sn(e) {
  const t = new nn(), n = Object.assign({}, Lt().hookUseTableSettings, e), {
    rowKey: r = "id",
    getList: i,
    create: m,
    update: u,
    remove: l,
    tableOption: f,
    resFormatter: s = an,
    totalFormatter: a = ln,
    searchForm: g = {},
    queryForm: C = {}
  } = n, w = ref(), h2 = reactive({
    searchForm: {
      ...g
    },
    queryForm: {
      pageSize: 10,
      current: 1,
      ...C
    },
    loading: false,
    data: [],
    formData: {},
    pagination: {
      total: 0
    }
  });
  async function b() {
    var M;
    h2.loading = true;
    const S = {
      ...xe(h2.queryForm),
      ...xe(h2.searchForm)
    };
    await ((M = t.beforeGetList) == null ? void 0 : M.call(t, S)), i(S).then(async (P) => {
      var N;
      h2.data = s(P), h2.pagination.total = a(P), await ((N = t.afterGetList) == null ? void 0 : N.call(t, P));
    }).finally(() => {
      h2.loading = false;
    });
  }
  async function F(S, M, P) {
    var ae;
    const N = S.id ? u : m;
    await ((ae = t.beforeSave) == null ? void 0 : ae.call(t, S)), N(S).then(async (le) => {
      var J;
      await ((J = t.afterSave) == null ? void 0 : J.call(t, le)), b(), P(), message_default.success(S.id ? "修改成功" : "新增成功");
    }).finally(() => {
      M();
    });
  }
  function A(S) {
    modal_default.confirm({
      title: "提示",
      content: "是否删除该数据？",
      onOk() {
        const M = S[r];
        M && l(M).then(() => {
          message_default.success("删除成功"), b();
        });
      }
    });
  }
  function O(S) {
    h2.searchForm = S;
  }
  function k() {
    b();
  }
  function d() {
    b();
  }
  function p() {
    b();
  }
  function v(S, M) {
    h2.queryForm.pageSize = M, h2.queryForm.current = S, b();
  }
  function T(S) {
    h2.formData = S;
  }
  const j = computed(() => ({
    ref: w,
    data: h2.data,
    searchForm: h2.searchForm,
    modelValue: h2.formData,
    loading: h2.loading,
    option: f,
    pagination: h2.pagination,
    "onUpdate:modelValue": T,
    "onUpdate:searchForm": O,
    onSearch: e.handleSearch || k,
    onEmpty: e.handleEmpty || d,
    onSubmit: e.handleSubmit || F,
    onDelete: e.handleRemove || A,
    onRefresh: e.handleRefresh || p,
    onPageSizeChange: v
  }));
  return {
    getDataList: b,
    formData: toRef(h2, "formData"),
    valBind: j,
    state: h2,
    tableRef: w,
    collection: t
  };
}
var dn = {
  install(e) {
    Object.values(tn).forEach((t) => {
      e.component(t.name, t);
    });
  },
  collection: Mt
};
export {
  $e as Dialog,
  ye as Form,
  en as Table,
  dn as default,
  sn as useTable
};
//# sourceMappingURL=@mhua_table.js.map
