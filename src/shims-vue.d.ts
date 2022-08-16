declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'my-cron-vue3' {
  import vue3Crom from 'my-cron-vue3'
  export default vue3Crom
  export function export_table_to_excel(id: string): void
  export function export_json_to_excel(option: any): void
}

declare module 'nprogress' {
  import nProgress from 'nprogress'
  const npregre: any
  export default npregre
}

declare module 'vue3-wp-components' {
  import vue3WpComponents from 'vue3-wp-components'
  const a: any
  export default a
}

