import { reactive, ref } from 'vue'

export default function useForm() {
  const refForm = ref<any>(null)
  const form = reactive({
    userName: process.env.NODE_ENV === 'development' ? 'newell' : '', // 用户名
    password: process.env.NODE_ENV === 'development' ? '123456' : '', // 密码
    verCodelLogin: false, // 验证码登录
    verCode: '', // 验证码
    verCodeId: '', // 验证码标识
  })
  const rules = {
    userName: {
      required: true,
      trigger: 'blur',
    },
  }

  return {
    refForm,
    form,
    rules,
  }
}
