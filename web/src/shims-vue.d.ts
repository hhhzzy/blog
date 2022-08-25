/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module "@kangc/v-md-editor/lib/preview";
declare module "@kangc/v-md-editor/lib/theme/github";
declare module "codemirror";
declare module "hljs";
declare module "@kangc/v-md-editor/lib/plugins/line-number/index"
declare module "@kangc/v-md-editor/lib/plugins/emoji/index"
declare module "@kangc/v-md-editor/lib/plugins/copy-code/index"