<script lang="ts" setup>
import { ref } from 'vue';

import { ResizeDialog } from '~/components';

const visible = ref(false)

function handlecCancel() {
  console.log(1111);
}

function handleConfirm() {
  console.log(9999)
}
</script>

<template>
  <div>
    <ResizeDialog v-model="visible" is-drag title="标题" :closable="false" @confirm="handleConfirm">
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
    <button @click="visible = !visible">
      全屏
    </button>
  </div>
</template>

<style lang="scss" scoped></style>
