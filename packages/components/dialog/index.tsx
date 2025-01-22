import type { AttrsType } from '~/types'

import { Button, Modal } from 'ant-design-vue'
import { defineComponent } from 'vue';

import { props } from '~/const/dialog';
import './index.scss'

export default defineComponent({
  name: 'Dialog',
  props,
  emits: ['update:modelValue', 'confirm'],
  setup(props, { attrs, emit, slots }) {
    const { onCancel: cancel, top, bottom, width, fullscreen } = props;
    const wrapClassName = ['m-modal']

    const onConfirm = () => emit('confirm', () => { emit('update:modelValue', false) });
    const onCancel = cancel || (() => emit('update:modelValue', false))

    const style: AttrsType = { top, bottom, width, height: `calc(100vh - ${top} - ${bottom})` }

    if (props.fullscreen) {
      wrapClassName.push('full-modal');
    }

    const bindAttrs: AttrsType = {
      ...attrs,
      onCancel,
      wrapClassName: wrapClassName.join(' '),
      width: fullscreen ? '100%' : width,
      style: fullscreen ? {} : style,
    };

    const footer = () => (
      <div>
        {props.isConfirmBtn && <Button onClick={onConfirm} loading={props.loading} type="primary">{props.confirmBtnText}</Button>}
        {props.isCancelBtn && <Button onClick={onCancel}>{props.cancelBtnText}</Button>}
        {slots.footer && slots.footer(onCancel)}
      </div>
    )

    return () => (<Modal {...bindAttrs} open={props.modelValue} v-slots={{ ...slots, footer }}></Modal>)
  },
});
