<script lang="ts" setup>
import { Button, ConfigProvider } from 'ant-design-vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import { watch } from 'vue';

import { create, getList, remove, update } from '@/api/table';

import { Table } from '~/components';
import { useTable } from '~/hook/useTable';
import { tableOption } from './option';

const { getDataList, valBind, tableRef, collection, formData } = useTable({
  tableOption,
  getList,
  create,
  update,
  remove,
  queryForm: {},
  searchForm: {},
});

// function test() {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(1)
//     }, 3000)
//   });
// }

// collection.setBeforeGetList(async (params) => {
//   console.log(params)
//   await test()
// });

// collection.setAfterGetList((params) => {
//   console.log(params, '___params+++')
// });

// collection.setBeforeSave(async (form) => {
//   await test();
// })

getDataList();

watch(() => valBind.value.modelValue, (val) => { console.log(val); }, {
  deep: true,
});

function handleClick() {
  tableRef.value?.rowAdd({ name: 'ninhao' });
}
</script>

<template>
  <ConfigProvider :locale="zhCN">
    <div style="height: 300px; width: 700px; margin-top: 30px; margin-left: 30px;">
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
        <!-- <template #menu="{ record }">
          <span @click="() =>console.log( tableRef.rowView(record))">99999</span>
        </template> -->
        <template #dialogFooter="data">
          <Button @click="data">
            111111
          </Button>
        </template>
      </Table>
    </div>
  </ConfigProvider>
</template>

<style lang="scss" scoped></style>
