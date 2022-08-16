<template>
  <div class="w-full h-40 flex items-center px-24 border-b relative">
    <div class="flex items-center mr-24 h-40 hover:cursor-pointer text-14 font-medium"
      :class="{ isActive: isActive === index }" v-for="(item, index) in list" :key="index"
      @click="handlerClickItem(item, index)">
      {{ item.name }}
    </div>
    <div class=" absolute right-25 flex items-center gap-12">
      <slot name="other"></slot>
      <el-dropdown trigger="click" placement="bottom" v-if="false">
        <app-svg-icon class="w-20 h-20 text-gray-500" icon-name="nav-earth"></app-svg-icon>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item v-for="(language, index) in languages" :key="index" :disabled="lang === language.lang"
              @click="changeLanguage(language)">
              <div :class="{ 'text-[#ab4bf5]': lang === language.lang }">{{ language.name }}</div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs, computed } from 'vue'
import { LANGUAGES } from '@/lib/config'
import { State, ListItem } from './type'
import { getLang, setLang } from '@/lib/storage'
import { useStore } from '@/store'
import { RootMutations } from '@/store/type'
export default defineComponent({
  name: 'TabHeader',
  props: {
    modelValue: {
      type: [Number, String],
      default: 0,
    },
    list: {
      type: Array as any,
      default: () => [],
    },
  },
  emits: ['update:modelValue', 'handlerActive'],
  setup(props, { emit }) {
    const store = useStore()
    const state: State = reactive({
      isActive: 0,
    })
    const theme: { languages: Array<{ lang: string; name: string }>, lang: string } = reactive({
      languages: LANGUAGES,
      lang: computed(() => store.state.lang),
    })
    function handlerClickItem(item: ListItem, index: number) {
      state.isActive = index
      emit('update:modelValue', index)
      emit('handlerActive', index)
    }
    async function changeLanguage(language: any) {
      setLang(language.lang)
      window.location.reload()
    }

    return {
      ...toRefs(state),
      ...toRefs(theme),
      handlerClickItem,
      changeLanguage,

    }
  },
})
</script>

<style lang="scss" scoped>
.isActive {
  color: var(--primary);
  font-weight: 500;
  border-bottom: 1px solid var(--primary);
}
</style>