<script lang="ts" setup>
import { create, getList, remove, update } from './api';
import { Button } from 'ant-design-vue';

import { Table } from '@mhua/table';
import { useTable } from '@mhua/table'
import { tableOption } from './option'

const { getDataList, valBind, tableRef, collection } = useTable({
  tableOption,
  getList,
  create,
  update,
  remove,
  queryForm: {},
  searchForm: {},
})

getDataList();

function handleClick() {
  tableRef.value.rowAdd({ name: 'ninhao' });
}
</script>

<template>
  <Table v-bind="valBind">
    <template #menuLeft>
      <Button @click="handleClick">
        新增按钮
      </Button>
    </template>
    <template #menuRight>
      <span style="color: red;">右侧插槽</span>
    </template>
    <template #name="{ record }">
      <span>{{ `${record.age}岁 - ${record.name}` }}</span>
    </template>
    <template #nameForm>
      <span>{{ valBind.modelValue.name }}</span>
    </template>
    <template #nameSearch>
      <div>搜索</div>
    </template>
    <template #nameSearchLabel>
      <div>9999</div>
    </template>
    <template #nameFormLabel>
      <div>cs11</div>
    </template>
    <template #dialogFooter="data">
      <Button @click="data">111111</Button>
    </template>
  </Table>
</template>

<style lang="scss" scoped></style>
