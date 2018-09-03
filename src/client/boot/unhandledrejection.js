// 处理全局处理未捕获的异常

import { message } from 'antd'

let isLogoutMessage = false
window.addEventListener('unhandledrejection', function (e) {
  if (e.detail) {
    const { reason } = e.detail
    if (reason && reason.name === 'HttpError') {
      e.preventDefault()

      // 用户登录只提醒一次
      if (reason.code === 401) {
        if (isLogoutMessage) {
          return
        }
        isLogoutMessage = true
      }

      message.error(reason.message, 3, () => {
        isLogoutMessage = false
      })
    }
  }
})
