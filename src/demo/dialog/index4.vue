<script lang="ts" setup>
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { Avatar, Badge, Button, Modal } from 'ant-design-vue'
import { createVNode, ref } from 'vue'

import { ResizeDialog, ResizeDialogGroup } from '~/components';

const visible = ref(false)
const state = ref({
  test1: true,
})

function handlecCancel() {
  console.log(1111);
}

function handleConfirm() {
  console.log(9999)
}

function beforeClose(done: () => void) {
  Modal.confirm({
    content: '是否关闭弹窗',
    icon: createVNode(ExclamationCircleOutlined),
    onOk() {
      done()  
    },
    onCancel() {
    },
  });
}
</script>

<template>
  <div>
    <ResizeDialogGroup v-model="state">
      <ResizeDialog unique-key="test1" title="标题111" :is-cancel-btn="false" @confirm="handleConfirm">
        <div>1111111111111</div>
        <div>1111111111111</div>
        <div>1111111111111</div>
        <div>1111111111111</div>
        <div>1111111111111</div>
        <div>1111111111111</div>
        <div>1111111111111</div>
        <div>1111111111111</div>
        <div>1111111111111</div>
        <div>1111111111111</div>
        <div>1111111111111</div>
        <div>1111111111111</div>
        <div>1111111111111</div>
        <div>1111111111111</div>
        <div>1111111111111</div>
        <div>1111111111111</div>
        <div>1111111111111</div>
        <div>1111111111111</div>
        <div>1111111111111</div>
        <template #footer>
          <Button>测试</Button>
        </template>
      </ResizeDialog>
      <ResizeDialog unique-key="test2" title="标题222" :is-confirm-btn="false" :before-close="beforeClose" @confirm="handleConfirm">
        <div>1111111111111</div>
        <div>1111111111111</div>
        <div>1111111111111</div>
        <div>1111111111111</div>
        <div>1111111111111</div>
        <div>1111111111111</div>
        <div>1111111111111</div>
        <div>1111111111111</div>
        <div>1111111111111</div>
        <div>1111111111111</div>
        <div>1111111111111</div>
        <div>1111111111111</div>
        <div>1111111111111</div>
        <div>1111111111111</div>
        <div>1111111111111</div>
        <div>1111111111111</div>
        <div>1111111111111</div>
        <div>1111111111111</div>
        <div>1111111111111</div>
      </ResizeDialog>
      <template #list="data">
        <Badge :count="data.filter(item => item.domVisible)?.length">
          <Avatar shape="square" size="large" />
        </Badge>
      </template>
    </ResizeDialogGroup>
    <Button type="primary" @click="state.test1 = true">
      测试1
    </Button>
    <Button type="primary" @click="state.test2 = true">
      测试2
    </Button>
  </div>
</template>

<style lang="scss" scoped></style>
