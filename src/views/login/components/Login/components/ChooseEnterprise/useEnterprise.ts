import { reactive, ref } from 'vue'

export default function useForm() {
  const refEnterprise = ref<any>(null)
  const enterprise = reactive({
    id: '', // 企业 ID
  })
  const enterpriseRules = {
    id: {
      required: true,
      trigger: 'blur',
    },
  }
  return {
    refEnterprise,
    enterprise,
    enterpriseRules,
  }
}
