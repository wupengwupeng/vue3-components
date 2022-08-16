<template>
  <div class="spinner">
    <div class="cube1"></div>
    <div class="cube2"></div>
  </div>
</template>

<script lang="ts" setup>
import api from "@/api";
import { getLang, setLang } from "@/lib/storage";
import { useStore } from "@/store";
import { RootMutations } from "@/store/type";
import { useRoute, useRouter } from "vue-router";
import { unauthorized } from "@/lib/redirect";
const route = useRoute();
const router = useRouter();
const store = useStore();

// //console.log(route, "route");
const query = route.query;

const token = query.token as string | undefined;
const lang = query.lang as string | undefined;
const theme = query.theme as string | undefined;
const redirect = query.redirect as string | undefined;

// //console.log(token, "你好哇333");
if (lang && lang !== getLang()) {
  setLang(lang);
  window.location.reload();
}
if (theme) store.commit(RootMutations.SET_THEME, theme);

// function setUserState(user: App.LoginUser) {
//   const token = user.analysis_token;
//   store.commit(RootMutations.SET_TOKEN, token);
//   store.commit(RootMutations.SET_USER, user);
// }
// 登录成功跳转
function gotoNextPage() {
  router.replace("/report");
}
if (token) {
  store.commit(RootMutations.SET_TOKEN, token);
  // store.commit(RootMutations.SET_USER, user);
  gotoNextPage();
}
// async function loginByToken(token: string) {
//   const [res] = await api.user.loginByToken({
//     lims_token: token,
//   });
//   if (res) {
//     const data: App.LoginUser = res.data;
//     setUserState(data);
//     gotoNextPage();
//   }
// }

// if (token) loginByToken(token);
</script>

<style lang="scss" scoped>
.spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.cube1,
.cube2 {
  background-color: $primary;
  width: 30px;
  height: 30px;
  animation: cubemove 2s infinite ease-in-out;
}

.cube2 {
  animation-delay: -0.9s;
}

@keyframes cubemove {
  25% {
    transform: translateX(42px) rotate(-90deg) scale(0.5);
  }

  50% {
    transform: translateX(42px) translateY(42px) rotate(-179deg);
  }

  50.1% {
    transform: translateX(42px) translateY(42px) rotate(-180deg);
  }

  75% {
    transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
  }

  100% {
    transform: rotate(-360deg);
  }
}
</style>
