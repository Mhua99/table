import type { PropType } from 'vue'

export const props = {
  /** 弹窗显示和隐藏 */
  modelValue: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  /** 弹窗宽度 */
  width: {
    type: String as PropType<string>,
    default: '520px',
  },
  /** 是否显示确认按钮 */
  isConfirmBtn: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  /** 是否显示取消按钮 */
  isCancelBtn: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  /** 确认按钮文字 */
  confirmBtnText: {
    type: String as PropType<string>,
    default: '确认',
  },
  /** 取消按钮文字 */
  cancelBtnText: {
    type: String as PropType<string>,
    default: '取消',
  },
  /** 确认按钮事件 */
  onConfirm: {
    type: Function,
  },
  /** 取消按钮事件 */
  onCancel: {
    type: Function,
  },
  /** 是否全屏 */
  fullscreen: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  /** 不是全屏的状态下，距离顶部距离 默认 10vh */
  top: {
    type: String,
    default: '10vh',
  },
  /** 不是全屏的状态下，距离底部距离 默认 10vh */
  bottom: {
    type: String,
    default: '10vh',
  },
  /** 加载 */
  loading: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  /** 是否拖动 */
  isDrag: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  /** 弹窗高度 */
  height: {
    type: String as PropType<string>,
  },
}
