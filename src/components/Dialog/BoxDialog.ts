import { ElNotification, ElMessage, ElMessageBox } from 'element-plus'
import { h } from 'vue'


// import leftImg from "@/icons/svg/icon-chart-heat-map.svg";
/**
 * 如何调用，如下面调用案例
 * import {succesMsg,warnMsg,infoMsg,
     errorMsg,alertBox,confirmBox} from '@/utils/msgBox.ts'
  confirmBox('确认删除该标签吗？','确定',null).then(res => {
    alert("确定："+res)
  }).catch(res => {
    alert("取消关闭："+res)
  })
 * */

// 成功提示信息
export function succesMsg(msgInfo: any) {
  ElMessage({
    type: 'success',
    showClose: true,
    dangerouslyUseHTMLString: true,
    message: msgInfo,
  })
}

// 警告提示信息
export function warnMsg(msgInfo: any) {
  ElMessage({
    type: 'warning',
    showClose: true,
    dangerouslyUseHTMLString: true,
    message: msgInfo,
  })
}

// 错误提示信息
export function errorMsg(msgInfo: any) {
  ElMessage({
    type: 'error',
    showClose: true,
    dangerouslyUseHTMLString: true,
    message: msgInfo,
  })
}

// 一般信息提示信息
export function infoMsg(msgInfo: any) {
  ElMessage({
    type: 'info',
    showClose: true,
    dangerouslyUseHTMLString: true,
    message: msgInfo,
  })
}

// 确定一个确定按钮alertBox
export function alertBox(msg: any, btnName: any, fun: any) {
  let confirmName = btnName == '确定' ? '确定' : '是'
  return ElMessageBox.alert(msg, '提示', {
    confirmButtonText: confirmName,
    dangerouslyUseHTMLString: true,
    callback: fun
  });
}

// 确定取消;是否按钮弹出框
// export function confirmBox(fun: any) {
//   return ElMessageBox.confirm("", '', {
//     title: "",
//     confirmButtonText: "是",
//     cancelButtonText: "否",
//     distinguishCancelAndClose: true,
//     message: h("div", { style: "display:flex;width: 500px;" }, [
//       h(
//         "span",
//         {
//           style:
//             "width:40px;height:40px;display:flex;align-items: center;margin-right: 16px;justify-content: center;background:#FEF7C7;border-radius: 24px;",
//         },
//         [h("img", { src: leftImg, class: "img-icon-name" })]
//       ),
//       h("span", { style: "flex:1;display:flex;flex-direction: column;" }, [
//         h(
//           "span",
//           { style: "color: #222A3B;font-size: 18px;" },
//           "是否修改默认可视化?"
//         ),
//         h(
//           "span",
//           { style: "color: #6F7883;font-size: 14px;" },
//           "选择是将进行可视化自定义,选择否则自动保存并退回主页!"
//         ),
//       ]),
//     ]),
//     beforeClose: fun
//   })
// }



export const succesElNotification = (msg: any) => {
  ElNotification({
    title: 'Success',
    message: msg,
    type: 'success',
    duration: 2000,
    position: 'bottom-left',
  })
}