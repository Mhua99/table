import { FontSizeOutlined, PlusOutlined, ReloadOutlined, SettingOutlined } from '@ant-design/icons-vue'
import { Button, Card, Dropdown, Popover, Space, Table } from 'ant-design-vue'
import { defineComponent, Fragment, h } from 'vue'

import { emits, pagination, props } from '~/const/table';
import Dialog from '../dialog'
import Form from '../form'
import Search from '../search';
import { useTable } from './useTable';
import './index.scss';

export default defineComponent({
  name: 'MTable',
  props,
  emits,
  setup(props, context) {
    const {
      searchRef,
      tableOption,
      allSlots,
      searchForm,
      state,
      formOption,
      formRef,
      emitsEvent,
      afterClose,
      rowAdd,
      close,
      submit,
      updateForm,
      refresh,
      pageSizeChange,
      getMenu,
      getColumnSettings,
    } = useTable(props, context);

    return () => {
      const columns = tableOption.column.filter(item => !item.colHide).sort((pre, next) => (next.sort || 0) - (pre.sort || 0));
      const scrollX = tableOption.tableX || columns.reduce((sum, col) => sum + (col.width || 100), 0);
      const isShowSubmit = tableOption.submitBtn && state.formType !== 'view';

      function renderTable() {
        return (
          <Fragment>
            <div class="m-table-search">
              <Search ref={searchRef} v-model={searchForm.value} option={tableOption} v-slots={allSlots.search} emitsEvent={emitsEvent} />
            </div>
            <div class="m-table-Btn">
              <div class="m-table-Btn-left">
                <Space>
                  {tableOption.addBtn && <Button icon={h(PlusOutlined)} type="primary" onClick={() => rowAdd({})}>{tableOption.addBtnText}</Button>}
                  {context.slots.menuLeft && context.slots.menuLeft()}
                </Space>
              </div>
              <div class="m-table-Btn-right">
                <Space>
                  {context.slots.menuRight && context.slots.menuRight()}
                  {tableOption.columnBtn && (
                    <Popover placement="bottomRight" trigger="hover" v-slots={{ content: getColumnSettings }}>
                      <Button
                        type="dashed"
                        icon={h(SettingOutlined)}
                      />
                    </Popover>
                  )}
                  {tableOption.sizeBtn
                  && (
                    <Dropdown trigger={['hover']} v-slots={{ overlay: getMenu }}>
                      <Button type="dashed" icon={h(FontSizeOutlined)}></Button>
                    </Dropdown>
                  )}
                  {tableOption.refreshBtn && (
                    <Button
                      type="dashed"
                      loading={props.loading}
                      icon={h(ReloadOutlined)}
                      onClick={refresh}
                    />
                  )}
                </Space>
              </div>
            </div>
            <Table scroll={{ x: scrollX, y: tableOption.height }} size={state.selectedKeys[0]} dataSource={props.data} loading={props.loading} columns={columns} pagination={Object.assign({}, pagination, props.pagination, { onChange: pageSizeChange })} bordered v-slots={allSlots.table}></Table>
          </Fragment>
        )
      }

      return (
        <div class="m-table">
          {tableOption.card
            ? (
                <Card class="m-table-card">
                  {renderTable()}
                </Card>
              )
            : renderTable()}
          <Dialog afterClose={afterClose} loading={state.submitLoading} width={`${tableOption.dialogWidth}px`} class="m-table-dialog" modelValue={state.visible} onUpdate:modelValue={close} onConfirm={submit} title={state.title} isCancelBtn={tableOption.emptyBtn} isConfirmBtn={isShowSubmit} v-slots={allSlots.dialog}>
            <Form modelValue={props.modelValue} formType={state.formType} onUpdate:modelValue={updateForm} ref={formRef} option={formOption.value} v-slots={allSlots.form} />
          </Dialog>
        </div>
      )
    };
  },
})
