import Notification from '../notification'
import './style/index.less'

let defaultDuration = 3
let defaultTop
let messageInstance
let prefixCls = 'ant-message'
let key = 1
let date = Date.now()

function getMessageInstance () {
  messageInstance = messageInstance || Notification.newInstance({
    prefixCls: prefixCls,
    transitionName: 'move-up',
    styles: {
      top: `${defaultTop}px`
    }
  })
  return messageInstance
}

function notice (content = '', duration = defaultDuration, type, onClose = () => {}, close = false) {
  let iconType = ({
    info: 'info-circle',
    success: 'check-circle',
    error: 'cross-circle',
    warning: 'exclamation-circle',
    loading: 'loading'
  })[type]
  let instance = getMessageInstance()
  const spin = type === 'loading' ? 'anticon-spin' : ''

  instance.notice({
    name: `${prefixCls}_${date}_${key++}`,
    content: `
      <div class="${prefixCls}-custom-content ${prefixCls}-${type}">
        <i class="anticon anticon-${iconType} ${spin}"></i>
        <span>${content}</span>
      </div>
    `,
    styles: {},
    close: close,
    onClose: onClose,
    duration: duration
  })
  return function () {
    return function () {
      instance.remove(`${prefixCls}_${date}_${key++}`)
    }
  }
}

function common (option, message) {
  const type = typeof option
  if (type === 'string') {
    option = {
      content: option
    }
  }
  return notice(option.content, option.duration, message, option.onClose, option.close)
}

export default {
  name: 'Message',
  info (option) {
    common(option, 'info')
  },
  success (option) {
    common(option, 'success')
  },
  warning (option) {
    common(option, 'warning')
  },
  error (option) {
    common(option, 'error')
  },
  loading (option) {
    common(option, 'loading')
  },
  config (option) {
    if (option.top) {
      defaultTop = option.top
      messageInstance = null
    }
    if (option.duration) {
      defaultDuration = option.duration
    }
  },
  destroy (option) {
    let instance = getMessageInstance()
    messageInstance = null
    instance.destroy('message')
  }
}
