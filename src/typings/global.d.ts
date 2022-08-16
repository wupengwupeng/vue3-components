declare namespace App {
  // 多语言
  interface Language {
    lang: string
    name: string
  }
  // 多主题
  interface Theme {
    name: string
    class: string
    color: string
  }
  // ElementPlus 当表格的排序条件发生变化(sort-change)的回调参数
  interface ElTableEventSortChangeParams {
    prop: string
    order: 'ascending' | 'descending' | null
  }
  type Gender = 0 | 1 | 2 // 性别(0未知 1男 2女)
  // 登陆帐户可登录的企业
  interface LoginUserEnterprise {
    enterpriseId: number // 企业ID
    enterpriseName: string // 企业名称
    isEnterpriseMaster: boolean // 是否企业管理员
  }
  // 登陆成功返回帐户信息
  interface LoginUser {
    passportId: number // 用户ID
    nickname: string // 昵称
    realname: string // 真实名称
    headImage: string // 头像
    countryCode: string // 国家代码
    mobile: string // 手机号码
    email: string // 邮箱
    emailVerify: 0 | 1 // email验证状态(0未验证 1已验证)
    gender: Gender // 性别
    status: 0 | 1 | 2 // 状态(0删除 1启用 2停用)
    identityToken: string // Token
    createdBy: number
    isAdmin: boolean // 是否是当前app管理员
    enterpriseId: string // 当前登录企业标识
    isEnterpriseMaster: boolean // 是否是当前企业管理员
    isNeware: isNeware // 是否新威管理员
    enterprises: LoginUserEnterprise[] // 所属企业
  }
  // 发送验证码参数
  interface SendVerCodeParams {
    target: string // 目标(手机 邮箱)
    targetType: 0 | 1 // 目标类型(0手机 1邮箱)
    sceneId: string //验证码场景值
  }
  // 绑定的微信信息
  interface Wechat {
    headImage: string // 微信头像
    nickName: string // 微信昵称
  }
  type AuthApplyType = 'employee' | 'administrator'
}
