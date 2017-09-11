import Notification from '../notification'
import './style/index.less'

const notificationInstance = {}
let defaultDuration = 4.5
let defaultTop = 24
let defaultBottom = 24
let defaultPlacement = 'topRight'

const typeToIcon = {
  success: 'check-circle-o',
  info: 'info-circle-o',
  error: 'cross-circle-o',
  warning: 'exclamation-circle-o'
}

function getPlacementStyle (placement) {
  let style
  switch (placement) {
    case 'topLeft':
      style = {
        left: 0,
        top: defaultTop + 'px',
        bottom: 'auto'
      }
      break
    case 'topRight':
      style = {
        right: 0,
        top: defaultTop + 'px',
        bottom: 'auto'
      }
      break
    case 'bottomLeft':
      style = {
        left: 0,
        top: 'auto',
        bottom: defaultBottom + 'px'
      }
      break
    default:
      style = {
        right: 0,
        top: 'auto',
        bottom: defaultBottom + 'px'
      }
      break
  }
  return style
}

function setNotificationConfig (option) {
  const { duration, placement, bottom, top } = option
  if (duration !== undefined) {
    defaultDuration = duration
  }
  if (placement !== undefined) {
    defaultPlacement = placement
  }
  if (bottom !== undefined) {
    defaultBottom = bottom
  }
  if (top !== undefined) {
    defaultTop = top
  }
}

function getNotificationInstance (prefixCls, placement) {
  const cacheKey = `${prefixCls}-${placement}`
  if (!notificationInstance[cacheKey]) {
    notificationInstance[cacheKey] = Notification.newInstance({
      prefixCls: prefixCls,
      styles: getPlacementStyle(placement),
      transitionName: 'ant-notification-fade',
      placement: placement
    })
  }
  return notificationInstance[cacheKey]
}

function notice (args) {
  const outerPrefixCls = args.prefixCls || 'ant-notification'
  const prefixCls = `${outerPrefixCls}-notice`
  const duration = args.duration === undefined ? defaultDuration : args.duration
  const onClose = args.onClose ? args.onClose : () => {}
  let iconNode
  if (args.icon) {
    iconNode = `
      <span class="${prefixCls}-icon">
        ${args.icon}
      </span>
    `
  } else if (args.type) {
    const iconType = typeToIcon[args.type]
    iconNode = `
      <i class="anticon anticon-${iconType} ${prefixCls}-icon ${prefixCls}-icon-${args.type}"></i>
    `
  }
  const autoMarginTag = (!args.description && iconNode) ? `<span class="${prefixCls}-message-single-line-auto-margin"></span>` : ''
  const Node = iconNode ? `${prefixCls}-with-icon` : ''
  const Btn = args.btn ? `<span class="${prefixCls}-btn">${args.btn}</span>` : ''
  getNotificationInstance(outerPrefixCls, args.placement || defaultPlacement).notice({
    name: args.name,
    content: `
      <div class="${Node}">
        ${iconNode}
        <div class="${prefixCls}-message"> ${autoMarginTag} ${args.message} </div>
        <div class="${prefixCls}-description">${args.description}</div>
        ${Btn}
      </div>
    `,
    duration: duration,
    placement: args.placement,
    closable: true,
    onClose: onClose,
    style: args.style || {}
  })
}

export default {
  open (option) {
    notice(option)
  },
  success (option) {
    option.type = 'success'
    notice(option)
  },
  error (option) {
    option.type = 'error'
    notice(option)
  },
  info (option) {
    option.type = 'info'
    notice(option)
  },
  warning (option) {
    option.type = 'warning'
    notice(option)
  },
  config (option) {
    setNotificationConfig(option)
  },
  close (key) {
    Object.keys(notificationInstance)
      .forEach(cacheKey => notificationInstance[cacheKey].removeNotice(key))
  },
  destroy () {
    Object.keys(notificationInstance).forEach(cacheKey => {
      notificationInstance[cacheKey].destroy()
      delete notificationInstance[cacheKey]
    })
  }
}
