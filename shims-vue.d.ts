// src/shims-vue.d.ts
import type { VNode } from 'vue';

declare type VueNode = VNode
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elem: string]: unknown
    }
  }
}
