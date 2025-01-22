import type { Axios } from 'axios';
import type { Column, UseTableParams } from '~/types';

interface Settings {
  request: Axios | null
  column: Partial<Column<object>>
  hookUseTableSettings: Partial<UseTableParams<object>>
}

/** 全局默认配置项 */
export const settings: Settings = {
  request: null,
  column: {},
  hookUseTableSettings: {},
};

/** 收集配置项 */
export function collection(obj: Partial<Settings>) {
  Object.assign(settings, obj)
}

/** 获取配置项 */
export function getSettings() {
  return settings
}
