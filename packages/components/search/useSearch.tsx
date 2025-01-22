import type { ExtractPropTypes, SetupContext } from 'vue';
import type { emits as searchEmits, props as searchProps } from '~/const/search'
import type { Column, TableOption } from '~/types'

import { DownOutlined, UpOutlined } from '@ant-design/icons-vue';
import { Button } from 'ant-design-vue'
import { computed, h, ref, toRaw } from 'vue';

import { baseColumn } from '~/const/formItem'
import { excludeRetField } from '~/const/search';
import { extractKeyFormObject } from '~/utils/object'

export function useSearch(props: ExtractPropTypes<typeof searchProps>, { emit, expose }: SetupContext<typeof searchEmits>) {
  const formRef = ref();
  const defaultsOptions = ref<TableOption<object>>({})
  const modelValue = computed({
    get() {
      return props.modelValue
    },
    set(val) {
      emit('update:modelValue', val);
    },
  });

  const isExpand = ref(false)

  const assignOption = computed<TableOption<object>>(() => {
    const ret: TableOption<object> = {
      searchIndex: 3,
      ...props.option,
      labelAlign: props.option?.searchLabelAlign || 'right',
      labelWidth: props.option?.searchLabelWidth,
      footerBtn: false,
      column: [],
    }
    ret.column = props.option?.column
      ?.filter(item => item.search)
      .sort((pre, next) => (next.searchOrder || 0) - (pre.searchOrder || 0))
      .map((item, index) => {
        const { excludeRet: includeRest } = extractKeyFormObject(item, excludeRetField);
        const newItem = {
          ...baseColumn,
          ...includeRest,
          value: includeRest.searchValue,
          labelWidth: includeRest.searchLabelWidth || ret.searchLabelWidth,
          span: item.searchSpan || 8,
          display: (ret.searchIcon && !isExpand.value) ? index < (ret.searchIndex || 0) : true,
          range: item.searchRange,
        };
        return newItem
      }) as Column<object>[];
    return ret;
  })

  function hideColumn() {
    if (defaultsOptions.value.searchIcon) {
      defaultsOptions.value.column?.forEach((item, index) => {
        item.display = isExpand.value || (index < (defaultsOptions.value?.searchIndex || 0));
      })
    }
  }

  hideColumn();

  function expandClick() {
    isExpand.value = !isExpand.value
    hideColumn();
  }

  function search() {
    props.emitsEvent('search', toRaw(modelValue.value));
  }

  function empty() {
    modelValue.value = {}
    formRef.value.resetFields();
    props.emitsEvent('empty');
  }

  const searchCount = assignOption.value.column?.length || 0;

  function renderFooterBtn() {
    const { searchIcon, searchIndex = 3 } = assignOption.value;
    return (
      searchIcon && searchCount > searchIndex && <Button type="link" onClick={expandClick} icon={h(isExpand.value ? UpOutlined : DownOutlined)}>{isExpand.value ? '收起' : '展开'}</Button>
    )
  }

  expose({
    formRef,
  })

  return {
    assignOption,
    isExpand,
    expandClick,
    renderFooterBtn,
    defaultsOptions,
    modelValue,
    search,
    empty,
    formRef,
    searchCount,
  };
}
