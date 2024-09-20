// ICON.ts
import { createVNode } from 'vue'
import  * as $Icon from '@ant-design/icons-vue'

export const mIcon = (props: { icon: string }) => {
  const { icon } = props;
  return createVNode($Icon[icon]);
};