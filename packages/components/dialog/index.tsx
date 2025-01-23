import type { AttrsType } from '~/types'

import { Button, Modal } from 'ant-design-vue'
import { defineComponent, nextTick, ref, watch } from 'vue';

import { props } from '~/const/dialog';
import './index.scss'

export default defineComponent({
  name: 'Dialog',
  props,
  emits: ['update:modelValue', 'confirm'],
  setup(props, { attrs, emit, slots, expose }) {
    const dialogRef = ref<InstanceType<typeof Modal> | null>(null);
    const { onCancel: cancel, top, bottom, width, fullscreen } = props;
    const wrapClassName = ['m-modal', 'draggable-modal'];

    const keyId = `dialog_${Number.parseInt(`${Math.random() * 10000000}`)}`
    const onConfirm = () => emit('confirm', () => { emit('update:modelValue', false) });
    const onCancel = cancel || (() => emit('update:modelValue', false))

    const style: AttrsType = { top, bottom, width, height: props.height || `calc(100vh - ${top} - ${bottom})` }

    if (props.fullscreen) {
      wrapClassName.push('full-modal');
    }

    if (props.isDrag) {
      wrapClassName.push('drag-modal');
      wrapClassName.push(keyId);
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

    let dragStart: (e: MouseEvent) => void;

    watch(() => props.modelValue, async (val) => {
      if (!props.isDrag)
        return

      await nextTick();
      if (val) {
        const dialogHtml = document.querySelector(`.${keyId}`)?.querySelector('.ant-modal') as HTMLDivElement;
        const headerHtml = dialogHtml?.querySelector('.ant-modal-header');
        const left = document.body.clientWidth / 2 - (dialogHtml?.clientWidth || 0) / 2
        !dialogHtml?.style?.left && (dialogHtml.style.left = `${left}px`)

        if (dialogHtml) {
          dragStart = (e: MouseEvent) => {
            const offsetX = e.clientX - dialogHtml.offsetLeft
            const offsetY = e.clientY - dialogHtml.offsetTop
            const mouseMoveHandler = (e: MouseEvent) => {
              const maxX = window.innerWidth - dialogHtml.clientWidth;
              const maxY = window.innerHeight - dialogHtml.clientHeight;
              const newLeft = Math.max(0, Math.min(e.clientX - offsetX, maxX));
              const newTop = Math.max(0, Math.min(e.clientY - offsetY, maxY));
              dialogHtml.style.left = `${newLeft}px`;
              dialogHtml.style.top = `${newTop}px`;
            };

            const mouseUpHandler = () => {
              document.removeEventListener('mousemove', mouseMoveHandler);
              document.removeEventListener('mouseup', mouseUpHandler);
            };

            document.addEventListener('mousemove', mouseMoveHandler);
            document.addEventListener('mouseup', mouseUpHandler);
          };

          headerHtml?.addEventListener('mousedown', dragStart as EventListener);
        }
      }
      else {
        const dialogHtml = document.querySelector(`.${keyId}`)?.querySelector('.ant-modal') as HTMLDivElement;
        const headerHtml = dialogHtml?.querySelector('.ant-modal-header');
        headerHtml?.removeEventListener('mousedown', dragStart as EventListener);
      }
    }, {
      immediate: true,
    })

    return () => (
      <Modal ref={dialogRef} {...bindAttrs} open={props.modelValue} v-slots={{ ...slots, footer }}>
        {slots.default && slots.default()}
      </Modal>
    )
  },
});
