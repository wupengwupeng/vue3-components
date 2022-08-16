import api from '@/api'
import { MAX_PAGE_SIZE } from '@/lib/config'
import * as filters from '@/lib/filters'

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $MAX_PAGE_SIZE: typeof MAX_PAGE_SIZE
    $api: typeof api
    $filters: typeof filters
  }
}
