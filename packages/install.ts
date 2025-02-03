import type { App, Component } from 'vue';

import * as components from './components';
import { Dialog, Form, ResizeDialog, ResizeDialogGroup, Table } from './components';
import { useTable } from './hook/useTable';
import { collection } from './utils/collect';

export type {
  Column,
  FormOption,
  TableOption,
} from './types';

export default {
  install(Vue: App) {
    Object.values(components).forEach((component: Component) => {
      Vue.component(component.name!, component);
    });
  },
  collection,
};

export {
  Dialog,
  Form,
  ResizeDialog,
  ResizeDialogGroup,
  Table,
  useTable,
};
