<script lang="ts" setup>
import { ref } from 'vue';

import { Dialog } from '~/components';

const visible = ref(false)

function handlecCancel() {
  visible.value = false;
}

function handleConfirm() {
  visible.value = false;
}
</script>

<template>
  <div>
    <Dialog v-model="visible" title="标题" @cancel="handlecCancel" @confirm="handleConfirm">
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
        <button>插槽按钮</button>
      </template>
    </Dialog>
    <button @click="visible = !visible">
      按钮
    </button>
  </div>
</template>

<style lang="scss" scoped></style>
