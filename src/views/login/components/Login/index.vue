<template>
  <div class="login" @keyup.enter="login">
    <app-svg-icon class="code" icon-name="login-code" @click="changeIsQRCodeLogin"></app-svg-icon>
    <div class="logo-container">
      <div class="
          flex-shrink-0 flex
          items-center
          justify-center
          w-48
          h-48
          rounded-2xl
          bg-primary
          overflow-hidden
        ">
        <img class="logo" draggable="false" src="@/assets/img/logo.svg" alt="Logo" />
      </div>
      <h1 class="title">Battery Analytics</h1>
    </div>
    <div class="account">{{ t("登录账号") }}</div>
    <el-form class="mt-20" ref="refForm" size="medium" label-position="top" :hide-required-asterisk="true"
      :show-message="false" :model="form" :rules="rules">
      <el-form-item prop="userName" :label="t('手机或邮箱地址')">
        <el-input :maxlength="50" clearable :placeholder="t('请输入手机或邮箱地址')" v-model="form.userName"></el-input>
      </el-form-item>
      <el-form-item v-if="accountLoginMode === 0" prop="password" :label="t('密码')">
        <el-input :maxlength="50" clearable :placeholder="t('请输入密码')" show-password v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item v-if="accountLoginMode === 1" prop="verCode" :label="t('验证码')">
        <div class="flex gap-12">
          <el-input :maxlength="4" clearable :placeholder="t('请输入验证码')" v-model="form.verCode"></el-input>
          <el-button type="primary" :disabled="isCounting || !form.userName" :loading="isSendVerCode"
            @click="sendVerCode">{{ isCounting ? count : t("获取验证码") }}</el-button>
        </div>
      </el-form-item>
    </el-form>
    <div class="flex items-center justify-between h-36">
      <div>
        <span class="text-gray-500">{{ t("没有账号") }}</span>
        <span class="
            text-primary
            border-b border-transparent
            hover:border-primary
            cursor-pointer
          " @click="gotoRegister">{{ t("点击注册") }}</span>
      </div>
      <el-button v-if="accountLoginMode === 0" size="medium" type="text" @click="changeAccountLoginMode(1)">{{
      t("验证码登录") }}</el-button>
      <el-button v-if="accountLoginMode === 1" size="medium" type="text" @click="changeAccountLoginMode(0)">{{ t("密码登录")
      }}</el-button>
    </div>
    <el-button class="w-full mt-12" size="medium" type="primary" :loading="isloadingLogin" @click="login">{{ t("登录") }}
    </el-button>
    <el-divider>
      <span class="text-gray-400">or</span>
    </el-divider>
    <div class="flex flex-col gap-8">
      <div class="relative">
        <el-button class="w-full" size="medium">Continue with Facebook (暂无)</el-button>
        <img class="absolute top-8 left-16 w-20 h-20" src="@/assets/img/views/login/facebook.svg" alt="Facebook" />
      </div>
      <WechatLogin @success="handleLoginSuccess" />
    </div>
    <div v-show="isQRCodeLogin" class="code-login">
      <app-svg-icon class="code" icon-name="login-account" @click="changeIsQRCodeLogin"></app-svg-icon>
      <NewareLogin v-if="isQRCodeLogin" @success="handleLoginSuccess" />
      <h4 class="w-200 mt-12 text-center">
        {{ t("新威智能APP扫描二维码登录") }}
      </h4>
    </div>
  </div>
  <ChooseEnterprise ref="refChooseEnterprise" @choosed="handleEnterpriseChoosed" />
</template>

<script lang="ts">
import api from "@/api";
import defaultAvatar from "@/assets/img/default-avatar.svg";
import { BASE_URL_ACCOUNT_SYSTEM } from "@/lib/config";
import { isEmail, isPhone } from "@/lib/is";
import messages from "@/locales/views/login/index/index";
import { useStore } from "@/store/index";
import { RootMutations } from "@/store/type";
import { ElMessage } from "element-plus";
import { defineComponent, reactive, toRefs, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import ChooseEnterprise from "./components/ChooseEnterprise/index.vue";
import NewareLogin from "./components/NewareLogin.vue";
import WechatLogin from "./components/WechatLogin.vue";
import useForm from "./useForm";
import useVerCodeTimer from "./useVerCodeTimer";

type AccountLoginMode = 0 | 1; // 账号登录方式(0 用户名密码 1 验证码)

export default defineComponent({
  components: {
    WechatLogin,
    NewareLogin,
    ChooseEnterprise,
  },
  setup() {
    const { t } = useI18n({
      messages,
      missingWarn: false,
      fallbackWarn: false,
    });

    const router = useRouter();
    const store = useStore();

    const { count, isCounting, startVerCodeTimer } = useVerCodeTimer();
    const { refForm, form, rules } = useForm();

    const refs = reactive({
      refChooseEnterprise: null as any,
    });
    const state = reactive({
      accountLoginMode: 0 as AccountLoginMode,
      isloadingLogin: false, // 是否 正在登录
      isSendVerCode: false, // 是否 正在发送验证码
      isQRCodeLogin: false, // 是否 新威APP扫描二维码登录
    });

    // 修改 账号登录方式
    function changeAccountLoginMode(mode: AccountLoginMode) {
      state.accountLoginMode = mode;
    }
    // 修改 是否新威APP扫描二维码登录
    function changeIsQRCodeLogin() {
      state.isQRCodeLogin = !state.isQRCodeLogin;
    }
    // 登录成功跳转
    function gotoNextPage() {
      router.push("/");
    }
    // 打开选择公司窗口
    function openChooseEnterprise(enterprises: App.LoginUser["enterprises"]) {
      refs.refChooseEnterprise.open(enterprises);
    }
    // 设置全局用户数据
    function setUserState(user: App.LoginUser) {
      const token = user.identityToken;
      user.headImage = user.headImage || defaultAvatar;
      store.commit(RootMutations.SET_TOKEN, token);
      store.commit(RootMutations.SET_USER, user);
    }
    async function loginByToken(user: App.LoginUser) {
      return;
      const [res] = await api.user.loginByToken(
        {
          lims_token: user.identityToken,
        },
        {
          redirectable: false,
        }
      );
      if (res) {
        const data = res.data;
        if (data) {
          user.identityToken = data.identityToken;
          user.isAdmin = data.isAdmin;
          setUserState(user);
          gotoNextPage();
        }
      }
    }
    function handleLoginSuccess(user: App.LoginUser) {
      setUserState(user);
      const enterprises = user.enterprises;
      if (enterprises && enterprises.length > 1) {
        openChooseEnterprise(enterprises);
      } else {
        loginByToken(user);
      }
    }
    function isEmporty(obj: any) {
      if (!obj) return true;
      return !Object.keys(obj).length;
    }
    function handleEnterpriseChoosed(user: App.LoginUser) {
      // loginByToken(user);
      // //console.log(user, 999);
      if (!isEmporty(user)) {
        const data = user;
        if (!isEmporty(data)) {
          user.identityToken = data.identityToken;
          user.isAdmin = data.isAdmin;
          setUserState(user);
          gotoNextPage();
        }
      }
    }
    // 发送验证码
    async function sendVerCode() {
      const username = form.userName;
      let targetType: App.SendVerCodeParams["targetType"] = 0;
      if (isPhone(username)) {
        targetType = 0;
      } else if (isEmail(username)) {
        targetType = 1;
      } else {
        ElMessage({
          type: "error",
          message: "请输入正确的手机或邮箱地址",
        });
        return;
      }
      const params: App.SendVerCodeParams = {
        target: username,
        targetType,
        sceneId: `Login_${username}`,
      };
      state.isSendVerCode = true;
      const [res] = await api.account.sendVerCode(params, {
        showSuccessNotification: true,
      });
      state.isSendVerCode = false;
      if (res) {
        startVerCodeTimer();
        const data = res.data;
        form.verCodeId = data.verCodeId;
      }
    }
    async function login() {
      state.isloadingLogin = true;
      const [res] = await api.account.login(form, {
        redirectable: false,
      });
      if (res) {
        // //console.log(res, 9999);
        const data: App.LoginUser | null = res.data;
        if (data) {
          handleLoginSuccess(data);
        }
      }
    }
    function validate() {
      refForm.value?.validate((valid: boolean) => valid && login());
    }
    function gotoRegister() {
      window.open(`${BASE_URL_ACCOUNT_SYSTEM}/register`);
    }

    // 当账号登录方式发生改变
    // 修改表单中 verCodelLogin 的状态
    // 用于在登陆时使用
    watch(
      () => state.accountLoginMode,
      (mode) => {
        form.verCodelLogin = mode === 1;
      }
    );

    return {
      t,

      ...toRefs(refs),
      ...toRefs(state),

      refForm,
      form,
      rules,
      validate,

      count,
      isCounting,
      sendVerCode,

      login,
      gotoRegister,

      changeAccountLoginMode,
      changeIsQRCodeLogin,
      handleLoginSuccess,
      handleEnterpriseChoosed,
    };
  },
});
</script>

<style lang="scss" scoped>
.login {
  position: relative;
  z-index: 1;
  width: 400px;
  padding: 32px;
  border-radius: $border-radius;
  background-color: #fff;
  box-shadow: $shadow-lg;

  .code {
    position: absolute;
    top: 4px;
    right: 4px;
    width: 32px;
    height: 32px;
    color: var(--primary);
    object-fit: contain;
    cursor: pointer;
    clip-path: polygon(100% 0, 100% 100%, 85% 100%, 0 15%, 0 0);
  }

  .logo-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 12px 0;
  }

  .logo {
    display: block;
    width: 48px;
    height: 48px;
    pointer-events: none;
  }

  .title {
    margin-left: 12px;
    font-size: 24px;
    font-weight: 600;
    @include line-clamp(1);
  }

  .account {
    font-size: 16px;
    line-height: 36px;
    text-align: center;
  }
}

.code-login {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 24px;
  background-color: #fff;
}
</style>
