import type { PropType } from 'vue';

import { commProps } from './comm';

export const props = {
  ...commProps,
  type: {
    type: String as PropType<string>,
  },
  range: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
};
